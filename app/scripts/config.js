(function(config){

	var fig = {
		perPage: 4,
		maxPages: 10
	}

	angular.extend(config, fig);
})(typeof config === 'undefined' ? this['config'] = {} : config);