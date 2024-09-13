# Developing kuflow-sdk-js

This doc is intended for contributors to `kuflow-sdk-js`

## Development Environment

- Node v18

## Test and Build

Run all the tests with:

```bash
npm run build
```

## Create a new version and let to the CI publish the new version

Set the new version to release:

```bash

```

Commit and push the changes:

```bash
git add .
git commit -m "Release X.Y.Z"
git push
```

Let the CI/CD publish the new version to the registry.

## Release a new version

From `main` branch do

```bash
npx lerna version --force-publish
```

Select the version that you want to release and follow the lerna instructions.

## Publish a new version in next tag

```bash
npx lerna publish from-package --registry https://registry.npmjs.org --dist-tag next
```

After that we can use the new published version.
