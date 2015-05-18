'use strict';

/**
 * @ngdoc function
 * @name myNewProjectApp.controller:TaskCtrl
 * @description
 * # TaskCtrl
 * Controller of the myNewProjectApp
 */
angular.module('myNewProjectApp')
  .controller('TaskCtrl', function ($scope, $http, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.taskFunc = {
    	data:'',
    	initFunc: function() {
    		var _self = this;
    		_self.getTask();
    	},
    	getTask: function() {
    		$http.get('../api/index.php/Task/getTask?cid='+ $routeParams.taskId)
    		.success(function(data) {
    			if(data.success) {
    				_self.data.course = data.item;
    				if(data.item.testtype == 1) {
    					_self.getRequire();
    				}
    				if(data.item.ctype) {
    					_self.getRelaCourse(data.item.ctype);
    				}
    			}
    		})
    	}
    }
  });
