/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  projects: [
    {
      displayName: 'kuflow-test',
      preset: 'ts-jest',
      testEnvironment: 'node',
      rootDir: './packages/kuflow-test',
    },
  ],
}
