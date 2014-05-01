(function(exports){

	// global variables
	exports.baseurl = '/bam/';
	exports.perPage = 2;

	exports.auth = {
		baseurl: '/at/ws/auth/',
		resource: 'resourceListByCode',
		login: 'login'
	}

	// cookie options
	exports.cookieOption = {
		expires: 1,
		expirationUnit: 'minutes'
	}

	//	Helper functions
	exports.errorLog = function(action, type) {
		return function(data, status) {
			console.log(action + ' ' + type + ' error, status: ' + status);
		}
	}

	exports.searchLog = function (model, type, url) {
		console.log('searchModel is:', model);
		console.log('type is: ' + type);
		console.log('requrest url is: ' + url);
	}

})(typeof exports === 'undefined' ? this['config'] = {} : exports);
