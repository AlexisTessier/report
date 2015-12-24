'use strict';

var report = require('../index');

try{
	report('notice', '==Test started==');

	require('./report-test');

	report('success', '==Test Ended==');
}
catch(err){
	report('error', err.message);
	throw err;
}