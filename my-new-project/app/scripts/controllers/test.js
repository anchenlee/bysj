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
    		$http.get('../api/index.php/Exam/getExamPaper?cid=' + $routeParams.testId)
    		.success(function(data) {
    			if(data.success) {
    				console.log(data);
    				$scope.questions = data.item;
                    /* 初始化各题型 */
                    $scope.aIndex = ['answer1', 'answer2', 'answer3', 'answer4', 'answer5', 'answer6', 'answer7'];
                    $scope.sinSelect = {}; //单选
                    $scope.mulSelect = {}; //多选
                    $scope.checking = {}; //判断
                    /* 对试卷进行分类处理 */
                    $scope.questions.forEach(function(v, key) {
                        console.log(v, key);
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
        /* 提交试卷 */
        submitPaper: function() {
            console.log($scope.sinSelect);
            console.log($scope.mulSelect);
            console.log($scope.checking);
        }
    }
  });
