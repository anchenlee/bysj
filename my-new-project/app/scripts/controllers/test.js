'use strict';

/**
 * @ngdoc function
 * @name myNewProjectApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the myNewProjectApp
 */
angular.module('myNewProjectApp')
  .controller('TestCtrl', function ($scope, $routeParams, $http, $window) {
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
    		$http.get('../api/index.php/Exam/getExamPaper?cid=' + $routeParams.testId)
    		.success(function(data) {
    			if(data.success) {
    				$scope.questions = data.item;
                    /* 初始化各题型 */
                    $scope.aIndex = ['answer1', 'answer2', 'answer3', 'answer4', 'answer5', 'answer6', 'answer7'];
                    $scope.sinSelect = {}; //单选
                    $scope.mulSelect = {}; //多选
                    $scope.checking = {}; //判断
                    /* 对试卷进行分类处理 */
                    $scope.questions.forEach(function(v, key) {
                       /* console.log(v, key);*/
                        if(v.type == 0) {
                            $scope.sinSelect[v.id] = v;
                            $scope.sinSelect[v.id].answer = '';
                        } else if(v.type == 1) {
                            $scope.mulSelect[v.id] = v;
                            $scope.mulSelect[v.id].answer = '';
                        } else {
                            $scope.checking[v.id] = v;
                            $scope.checking[v.id].answer = '';
                        }
                    })
    			}
    		})
    	},
         /* 多选题选项 添加正确答案 */
        checkBoxSel: function(o, v, e) {
            $scope.pid = $scope.pid || e.id;
            $scope.arr = $scope.arr || [];
            if(e.id != $scope.pid) {
               $scope.arr = []; 
               $scope.pid = e.id;
            }

            if(o) {
                $scope.arr.push(v);
            } else {
                $scope.arr.forEach(function(value, key) {
                    console.log(value, key);
                    if( v == value) {
                        console.log(v, value);
                        $scope.arr.splice(key, 1);
                    }
                })
            }
            e.answer = $scope.arr.join(',');
        },
        /* 提交试卷 */
        submitPaper: function() {
            var _self = this;
            _self.countScore();
            $scope.ans = {};
            angular.forEach($scope.sinSelect, function(v, key) {
                $scope.ans[v.id] = v.answer;
            });
            angular.forEach($scope.mulSelect, function(v, key) {
                $scope.ans[v.id] = v.answer;
            });
            angular.forEach($scope.checking, function(v, key) {
                $scope.ans[v.id] = v.answer;
            });

            $http({
                method: 'POST',
                url: '../api/index.php/Exam/submitPaper',
                data: $.param({
                    uid: $scope.adminConfig.id,
                    uname: $scope.adminConfig.userName,
                    cid: $routeParams.testId,
                    score: $scope.score,
                    /* mtime: 60,*/  //用时
                    /*ip:*/ 
                    papers: $.param($scope.ans)
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(data) {
                console.log(data);
                if(data.success) {
                    $scope.appFunc.cusNotify(data.message, true);
                    $window.location.href = "#/course/" + $routeParams.testId;
                } else {
                     $scope.appFunc.cusNotify(data.message, false);
                }
            })

            //用户id  $scope.adminConfig.id
            //用户名  $scope.adminConfig.userName
            //得分    $scope.score
            //用时
            //试卷答案 $scope.ans;
        },
        /* 计算得分 */
        countScore: function() {
            $scope.score = 0;
            angular.forEach($scope.sinSelect, function(v, key) {
                if(v.answer == v.correct) {
                    $scope.score ++;
                }
            });
            angular.forEach($scope.mulSelect, function(v, key) {
                if(v.answer == v.correct) {
                    $scope.score ++;
                }
            });
            angular.forEach($scope.checking, function(v, key) {
                if(v.answer == v.correct) {
                    $scope.score ++;
                }
            });
        }
    }
});
