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
    		userId:'',
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
    		    	userId: _self.data.userId,
    		    	password: _self.data.password,
                    usertype: _self.data.usertype
    		    }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    		}).success(function(data) {
                if(data.success) {
                    $scope.data.isLogin = true;
                    $scope.data.userId = _self.data.userId;
                    $scope.data.username = data.item;
                    notify({
                        message: data.message,
                        classes: 'alert-success'
                    })
                    $window.location.href = '#/home'
                }
        	})
    	}
    }
});
