'use strict';

/**
 * @ngdoc function
 * @name myNewProjectApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myNewProjectApp
 */
angular.module('myNewProjectApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
