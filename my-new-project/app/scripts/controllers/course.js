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
	    $scope.awesomeThings = [
	        'HTML5 Boilerplate',
	        'AngularJS',
	        'Karma'
	    ];
	    $scope.learnFunc = {
	    	data: {
	    		course: '',
	    		require: ''
	    	},
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
	    				_self.data.course = data.item;
	    				console.log(555);
	    				if(data.item.testtype == 1) {
	    					console.log(5666);
	    					_self.getRequire();
	    				}
	    			}
	    		})
	    	},
	    	/* 获取课程要求 */
	    	getRequire: function() {
	    		var _self = this;
	    		$http.get('../api/index.php/Require/getRequire?cid='+ $routeParams.courseId)
	    		.success(function(data) {
	    			if(data.success) {
	    				_self.data.require = data.item; 
	    			}
	    		})
	    	}
	    }
	});
