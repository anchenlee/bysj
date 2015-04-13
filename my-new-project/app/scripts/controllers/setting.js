'use strict';

/**
 * @ngdoc function
 * @name myNewProjectApp.controller:ResetpwdCtrl
 * @description
 * # ResetpwdCtrl
 * Controller of the myNewProjectApp
 */
angular.module('myNewProjectApp')
  .controller('SettingCtrl', function ($scope, $http, $window, notify) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.settingFunc = {
    	data: {
    		oldpwd: '',       //旧密码
    		newpwd1: '',      //新密码
    		newpwd2: '',      //重复新密码
            adminId: '',      //管理员Id
            adminName: '',    //管理员名称
            teacherId: '',    //老师学工号
            teacherName: '',  //老师名称
            studentId: '',    //学生学号
            studentName: ''   //学生名称
    	},
        initSetting: function() {
            var _self = this;
            $scope.curShow = {
                resetpwd: false,
                addAdmin: false,
                addTeacher: false,
                addStudent: false
            }
            console.log($scope.adminConfig);
            /* 根据权限设置初始显示内容 */
            if($scope.adminConfig.superAdmin) {
                _self.changeShowModel('addAdmin'); // 超管没有修改密码的权限
            }else{
                _self.changeShowModel('resetpwd'); // 其他类型默认修改密码
            }
        },
        /* 控制设置显示内容切换 */
        changeShowModel : function(key) {
            console.log(1111);
            $scope.curShow = {},
            $scope.curShow[key] = true;
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
    		$http({
    			method: 'POST',
    		    url: '../api/index.php/User/resetpwd',
    		    data: $.param({
    		    	id: $scope.adminConfig.id,
    		    	userId: $scope.adminConfig.userId,
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
        /* 保存管理员 */
        saveTeamAdmin: function() {
            var _self = this;
            $http({
                method: 'POST',
                url: '../api/index.php/User/addAdmin',
                data: $.param({
                    adminId: _self.data.adminId,
                    adminName: _self.data.adminName
                }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data) {
                if(data.success) {
                    $window.location.href = '#/home';
                    $scope.appFunc.cusNotify(data.message, true);
                } else {
                    $scope.appFunc.cusNotify(data.message, false);
                }
            })

        },
         /* 添加老师  学生*/
        saveMember: function(type) {
            var _self = this;
            var param;
            if(type) {
                param = {
                    userId: _self.data.teacherId,
                    userName: _self.data.teacherName,
                    type: type 
                }
            } else {
                param = {
                    userId: _self.data.studentId,
                    userName: _self.data.studentName,
                    type: type 
                }
            }
            $http({
                method: 'POST',
                url: '../api/index.php/User/addMenber',
                data: $.param(param),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data) {
                if(data.success) {
                    $window.location.href = '#/home';
                    $scope.appFunc.cusNotify(data.message, true);
                } else {
                    $scope.appFunc.cusNotify(data.message, false);
                }
            })
        },
        /* 取消设置 */
    	cancel: function() {
    		$window.location.href = '#/home';
    	}
    }
});
