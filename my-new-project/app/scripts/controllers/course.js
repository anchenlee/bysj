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
	    				if(data.item.testtype == 1) {
	    					_self.getRequire();
	    				}
	    				if(data.item.ctype) {
	    					_self.getRelaCourse(data.item.ctype);
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
	    	},
	    	/*  获取相关课程*/
	    	getRelaCourse: function(type) {
	    		var _self = this;
	    		$http.get('../api/index.php/Course/getCourse?ctype='+ type)
	    		.success(function(data) {
	    			if(data.success) {
	    				data.item.forEach(function(v, key) {
	    					if(v.id == _self.data.course) {
	    						data.item.splice(key, 1);
	    					}
	    				})
	    				$scope.relaCourses = data.item; 
	    			}
	    		})
	    	}
	    }
	});
