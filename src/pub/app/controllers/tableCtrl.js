(function() {

	"use strict";
	
	var app = angular.module('app.controller', [])
	
	app.controller('TableController', ['$scope', 'colorData', function ($scope, colorData) {
		colorData.getTableData(function(data) {
			$scope.colorData = data.colorsArray;
		});

	}]);

}());