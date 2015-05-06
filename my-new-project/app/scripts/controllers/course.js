'use strict';

/**
 * @ngdoc function
 * @name myNewProjectApp.controller:CourseCtrl
 * @description
 * # CourseCtrl
 * Controller of the myNewProjectApp
 */
angular.module('myNewProjectApp')
	.controller('CourseCtrl', function ($scope, $routeParams, $http) {
	  	console.log(2233, $routeParams);
	    $scope.awesomeThings = [
	        'HTML5 Boilerplate',
	        'AngularJS',
	        'Karma'
	    ];
	    $scope.learnFunc = {
	    	data: {},
	    	initFunc: function() {
	    		var _self = this;
	    		_self.getCourseInfo(); //初始化课程内容
	    	},
	    	/* 获取该课程内容 */
	    	getCourseInfo: function() {
	    		var _self = this;
	    		$http.get('../api/index.php/Course/getCourse?id='+ $routeParams.courseId)
	    		.success(function(data) {
	    			if(data.success) {
	    				_self.data = data.item;
	    			}

	    		})
	    	}

	    }
	});
