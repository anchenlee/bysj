'use strict';

/**
 * @ngdoc function
 * @name myNewProjectApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myNewProjectApp
 */
angular.module('myNewProjectApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.mainFunc = {
    	data: {
            keyword: '',
            isSelected: []
        },
    	init: function() {
    		var _self = this;
    		_self.getCourse();
            _self.data.isSelected[0] = true;
    	},
    	getCourse: function() {
            var _self = this;
    		$http.get('../api/index.php/Course/getCourse')
    		.success(function(data) {
    			if(data.success) {
                    _self.data.isSelected[0] = true;
    				$scope.courseLists = data.item;
    			}
    		})
    	},
        /* 关键字搜索 */
        searchFunc: function() {
            var _self = this;
            if(_self.data.keyword) {
                $http.get('../api/index.php/Course/getCourse?keyword='+ _self.data.keyword)
                    .success(function(data) {
                        console.log(data);
                        if(data.success) {
                            $scope.courseLists = data.item;
                        }
                    })
            }
        },
        /* 按键盘搜索 */
        keyPress: function(e) {
            var _self = this;
            if(e.keyCode == 13) {
                _self.searchFunc();
            }
        },
        /*根据类型筛选*/
        courseType: function(o) {
            var _self = this;
            _self.data.isSelected = [];
            if(!o) {
                _self.getCourse();
            } else {
                $http.get('../api/index.php/Course/getCourse?ctype='+ o)
                    .success(function(data) {
                        if(data.success) {
                            _self.data.isSelected[o] = true;
                            $scope.courseLists = data.item;
                        }
                    })
                }
        }
    }
    });
