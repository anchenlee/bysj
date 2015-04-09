'use strict';

/**
 * @ngdoc function
 * @name myNewProjectApp.controller:ResetpwdCtrl
 * @description
 * # ResetpwdCtrl
 * Controller of the myNewProjectApp
 */
angular.module('myNewProjectApp')
  .controller('ResetpwdCtrl', function ($scope, $http, $window, notify) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.pwdFunc = {
    	data: {
    		oldpwd: '',
    		newpwd1: '',
    		newpwd2: ''
    	},
    	checkPwd: function() {
    		var _self = this;
    		if(_self.data.newpwd1 != _self.data.newpwd2) {
    			$scope.pwdCheckError = true;
    		} else {
    			$scope.pwdCheckError = false;
    		}
    	},
    	saveReset: function() {
    		var _self = this;
    		console.log(_self.data);
    		$http({
    			method: 'POST',
    		    url: '../api/index.php/User/resetpwd',
    		    data: $.param({
    		    	userId: $scope.data.userId
    		    }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    		}).success(function(data) {
    			console.log(data);
    			if(data.success) {
    				$window.location.href = '#/home';
    				notify({
                        message: data.message,
                        classes: 'alert-success'
                    })
                    $scope.appFunc.cusNotify(data.message, true);
    			} else {
    				$scope.appFunc.cusNotify(data.message, false);
    			}
    		})
    	},
    	cancel : function() {
    		$window.location.href = '#/home';
    	}
    }
});
