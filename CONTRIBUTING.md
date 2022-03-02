# Wayscript.js contributing guide

## New contributor guide

To get an overview of the project, read the [README](README.md) and [examples](example.js)

## Pre test publish
1. Make sure the version numbers in all package.json/package.lock.json file are updated with the newest version number
2. Git tag the latest commit with the version number

## Test Publish 
1. Make a test directory 'wayscript-js-test-publish' and copy the 'wayscript-js' directory over
2. Clone this [nexus-dockerized](https://github.com/meierj-wayscript/nexus-dockerized) repository, follow the readme to get the application running at local and login to the application
3. Create a repository, choose the category 'npm hosted' to create a local npm registry
4. Credential setup, follow these steps to [encode nexus server credentials](https://help.sonatype.com/repomanager2/node-packaged-modules-and-npm-registries#NodePackagedModulesandnpmRegistries-EncodingCredentialsonLinux) and [add the credentials to the npm configuration](https://help.sonatype.com/repomanager2/node-packaged-modules-and-npm-registries#NodePackagedModulesandnpmRegistries-AddingCredentialstothenpmConfiguration)
> Note: You may need to comment out the code in the npmrc file if it is not empty before adding the credential in
5. Npm-hosted repository's set up and publish guide can be found [here](https://levelup.gitconnected.com/deploying-private-npm-packages-to-nexus-a16722cc8166) under 'Pushing Binaries to Nexus' 
> Note: Changes in config and publish in the above process should be made to 'wayscript-js-test-publish' test directory

## Publish
1. If test publish succeeded, remove the credentials added to npmrc file in the previous process
2. Register/Login your npm account, ask wayscript admin for contribution permission and configure 2FA authentication
3. Run ```npm login``` with your npm credentials
4. Run ```npm publish --access public``` in the repo, more details [here](https://docs.npmjs.com/cli/v8/commands/npm-publish)

## Unpublish
1. If unexpected error in package, run ```npm unpublish wayscript@<error version number> ``` to roll back to the previous version
> Note: An unpublished version cannot be published again