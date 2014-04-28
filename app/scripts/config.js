(function(config){

	var fig = {
		perPage: 15,
		maxPages: 10,
		baseurl: '/',
	}

	angular.extend(config, fig);
})(typeof config === 'undefined' ? this['config'] = {} : config);