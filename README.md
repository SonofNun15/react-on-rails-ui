# react-on-rails-ui
A front end application for working with react on rails.

### Starting

Expects service to be running locally on `localhost:3000`. This is currently [configured here](https://github.com/SonofNun15/react-on-rails-ui/blob/master/source/app/utilities/baseApi.js#L6) and could easily be changed to read from a configuration file or environment variable.

Launch application:
```
npm install
npm start
```

This starts the debug version of the application.

A production build (if this weren't a demo application) would be performed using `npm run build`, which generates static assets in an `./output` folder. These assets can be deployed to any static host, although currently they will attempt to connect to a service at `localhost:3000`.

### Tests

To execute the test suite, run:

```
npm test
```

Or watching the tests:

```
npm run test:watch
```

The tests are also run as part of `npm start`.

### Linting

The linter is run as part of `npm start` or can be run separately via `npm run lint`.
