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
    'ui.bootstrap'
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
      .when('/resetpwd', {
        templateUrl: 'views/resetpwd.html',
        controller: 'ResetpwdCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('AppCtrl', function($scope, $http, notify, $window) {
    $scope.appFunc = {
      init: function() {
        $scope.data = {
          isLogin : false,
          id: '', //用户id
          studentId:'', //学号
          username:'', //用户名
          password:'', //密码
          usertype:''  //用户角色
        }
        $http.get('../api/index.php/User/index').success(function(data) {
          if(data.success) {
            $scope.data.isLogin = true;
            $scope.data.id = data.item.id;
            $scope.data.username = data.item.username;
          }
        })
      },
      loginOut: function() {
        $http.get('../api/index.php/User/loginOut').success(function(data) {
          if(data.success) {
            $scope.data.isLogin = false;
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
