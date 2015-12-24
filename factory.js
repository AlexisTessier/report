'use strict';

var chalk = require('chalk');
var _ = require('lodash');

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
	write: function outputWrite(msg, transform, _console) {
		_console.log(typeof transform === 'function' ? transform(msg) : msg);
	}
};

var reportFactory = function reportFactory(inject) {
	var inject = typeof inject === 'object' ? inject : {};

	var transformDictionary = (inject.transformDictionary || _transformDictionary);
	var output = (inject.output || _output);
	var _console = (inject.console || console);

	var report = function report(style, msg){
		output.write(msg, transformDictionary[style], _console);
	};

	report.transformDictionary = transformDictionary;
	report.output = output;
	report.console = _console;

	report.extendsTransformDictionary = function reportExtendsTransformDictionary(transformDictionary) {
		return _.assign(_.cloneDeep(report.transformDictionary), transformDictionary);	
	};

	report.extends = function reportExtends(inject) {
		var inject = typeof inject === 'object' ? inject : {};

		return reportFactory({
			transformDictionary: (inject.transformDictionary || report.transformDictionary),
			output: (inject.output || report.output),
			console: (inject.console || report.console)
		});
	};

	return report;
};

module.exports = reportFactory;