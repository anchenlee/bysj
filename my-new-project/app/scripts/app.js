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
    'angularFileUpload',
    /*'cipchk'*/
    'pdf'
  ])
  .config(function ($routeProvider) {
    console.log(111, $routeProvider);/*
    console.log(222, $routeParams);*/
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
      .when('/uploadlab', {
        templateUrl: 'views/uploadlab.html',
        controller: 'UploadlabCtrl'
      })
      .when('/course/:courseId', {
        templateUrl: 'views/course.html',
        controller: 'CourseCtrl'
      })
      .when('/test/:testId', {
        templateUrl: 'views/test.html',
        controller: 'TestCtrl'
      })
      .when('/task/:taskId', {
        templateUrl: 'views/task.html',
        controller: 'TaskCtrl'
      })
      .when('/checking/:checkingId', {
        templateUrl: 'views/checking.html',
        controller: 'CheckingCtrl'
      })
      .when('/marking/:markingId/:uid', {
        templateUrl: 'views/marking.html',
        controller: 'MarkingCtrl'
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
          userId: '', //学号
          userName: '', //用户名
          password: '', //密码
          userType: '',  //用户角色 老师/学生
          superAdmin: '', //用户权限
          teamAdmin: '' //用户权限
        }
        $http.get('../api/index.php/User/index').success(function(data) {
          if(data.success) {
            console.log(data);
            $scope.adminConfig.isLogin = true;
            $scope.adminConfig.id = data.item.id;
            $scope.adminConfig.userName = data.item.userName;
            $scope.adminConfig.password = data.item.password;
            $scope.adminConfig.userType = data.item.userType;
            $scope.adminConfig.superAdmin = (data.item.superAdmin == '0') ? false : true;
            $scope.adminConfig.teamAdmin = (data.item.teamAdmin == '0') ? false : true;
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
        notify.closeAll();
        var msgClass;
        msgClass = bool ? 'alert-success' : 'alert-danger';
        notify({
          message: msg,
          classes: msgClass
        })
      }
    }
  });
