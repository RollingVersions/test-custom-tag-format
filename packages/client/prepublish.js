const env = {};
for (const key of [
  'CANARY',
  'DEPLOY_BRANCH',
  'DRY_RUN',
  'GITHUB_REPOSITORY',
  'GITHUB_REPOSITORY_OWNER',
  'GITHUB_REPOSITORY_NAME',
  'DEPENDENCY_ROLLINGVERSIONS_TEST_CUSTOM_SCRIPTS_NPM_GITHUB_ACTIONS_A',
  'DEPENDENCY_ROLLINGVERSIONS_TEST_CUSTOM_SCRIPTS_NPM_GITHUB_ACTIONS_B',
  'DEPENDENCY_MY_CUSTOM_API',
  'NEW_VERSION',
]) {
  env[key] = process.env[key];
}

const majorVersion = parseInt(process.env.NEW_VERSION.split('.')[0], 10);
if (majorVersion % 2 === 0) {
  console.error(
    'The client can only be published on odd major version numbers'
  );
  process.exit(1);
}
