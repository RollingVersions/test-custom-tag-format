const assert = require('assert');
const fs = require('fs');

const isVersion = /^\d+\.\d+\.\d+(\-canary\-\d+)?$/.test(env.NEW_VERSION);

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

assert.deepStrictEqual(
  JSON.parse(JSON.stringify(env)),
  JSON.parse(fs.readFileSync(`${__dirname}/prepublish-env.json`, `utf8`))
);

if (process.argv.includes('--dry-run')) {
  console.log('DEPLOYING CLIENT (dry run)', env);
} else {
  console.log('DEPLOYING CLIENT', env);
}
