'use strict';

/**
 * @ngdoc function
 * @name myNewProjectApp.controller:MarkingCtrl
 * @description
 * # MarkingCtrl
 * Controller of the myNewProjectApp
 */
angular.module('myNewProjectApp')
  .controller('MarkingCtrl', function ($scope, $http, $routeParams) {
    $scope.awesomeThings = [
      	'HTML5 Boilerplate',
      	'AngularJS',
      	'Karma'
    ];

    $scope.markingFunc = {
    	data: {
    		uInfo: ''
    	},
    	initFunc: function() {
    		var _self = this;
    		_self.getUserRecord().then(function(response) {
    			if(response.data.success) {
    				_self.getExamPaper();
    			}
    		});
    	},
    	getExamPaper: function() {
    		var _self = this;
    		$http.get('../api/index.php/Exam/getExamPaper?cid=' + $routeParams.markingId)
    		.success(function(data) {
    			if(data.success) {
    				$scope.questions = data.item;
                    /* 初始化各题型 */
                    $scope.aIndex = ['answer1', 'answer2', 'answer3', 'answer4', 'answer5', 'answer6', 'answer7'];
                    $scope.sinSelect = {}; //单选
                    $scope.mulSelect = {}; //多选
                    $scope.checking = {}; //判断

					/* 对试卷进行判错处理 */
					angular.forEach($scope.questions, function(v, key) {
						angular.forEach($scope.userAns, function( v1, key1) {

							if(v.id == key1) {
								$scope.questions[key].answer = v1;
								if($scope.questions[key].correct == v1) {
									$scope.questions[key].flag = true;
								} else {
									$scope.questions[key].flag = false;
								}
							}
						})
					})

					/* 试题分类 */
                    angular.forEach($scope.questions, function(v, key) {
		                console.log(v, key);
		                if(v.type == 0) {
		                    $scope.sinSelect[v.id] = v;
		                } else if(v.type == 1) {
		                    $scope.mulSelect[v.id] = v;
		                    v.ans = {};
		                    angular.forEach(v.answer, function(v2, key2) {
		                    	console.log(2222, v2, key2);
		                    	if(v.answer[key2] && v.answer[key2] != ',') {
		                    		v.ans[v2] = true;
		                    	}
		                    })
		                } else {
		                    $scope.checking[v.id] = v;
		                }
		            })
    			}
    		})
    	},
    	/* 获取该生考试记录 */
    	getUserRecord: function() {
    		var _self = this;
    		return $http.get('../api/index.php/Exam/getUserRecord?cid=' + $routeParams.markingId + '&uid=' + $routeParams.uid)
    		.success(function(data) {
    			if(data.success) {
    				_self.data.uInfo = data.item;
    				$scope.userAns = angular.fromJson(data.item.papers); //获取考生答案
    			}
    		})
    	},
    	/* 判断考生测试结果 */
    	getDetermine: function() {
    		//$scope.userAns; 考生答案  Object
    		
            
    	}
    }
});
