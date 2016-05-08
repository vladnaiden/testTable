(function() {

	"use strict";
	
	var app = angular.module('app.service', [])

	app.factory('colorData',['$http', function($http) {
	 return {
	     getTableData: function(callback) {
	       $http.get('../serverUrl/data.json').success(callback);
	     }
	   }

	}]);
}());
