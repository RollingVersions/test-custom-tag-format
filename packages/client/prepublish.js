const assert = require('assert');
const fs = require('fs');

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

console.log(env);

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

const majorVersion = parseInt(process.env.NEW_VERSION.split('.')[0], 10);
if (majorVersion % 2 === 0) {
  console.error(
    'The client can only be published on odd major version numbers'
  );
  process.exit(1);
}

fs.writeFileSync(`${__dirname}/prepublish-env.json`, JSON.stringify(env));
