'use strict';

/**
 * @ngdoc function
 * @name myNewProjectApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the myNewProjectApp
 */
angular.module('myNewProjectApp')
  .controller('TestCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
