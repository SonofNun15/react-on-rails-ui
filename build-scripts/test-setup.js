// This file isn't transpiled, so we must use CommonJS and ES5

/* eslint-disable */

process.env.NODE_ENV = 'test';

// Register babel to transpile before our tests run
require('babel-register')();

// Disable webpack features that the test framework does not understand
require.extensions['.css'] = function() {};

// Configure JSDOM and set global varibles
//  to simulate a browser environment for tests.
var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach(function (property) {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};

/* eslint-enable */
