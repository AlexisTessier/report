@alexistessier/report
================

⚠️ Deprecated - Not maintained

[Use js logger instead](https://www.npmjs.com/package/js-logger)

[![version](https://img.shields.io/badge/version-1.0.6-blue.svg)](https://github.com/AlexisTessier/report#readme)
[![npm version](https://badge.fury.io/js/%40alexistessier%2Freport.svg)](https://badge.fury.io/js/%40alexistessier%2Freport)

[![Build Status](https://travis-ci.org/AlexisTessier/report.svg?branch=master)](https://travis-ci.org/AlexisTessier/report)
[![Coverage Status](https://coveralls.io/repos/AlexisTessier/report/badge.svg?branch=master&service=github)](https://coveralls.io/github/AlexisTessier/report?branch=master)

[![Dependency Status](https://david-dm.org/AlexisTessier/report.svg)](https://david-dm.org/AlexisTessier/report)
[![devDependency Status](https://david-dm.org/AlexisTessier/report/dev-status.svg)](https://david-dm.org/AlexisTessier/report#info=devDependencies)

[Home Page](https://github.com/AlexisTessier/report#readme)

A tiny report method, and a factory to create custom report methods

Purpose
-------

- Log things and override log behaviour

Install
-------

```
npm install @alexistessier/report
```

How to use
----------

####Default report method

**report**(*String* ***messageStyle***, ***message***)

Each ***messageStyle*** colors the ***message*** with a specific color:

- notice: cyan
- success: green
- warning: yellow
- error: red

```javascript

var report = require('@alexistessier/report');

report('notice', 'my message');

```

####Create custom report method

**report.factory**(inject = {
	***transformDictionary***,
	***output***,
	***console***
})

The factory method returns a report method which use the injected objects (all optional):

- The ***transformDictionary*** is an object containing available message styles and associated transform functions
- The ***output*** is an object with at least one 'write' method. This method is called by the report function and accepts 3 parameters (the message, the transform function and the console object).
- The ***console*** is the console object to use (just here for testing purpose)

```javascript

var reportFactory = report.factory;
//or
var reportFactory = require('@alexistessier/report/factory');

var _report = reportFactory({
	transformDictionary: {
		dump: function(message){
			return 'dump message: '+message;
		}
	},
	output: {
		write: function(message, transform, console){
			console.log('custom output => '+transform(message));
		}
	}
});

_report('dump', 'my message');
//custom output => dump message: my message

```

####Extends a report method

Maybe you wanna to use a custom logger which includes the default messages styles. Each report method have 3 properties "transformDictionary", "output" and "console" which provide access to the injected objects.

Each report method also provide 2 methods:

**report.extends**(inject = {
	***transformDictionary***,
	***output***,
	***console***
})

The **extends** method returns a report method using the same injected objects as the original report method unless those which are overrided.

**report.extendsTransformDictionary**(***transformDictionary***)

The **extendsTransformDictionary** method returns a transform dictionary containing the message styles available in the original report method, plus those defined in ***transformDictionary***

```javascript

var _report = report.extends({
	transformDictionary: report.extendsTransformDictionary({
		dump: function(message){
			return 'dump message: '+message;
		}
	})
});

_report('dump', 'dump message');
_report('error', 'error message');

```