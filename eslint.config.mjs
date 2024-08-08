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

/* eslint sort-keys: ["error", "asc"] -- Long, so make more readable */

import eslint from '@eslint/js'
import headers from 'eslint-plugin-headers'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'

import eslintConfigLove from './eslint.config.love.mjs'

/**
 * eslint-plugin-deprecation: is not supported in ESLint v9 yet, https://github.com/gund/eslint-plugin-deprecation/issues/78
 * rules:
 *   'deprecation/deprecation': 'warn'
 */

export default tseslint.config(
  eslint.configs.recommended, // eslint-disable-line @typescript-eslint/no-unsafe-argument
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  // Not needed when https://github.com/mightyiam/eslint-config-love can be used
  eslintConfigLove,
  {
    ignores: ['**/coverage/*', '**/lib/*', '**/*.js', 'etc/*'],
  },
  {
    plugins: {
      headers,
      'simple-import-sort': simpleImportSort,
    },

    rules: {
      '@typescript-eslint/class-methods-use-this': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'headers/header-format': ['error', { path: 'etc/eslint/header.txt', source: 'file', trailingNewlines: 2 }],
      'no-undef-init': 'off',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
    },
  },
  // Disable some rules for specific files in generated files
  {
    files: ['packages/kuflow-rest/src/generated/**/*.ts'],
    rules: {
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/max-params': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
)
