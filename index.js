'use strict';

var chalk = require('chalk');

var _transformDictionary = {
	success: function(msg) {
		return chalk.green(msg);
	},
	error: function(msg) {
		return chalk.red(msg);
	},
	notice: function(msg) {
		return chalk.cyan(msg);
	},
	warning: function(msg) {
		return chalk.yellow(msg);
	}
};

var _output = {
	write: function(msg, transform, _console) {
		_console.log(typeof transform === 'function' ? transform(msg) : msg);
	}
};

var reportFactory = function(inject) {
	var inject = typeof inject === 'object' ? inject : {};

	var transformDictionary = (inject.transformDictionary || _transformDictionary);
	var output = (inject.output || _output);
	var _console = (inject.console || console);

	var report = function report(style, msg){
		output.write(msg, transformDictionary[style], _console);
	};

	report.transformDictionary = transformDictionary;
	report.output = output;
	report.console = console;

	return report;
};

var report = reportFactory();

report.factory = reportFactory;

module.exports = report;