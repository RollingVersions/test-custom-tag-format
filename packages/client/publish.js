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
if (process.argv.includes('--dry-run')) {
  console.log('DEPLOYING CLIENT (dry run)', env);
} else {
  console.log('DEPLOYING CLIENT', env);
}
