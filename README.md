# Cypress GraphQL requests stubbing & automatic fixture recording

A simplified example of an approach which combines React, Cypress and GraphQL and allows for:

-   Creating tests in record mode where test fixtures are automatically generated from the server
-   Reruning tests in replay mode using just the fixtures without server requests

Most notably, the fixtures are recorded in a way that they return different data for the same query (for example before and after a mutation) just as the server did in record mode. This allows for comprehensive testing of all possible user interactions with the UI and accurately reflect the changes that they produce.

## Available Scripts

In the project directory, you can run:

### `yarn cypress:record`

Runs Cypress in record mode. Records server responses and automatically generates fixture files. Cypress should run in this mode first time a test is added.

### `yarn cypress:replay`

Runs Cypress in replay mode. It loads the previously recorded fixtures without the need to send requests to the server. This mode guarantees the data consistent every time a test is run.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
