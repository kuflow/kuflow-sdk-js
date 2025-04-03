/**
 * The MIT License
 * Copyright © 2021-present KuFlow S.L.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

type CacheLoader<V> = () => Promise<V> | V

type TimeUnit = 'hours' | 'minutes' | 'seconds' | 'milliseconds'

export interface CacheOptions {
  expireAfterAccess: number // Time-to-live for cached items (in milliseconds)
  expireAfterWrite: number // Time-to-live for cached items (in milliseconds)
}

interface CacheEntry<V> {
  value: V
  expiresAt: number | undefined
  timeoutId: NodeJS.Timeout | undefined
}

export class Cache<K, V> {
  private readonly cache = new Map<K, CacheEntry<V>>()

  private readonly expireAfterAccess: number

  private readonly expireAfterWrite: number

  // Track ongoing loader operations for keys
  private readonly inProgressLoads = new Map<K, Promise<V>>()

  public constructor(opts: CacheOptions) {
    this.expireAfterAccess = opts.expireAfterAccess
    this.expireAfterWrite = opts.expireAfterWrite
  }

  /**
   * Retrieve a value from the cache, or load it using the provided loader if absent or expired.
   * Automatically refreshes the TTL upon access.
   * @param key - The key of the value to retrieve.
   * @param loader - A loader function to fetch the value if it's not in cache.
   * @returns The value associated with the key.
   */
  public async get(key: K, loader: CacheLoader<V>): Promise<V> {
    const cached = this.cache.get(key)

    // Check if the value exists and is not expired
    if (cached != null && this.expireAfterAccess > 0 && (cached.expiresAt == null || cached.expiresAt > Date.now())) {
      // Reset the TTL since it's being accessed
      this.createOrUpdateCacheEntry(key, cached.value, this.expireAfterAccess)

      return cached.value
    }

    // If the value is not in the cache, check if there is already a loader in progress
    let loaderPromise = this.inProgressLoads.get(key)
    if (loaderPromise != null) {
      // Wait for the existing loader to complete
      return await loaderPromise
    }

    // Otherwise, start a new load operation
    loaderPromise = (async () => {
      try {
        const value = await loader()

        // Store the value in the cache
        this.createOrUpdateCacheEntry(key, value, this.expireAfterAccess)

        return value
      } finally {
        // Ensure the ongoing load is removed once complete
        this.inProgressLoads.delete(key)
      }
    })()

    // Save the loader promise to the in-progress map
    this.inProgressLoads.set(key, loaderPromise)

    // Return the promise for the current load operation
    return await loaderPromise
  }

  /**
   * Add a key-value pair to the cache with an expiration time.
   * @param key - The key to store.
   * @param value - The value to store.
   */
  public put(key: K, value: V): void {
    this.createOrUpdateCacheEntry(key, value, this.expireAfterWrite)
  }

  /**
   * Invalidate a specific key from the cache.
   * @param key - The key to remove.
   */
  public invalidate(key: K): void {
    this.deleteCacheEntry(key)
  }

  /**
   * Invalidate all items from the cache.
   */
  public invalidateAll(): void {
    for (const [, cached] of this.cache.entries()) {
      this.clearTimeoutCacheEntry(cached)
    }

    this.cache.clear()
  }

  /**
   * Create or Update the cache cached entry.
   * @param key - The key of the entry.
   * @param value - The value of the entry.
   * @param ttl - The ttl of the entry.
   */
  private createOrUpdateCacheEntry(key: K, value: V, ttl: number): void {
    let expiresAt: number | undefined = undefined
    let timeoutId: NodeJS.Timeout | undefined = undefined

    // Clear any existing timeout for this key
    this.deleteCacheEntry(key)

    if (ttl > 0) {
      expiresAt = Date.now() + ttl

      // Schedule the item for automatic removal after the TTL expires
      timeoutId = setTimeout(() => {
        this.cache.delete(key)
      }, ttl)
    }

    // Update or insert the new entry in the cache
    this.cache.set(key, { value, expiresAt, timeoutId })
  }

  /**
   * Deletes a cache entry identified by the specified key.
   * This will also clear any associated timeout for the cache entry.
   *
   * @param key - The key of the cache entry to be deleted.
   * @return No return value.
   */
  private deleteCacheEntry(key: K): void {
    const cached = this.cache.get(key)
    if (cached == null) {
      return
    }

    this.clearTimeoutCacheEntry(cached)

    this.cache.delete(key)
  }

  private clearTimeoutCacheEntry(cached: CacheEntry<V> | undefined): void {
    if (cached?.timeoutId != null) {
      clearTimeout(cached.timeoutId)
    }
  }
}

export class CacheBuilder {
  private expireAfterAccess = 0 // Default TTL is 0 (disabled by default)

  private expireAfterWrite = 0 // Default TTL is 0 (disabled by default)

  /**
   * Set the expiration time for the cache after accessing the element.
   * @param time - The time-to-live duration.
   * @param unit - The time unit (such as milliseconds, seconds, minutes, etc.).
   */
  public withExpireAfterAccess(time: number, unit: TimeUnit): this {
    this.expireAfterAccess = this.toMillis(time, unit)

    return this
  }

  /**
   * Set the expiration time for the cache after write the element.
   * @param time - The time-to-live duration.
   * @param unit - The time unit (such as milliseconds, seconds, minutes, etc.).
   */
  public withExpireAfterWrite(time: number, unit: TimeUnit): this {
    this.expireAfterWrite = this.toMillis(time, unit)

    return this
  }

  private toMillis(time: number, unit: TimeUnit): number {
    if (time < 0) {
      throw new Error('Time must be greater than 0')
    }

    const multiplier = this.multiplier(unit)

    return time * multiplier
  }

  private multiplier(unit: TimeUnit): number {
    switch (unit) {
      case 'hours':
        return 60 * 60 * 1000
      case 'minutes':
        return 60 * 1000
      case 'seconds':
        return 1000
      case 'milliseconds':
        return 1
    }
  }

  /**
   * Build and return the Cache instance configured with the specified options.
   */
  public build<K, V>(): Cache<K, V> {
    return new Cache<K, V>({ expireAfterAccess: this.expireAfterAccess, expireAfterWrite: this.expireAfterWrite })
  }
}
