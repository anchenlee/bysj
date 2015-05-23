'use strict';

/**
 * @ngdoc function
 * @name myNewProjectApp.controller:CheckingCtrl
 * @description
 * # CheckingCtrl
 * Controller of the myNewProjectApp
 */
angular.module('myNewProjectApp')
  .controller('CheckingCtrl', function ($scope, $routeParams, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.checkingFunc = {
    	data: {
    		checkings: ''
    	},
    	initFunc: function() {
    		var _self = this;
    		_self.getExamRecord();
    	},
    	/* 获取测试结果 */
    	getExamRecord: function() {
    		var _self = this;
    		$http.get('../api/index.php/Exam/getExamRecord?cid='+ $routeParams.checkingId).success(function(data) {
	          	if(data.success) {
		            _self.data.checkings = data.item;
	          	}
       		})
    	}
    }
  });
