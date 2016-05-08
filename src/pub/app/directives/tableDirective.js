(function() {

	"use strict";
	
	var app = angular.module('app.directive', ['app.controller']);


		app.directive('tbCol', function() {
		    return {
		        scope:{cols:"="},
		        restrict:"A",
		        template:"<thead><tr><th>#</th><th>color</th><th>backgroundColor</th></tr></thead><tbody><tr tb-col1 ng-repeat='col in cols'></tr></tbody>"
		    };
		});

		app.directive('tbCol1', function() {
			return {
				restrict: "A",
				template:"<tr id="firstrow"><th>{{$index+1}}</th><td ng-style='{color:col.colorName}'>colorName</td><td ng-style='{background:col.hexValue}'>hexValue</td></tr>",
       			replace:true
       		};
		});

}());