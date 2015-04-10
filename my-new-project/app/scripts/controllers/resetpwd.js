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
        /*验证原密码*/
        /*checkOldpwd: function() {
            var _self = this;
            if(_self.data.oldpwd != $scope.data.password) {
                $scope.isPwdError = true;
            } else {
                $scope.isPwdError = false;
            }
        },*/
        /*验证两次密码是否相同*/
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
    		    	id: $scope.data.id,
    		    	studentId: $scope.data.studentId,
    		    	oldpwd: _self.data.oldpwd,
    		    	newpwd: _self.data.newpwd1
    		    }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    		}).success(function(data) {
    			console.log(data);
    			if(data.success) {
    				$window.location.href = '#/home';
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
