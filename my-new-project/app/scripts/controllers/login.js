'use strict';

/**
 * @ngdoc function
 * @name myNewProjectApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the myNewProjectApp
 */
angular.module('myNewProjectApp')
  .controller('LoginCtrl', function ($scope, $http, notify, $window) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.user = {
    	data: {
    		studentId:'',
    		password:'',
    		usertype:''
    	},
    	init: function() {
            /*$scope.isLogin = true;*/
    	},
    	/**
    	*  登入方法
    	*/
    	loginFunc: function() {
            var _self = this;
    		$http({
    		 	method: 'POST',
    		    url: '../api/index.php/User/login',
    		    data: $.param({
    		    	studentId: _self.data.studentId,
    		    	password: _self.data.password,
                    usertype: _self.data.usertype
    		    }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    		}).success(function(data) {
                console.log(333, data);
                if(data.success) {
                    $scope.data.isLogin = true;
                    $scope.data.studentId = _self.data.studentId;
                    $scope.data.username = data.item.username;
                    $scope.data.id = data.item.id;
                    $scope.appFunc.cusNotify(data.message, true);
                    $window.location.href = '#/home';
                }
        	})
    	}
    }
});
