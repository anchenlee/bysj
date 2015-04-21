'use strict';

/**
 * @ngdoc function
 * @name myNewProjectApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myNewProjectApp
 */
angular.module('myNewProjectApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.mainFunc = {
    	data: '',
    	init: function() {
    		var _self = this;
    		_self.getCourse();
    	},
    	getCourse: function() {
    		$http.get('../api/index.php/Course/getCourse')
    		.success(function(data) {
    			if(data.success) {
    				$scope.courseLists = data.item;
    			}
    			
    		})
    	}
    }
  });
