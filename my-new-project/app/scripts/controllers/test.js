'use strict';

/**
 * @ngdoc function
 * @name myNewProjectApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the myNewProjectApp
 */
angular.module('myNewProjectApp')
  .controller('TestCtrl', function ($scope, $routeParams, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var checkFunc = $scope.checkFunc = {

    	data: {
    		question: ''
    	},
    	initFunc: function() {
    		var _self = this;
    		_self.getExamPaper();

    	},
    	/* 获取试题 */
    	getExamPaper: function() {
    		var _self = this;
    		$http.get('../api/index.php/Exam/getExamPaper?id='+ $routeParams.testId)
    		.success(function(data) {
    			if(data.success) {
    				console.log(data);
    				$scope.questions = data.item;
    				console.log(Object.keys($scope.questions[0]).length);
    				console.log($scope.questions[0]);
    				var aa = Object.keys($scope.questions[0]).slice(4, 11);
    				console.log(aa);
    				console.log(aa.answer1);
    			}
    		})
    	}
    }
  });
