'use strict';

/**
 * @ngdoc function
 * @name myNewProjectApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the myNewProjectApp
 */
angular.module('myNewProjectApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
