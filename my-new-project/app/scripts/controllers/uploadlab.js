'use strict';

/**
 * @ngdoc function
 * @name myNewProjectApp.controller:UploadlabCtrl
 * @description
 * # UploadlabCtrl
 * Controller of the myNewProjectApp
 */
angular.module('myNewProjectApp')
  .controller('UploadlabCtrl', function ($scope, FileUploader, $http, $window) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var uploadFunc = $scope.uploadFunc = {
    	data: {
    		labName: '',
    		labIntro: '',
            testType: '',
            questionType: '',
            require: '',
            ctype: ''
    	},
    	initFunc: function() {
            $scope.hasTest = false;
            $scope.isTestOnline = false;
            $scope.testTypes = [
                { name: '没有考核', value: 0 },
                { name: '课后作业', value: 1 },
                { name: '模块测试', value: 2 }
            ];
            $scope.questionTypes = [
                { name: '单选', value: 0 },
                { name: '多选', value: 1 },
                { name: '判断', value: 2 }
            ];
            /* 试题模块 */
            $scope.questions = [];
        },

        /* 监控考核类型 */
        checkTestType: function() {
            var _self = this;
            if(_self.data.testType.value == 2) {
                $scope.qnum = 1;
                /* 初始化第一题 */
                _self.initQuestion($scope.qnum);
            }
        },
        /* 初始化题目 */
        initQuestion: function(num){
            var _self = this;
            if(num) {
                $scope.questions[num] = {
                    store: '',
                    type: _self.data.questionType.value,
                    question: '',
                    answer1: '',
                    answer2: '',
                    answer3: '',
                    answer4: '',
                    answer5: '',
                    answer6: '',
                    answer7: '',
                    correct: '',
                    cid:''
                } 
            }
        },
        /* 判断试题类型 */
        checkQuestionType: function() {
            var _self = this;
        },
    	
    	/* 保存上传课程 */
    	saveCourse: function(bool) {
    		var _self = this;
            console.log(_self.data.testType.value);
            $http({
                    method: 'POST',
                    url: '../api/index.php/Course/addCourse',
                    data: $.param({
                        labName: _self.data.labName,
                        labIntro: _self.data.labIntro,
                        labFile: $scope.cfile,
                        uploader: $scope.adminConfig.userName,
                        testType: _self.data.testType.value,
                        ctype: _self.data.ctype
                        
                    }),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data) {
                    if(data.success) {
                        console.log(1111, data);
                        $scope.appFunc.cusNotify(data.message, true);
                        if(!bool) {
                            $window.location.href = "#/home";
                        } else {
                            $scope.hasTest = true;
                        }
                    } 
                })
    	},
        /* 保存考核要求 */
        saveRequire: function(id) {
            console.log(id);
            var _self = this;
            $http({
                method: 'POST',
                url: '../api/index.php/Course/addRequire',
                data: $.param({
                    /*courseId: _self.data.labIntro,*/
                    require: _self.data.require,
                    courseId: id
                }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data) {
                $scope.appFunc.cusNotify(data.message, true);
                $window.location.href = "#/home";
            })
        },

        /* 保存试题 */
        saveQuestion: function() {
            var _self = this;
        },
        /* 下一题 */
        nextQuestion: function() {
            var _self = this;
            $scope.qnum = $scope.qnum + 1;
            _self.initQuestion($scope.qnum);
            console.log($scope.questions);
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
