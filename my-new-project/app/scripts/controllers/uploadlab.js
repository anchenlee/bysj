'use strict';

/**
 * @ngdoc function
 * @name myNewProjectApp.controller:UploadlabCtrl
 * @description
 * # UploadlabCtrl
 * Controller of the myNewProjectApp
 */
angular.module('myNewProjectApp')
    .controller('UploadlabCtrl', function($scope, FileUploader, $http, $window) {
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
                ctype: '',
                cid: ''
            },
            initFunc: function() {
                $scope.hasTest = false;
                $scope.isTestOnline = false;
                $scope.testTypes = [{
                    name: '没有考核',
                    value: 0
                }, {
                    name: '课后作业',
                    value: 1
                }, {
                    name: '模块测试',
                    value: 2
                }];
                $scope.questionTypes = [{
                    name: '单选',
                    value: 0
                }, {
                    name: '多选',
                    value: 1
                }, {
                    name: '判断',
                    value: 2
                }];
                /* 试题模块 */
                $scope.questions = [];
            },

            /* 监控考核类型 */
           /* checkTestType: function() {
                var _self = this;
                if (_self.data.testType.value == 2 && $scope.hasTest) {
                    $scope.qnum = 0;
                  
                    _self.initQuestion($scope.qnum);
                }
            },*/
            /* 初始化题目 */
            initQuestion: function(num) {
                var _self = this;
                if (num != null) {
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
                        cid: _self.data.cid
                    }
                    $scope.arr = [];
                }
            },
            /* 判断试题类型 */
            checkQuestionType: function() {
                var _self = this;
                console.log(666, _self.data.questionType.value);
                $scope.questions[$scope.qnum].type = _self.data.questionType.value;
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
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).success(function(data) {
                    if (data.success) {
                        console.log(1111, data);
                        $scope.appFunc.cusNotify(data.message, true);
                        if (!bool) {
                            $window.location.href = "#/home";
                        } else {
                            $scope.hasTest = true;
                            _self.data.cid = data.item;
                            if (_self.data.testType.value == 2 && $scope.hasTest) {
                                console.log('lee', _self.data.cid);
                                $scope.qnum = 0;
                                /* 初始化第一题 */
                                _self.initQuestion($scope.qnum);
                                console.log('lee', _self.data.cid);
                            }
                        }
                    }
                })
            },
            /* 保存考核要求 */
            saveRequire: function() {
                var _self = this;
                $http({
                    method: 'POST',
                    url: '../api/index.php/Require/addRequire',
                    data: $.param({
                        require: _self.data.require,
                        cid: _self.data.cid
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).success(function(data) {
                    $scope.appFunc.cusNotify(data.message, true);
                    $window.location.href = "#/home";
                })
            },

            /* 保存试题 */
            saveQuestion: function() {
                var _self = this;
                console.log(333, $scope.questions);
                $http({
                    method: 'POST',
                    url: '../api/index.php/Exam/addExamPaper',
                    data: $.param({
                        questions: $scope.questions
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).success(function(data) {
                    if(data.success) {
                        $scope.appFunc.cusNotify(data.message, true);
                        $window.location.href = "#/home";
                    } else {
                         $scope.appFunc.cusNotify(data.message, false);
                    }
                })
            },
            /* 下一题 */
            nextQuestion: function() {
                var _self = this;
                $scope.qnum = $scope.qnum + 1;
                _self.initQuestion($scope.qnum);
            },
            /* 多选题选项 添加正确答案 */
            checkBoxSel: function(o, v) {
                if(o) {
                    $scope.arr.push(v);
                } else {
                    $scope.arr.forEach(function(value, key) {
                        if( v == value) {
                            $scope.arr.splice(key, 1);
                        }
                    })
                }
                $scope.questions[$scope.qnum].correct = $scope.arr.join(',');
            }
        }



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