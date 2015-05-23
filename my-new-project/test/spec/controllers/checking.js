'use strict';

describe('Controller: CheckingCtrl', function () {

  // load the controller's module
  beforeEach(module('resetpwdApp'));

  var CheckingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CheckingCtrl = $controller('CheckingCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
