/**
 * Created by wushuyi on 2015/8/3.
 */
var path = require("path");
var Builder = require('systemjs-builder');

var rootPath = '';

var builder = new Builder({
    baseURL: './',
    defaultJSExtensions: true,
    buildCSS: false,
    // any map config
    map: {
        jquery: rootPath + 'libs/jquery/2.1.4/jquery.js',
        backbone: rootPath + 'libs/backbone.js/1.2.1/backbone.js',
        'backbone.localStorage': rootPath + 'libs/backbone-localstorage.js/1.1.16/backbone.localStorage.js',
        lodash: rootPath + 'libs/lodash.js/3.10.0/lodash.js',
        underscore: rootPath + 'libs/lodash.js/3.10.0/lodash.js',
        txt: rootPath + 'libs/systemjs-plugin/txt.js',
        css: rootPath + 'libs/systemjs-plugin/css.js'
    },

    // opt in to Babel for transpiling over Traceur
    transpiler: 'babel'

    // etc. any SystemJS config
})
    .build('app/todos.js', 'outfile.js')
    .then(function () {
        console.log('Build complete');
    })
    .catch(function (err) {
        console.log('Build error');
        console.log(err);
    });