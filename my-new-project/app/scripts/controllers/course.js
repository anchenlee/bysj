'use strict';

/**
 * @ngdoc function
 * @name myNewProjectApp.controller:CourseCtrl
 * @description
 * # CourseCtrl
 * Controller of the myNewProjectApp
 */
angular.module('myNewProjectApp')
	.controller('CourseCtrl', function ($scope, $routeParams, $http, FileUploader) {
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
	    		$scope.hasSubmitTask = false;
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
	    	},
	    	/* 交作业 */
	    	submitHomework: function() {
	    		var _self = this;
                $http({
                    method: 'POST',
                    url: '../api/index.php/Task/addTask',
                    data: $.param({
                        uid: $scope.adminConfig.id,
                        uname: $scope.adminConfig.userName,
                        taskfile: $scope.cfile,
                        cid: $routeParams.courseId
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).success(function(data) {
                    if (data.success) {
                    	$scope.appFunc.cusNotify(data.message, true);
                    	$scope.hasSubmitTask = true;
                    } else{
                    	$scope.appFunc.cusNotify(data.message, false);
                    }
                })
	    	}
	    }

	    /* 上传文件 */
	    var uploader = $scope.uploader = new FileUploader({
            url: '../api/index.php/FileUpload/upload',
            autoUpload: true,
            isUploading: true
        });

        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function(item) { //上传文件类型
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
            $scope.cfile = response.answer.file;
        };
	});


