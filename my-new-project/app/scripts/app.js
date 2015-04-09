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
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('AppCtrl', function($scope, $http) {
    $scope.appFunc = {
      init: function() {
        $scope.data = {
          isLogin : false,
          userId:'', //学号
          username:'', //用户名
          password:'', //密码
          usertype:''  //用户角色
        }
        $http.get('../api/index.php/User/index').success(function(data) {
          if(data.success) {
            $scope.data.isLogin = true;
            $scope.data.username = data.item.username;
          }
        })
      },
      loginOut: function() {
        $http.get('../api/index.php/User/loginOut').success(function(data) {
          if(data.success) {
            $scope.data.isLogin = false;
          }
        })
      }
    }
  });
