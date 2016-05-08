(function() {

	"use strict";

	var app = angular.module('app', [
		'app.controller', 
		'app.directive', 
		'app.service',
		'ngRoute',
		'ngResource'
	]);

		app.config(function($routeProvider) {
			$routeProvider

				.when('/', {
					temaplateUrl: 'index.html',
					controller: 'app.controller'
				}) 

				.when('/view', {
					templateUrl: 'views/index.html'
				})
		});


}());