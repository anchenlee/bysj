'use strict';

/**
 * @ngdoc function
 * @name myNewProjectApp.controller:UploadlabCtrl
 * @description
 * # UploadlabCtrl
 * Controller of the myNewProjectApp
 */
angular.module('myNewProjectApp')
  .controller('UploadlabCtrl', function ($scope, FileUploader, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var uploadFunc = $scope.uploadFunc = {
    	data: {
    		labName: '',
    		labIntro: ''
    	},
    	initFunc: function() {

    	},
    	/* 保存上传课程 */
    	saveCourse: function() {
    		var _self = this;
    		$http({
				method: 'POST',
				url: '../api/index.php/Course/addCourse',
				data: $.param({
					labName: _self.data.labName,
					labIntro: _self.data.labIntro,
					labFile: $scope.cfile,
					uploader: $scope.adminConfig.userName
				}),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data) {
                
			})
    	}
    }
    var uploader = $scope.uploader = new FileUploader({
            url: '../api/index.php/FileUpload/upload',
            autoUpload: true,
            isUploading : true
        });

        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function(item) {  //上传文件类型
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
        /*uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };*/
        /*uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };*/
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
            $scope.cfile = response.answer.file;
        };
        /*
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };*/
  });
