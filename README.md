# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

#### Custom Scripts

### `npm run coverage`

This command presents you full information about the tests coverage of the project.

See the official Jest documentation about the [coverage CLI options](https://jestjs.io/docs/cli#--coverageboolean)

### `npm run lint`

Runs Eslint to check the project code and fixes small issues.

### `npm run deploy`

Deploys the application to GitHub pages using `gh-pages` tool.
[Official docs from Create React App](https://create-react-app.dev/docs/deployment/#github-pages)

### `npm run predeploy`

**Note: This script is used by `gh-pages` tool.**

It is a simple CRA build command that is being called from the `gh-pages` tool as a pre-deploy step.

### `npm run prepare`

This command runs automatically on `npm install` by Husky Git hooks tool. This is not necessary to run this command manually. This command configures the tool and prepares the application for development.

[Husky docs.](https://typicode.github.io/husky/#/)

### `npm run test:precommit`

**Note: This script is used by Husky on pre-commit hook.**

This command runs automatically on commit. It runs tests without the watch mode, and fails the commit if tests are not passing.

### `npm run tsc`

**Note: This script is used by Husky on pre-commit hook.**

Runs TypeScript compiler. Husky runs this command on pre-commit and fails the commit if ane TypeScript errors were found

### `npm run lint-staged`

**Note: This script is used by Husky on pre-commit hook.**

This command runs automatically on commit. It tries to lint committed files and will fail the commit if errors were found.  

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
