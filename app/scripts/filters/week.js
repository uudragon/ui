'use strict';

angular.module('mainApp')
	.filter('week', function($filter) {
		return function(d) {
			if (!d) return
			d = new Date(+d);
			d.setHours(0, 0, 0);
			// Set to nearest Thursday: current date + 4 - current day number
			// Make Sunday's day number 7
			d.setDate(d.getDate() + 4 - (d.getDay() || 7));
			// Get first day of year
			var yearStart = new Date(d.getFullYear(), 0, 1);
			// Calculate full weeks to nearest Thursday
			//
			return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)

		};
	});
