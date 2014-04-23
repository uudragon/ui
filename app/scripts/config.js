(function(exports){

	// global variables
	exports.baseurl = 'http://bam.uudragon.net/bam/';

	exports.auth = {
		baseurl: '/at/ws/auth/',
		resource: 'resourceListByCode/',
		login: 'login/'
	}

	exports.cookieOption = {
		expires: 1,
		expirationUnit: 'minutes'
	}

})(typeof exports === 'undefined' ? this['config'] = {} : exports);
