'use strict';

/**
 * @ngdoc overview
 * @name myNewProjectApp
 * @description
 * # myNewProjectApp
 *
 * Main module of the application.
 */
angular
  .module('myNewProjectApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'cgNotify',
    'ui.bootstrap',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/setting', {
        templateUrl: 'views/setting.html',
        controller: 'SettingCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('AppCtrl', function($scope, $http, notify, $window) {
    $scope.appFunc = {
      init: function() {
        $scope.adminConfig = {
          isLogin : false,
          id: '', //用户id
          studentId:'', //学号
          username:'', //用户名
          password:'', //密码
          usertype:'',  //用户角色 老师/学生
          superAdmin: 'false', //用户权限
          teamAdmin: 'false' //用户权限
        }
        $http.get('../api/index.php/User/index').success(function(data) {
          if(data.success) {
            $scope.adminConfig.isLogin = true;
            $scope.adminConfig.id = data.item.id;
            $scope.adminConfig.username = data.item.username;
            $scope.adminConfig.password = data.item.password;
            $scope.adminConfig.usertype = data.item.usertype;
            $scope.adminConfig.superAdmin = data.item.superAdmin;
            $scope.adminConfig.teamAdmin = data.item.teamAdmin;
          }
        })
      },
      loginOut: function() {
        $http.get('../api/index.php/User/loginOut').success(function(data) {
          if(data.success) {
            $scope.adminConfig.isLogin = false;
            $scope.appFunc.cusNotify(data.message, true);
            $window.location.href = '#/'
          }
        })
      },
      cusNotify: function (msg, bool) {
        console.log(msg)
        var msgClass;
        msgClass = bool ? 'alert-success' : 'alert-danger';
        notify({
          message: msg,
          classes: msgClass
        })
      }
    }
  });
