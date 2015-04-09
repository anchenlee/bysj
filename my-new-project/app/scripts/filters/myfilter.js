'use strict';

/**
 * @ngdoc filter
 * @name myNewProjectApp.filter:myFilter
 * @function
 * @description
 * # myFilter
 * Filter in the myNewProjectApp.
 */
angular.module('myNewProjectApp')
  .filter('myFilter', function () {
    return function (input) {
      return 'myFilter filter: ' + input;
    };
  });
