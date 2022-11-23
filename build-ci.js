const { execSync } = require('child_process')
const rimraf = require('rimraf');
const fs = require('fs-extra');


const cleanup = () => {
    console.log('====> PRE: Cleaning up `build` directory');
    rimraf.sync('build');
}

const buildApp = () => {
    console.log('====> Starting application build: `yarn run build`.');
    execSync('yarn run build', { stdio: 'inherit' });
}

const buildStoryBook = () => {
    const enabled = process.env.STORYBOOK_RELEASE_ENABLED;
    
    if (enabled !== 'true') {
        console.log(`====> Storybook build disabled. (${enabled})`);
        return;
    }

    console.log('====> Starting storybook build: `yarn run build-storybook`.');
    execSync('yarn run build-storybook', { stdio: 'inherit' });

    console.log('====> Copying storybook assets');
    fs.copySync('storybook-static', 'build/storybook', { recursive: true });
}


cleanup();
buildApp();
buildStoryBook();
