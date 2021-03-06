'use strict';

var assert = require('assert');

var report = require('../index');

function test(spec) {
	report('notice', spec);
	return spec;
}

/*----------*/

var mock = {
	transformPrefix: 'mock => ',
	transformDictionary: report.extendsTransformDictionary({
		mock:function(msg) {
			return mock.transformPrefix+msg;
		}
	}),
	outputWritePrefix: 'output write => ',
	output: {
		write: function(msg, transform, _console) {
			_console.log(mock.outputWritePrefix+transform(msg));
		}
	},
	console: {
		lastLog: null,
		log: function(msg) {
			mock.console.lastLog = msg;
		}
	}
};

/*----------*/

var reportLog;
var spec;

spec = test('report is a function');
assert(typeof report === 'function', spec);

spec = test('report.factory is a function');
assert(typeof report.factory === 'function', spec);

spec = test('report.extendsTransformDictionary is a function');
assert(typeof report.extendsTransformDictionary === 'function', spec);

spec = test('report.transformDictionary is an object');
assert(typeof report.transformDictionary === 'object', spec);

spec = test('report.output is an object');
assert(typeof report.output === 'object', spec);

spec = test('report.output.write is a function');
assert(typeof report.output.write === 'function', spec);

spec = test('report.console is the global console object');
assert(Object.is(report.console, console), spec);

/*----------------------*/

spec = test('report.factory allows to override the transformDictionary')
var testReport = report.factory({
	transformDictionary: mock.transformDictionary,
	console: mock.console
});

reportLog = 'report log success';
testReport('success', reportLog);
assert(mock.console.lastLog.indexOf(reportLog) >= 0 , spec+' (success transform)');

reportLog = 'report log notice';
testReport('notice', reportLog);
assert(mock.console.lastLog.indexOf(reportLog) >= 0 , spec+' (notice transform)');

reportLog = 'report log error';
testReport('error', reportLog);
assert(mock.console.lastLog.indexOf(reportLog) >= 0 , spec+' (error transform)');

reportLog = 'report log warning';
testReport('warning', reportLog);
assert(mock.console.lastLog.indexOf(reportLog) >= 0 , spec+' (warning transform)');

reportLog = 'report log mock';
testReport('mock', reportLog);
assert(mock.console.lastLog === (mock.transformPrefix+reportLog) , spec+' (mock transform)');

reportLog = 'report log with unvalid transform';
testReport('unvalid', reportLog);
assert(mock.console.lastLog === reportLog , spec+' (mock unvalid transform)');

/*------------------------*/

spec = test('report.factory allows to override the output')
var testReport2 = report.factory(mock);

reportLog = 'report log mock output';
testReport2('mock', reportLog);
assert(mock.console.lastLog === (mock.outputWritePrefix+mock.transformPrefix+reportLog), spec+' (mock transform)');

/*------------------------*/

spec = test('report.extends is a function');
assert(typeof report.extends === 'function', spec);

spec = test('report.extends allows to extend a reporter');
var testReport3 = report.extends(mock);
assert(Object.is(testReport3.transformDictionary, mock.transformDictionary), spec);
assert(Object.is(testReport3.output, mock.output), spec);
assert(Object.is(testReport3.console, mock.console), spec);
var testReport4 = report.extends();
assert(Object.is(testReport4.transformDictionary, report.transformDictionary), spec);
assert(Object.is(testReport4.output, report.output), spec);
assert(Object.is(testReport4.console, report.console), spec);