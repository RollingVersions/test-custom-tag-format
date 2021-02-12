const assert = require('assert');

const isVersion = (str) => /^\d+\.\d+\.\d+(\-canary\-\d+)?$/.test(str);

const env = {};
for (const key of [
  'CANARY',
  'DEPLOY_BRANCH',
  'DRY_RUN',
  'GITHUB_REPOSITORY',
  'GITHUB_REPOSITORY_OWNER',
  'GITHUB_REPOSITORY_NAME',
  'DEPENDENCY_MY_CUSTOM_API',
  'DEPENDENCY_MY_CUSTOM_CLIENT',
  'NEW_VERSION',
]) {
  env[key] = process.env[key];
}

assert(env.CANARY === undefined || /^\d+$/.test(env.CANARY));
assert.strictEqual(
  env.GITHUB_REPOSITORY,
  'RollingVersions/test-custom-tag-format'
);
assert.strictEqual(env.GITHUB_REPOSITORY_OWNER, 'RollingVersions');
assert.strictEqual(env.GITHUB_REPOSITORY_NAME, 'test-custom-tag-format');

assert(isVersion(env.DEPENDENCY_MY_CUSTOM_API));
assert(isVersion(env.DEPENDENCY_MY_CUSTOM_CLIENT));
assert(isVersion(env.NEW_VERSION));

console.log('DEPLOYING API', env);
