'use strict';

var reportFactory = require('./factory');

var report = reportFactory();

report.factory = reportFactory;

module.exports = report;