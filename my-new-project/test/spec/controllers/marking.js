'use strict';

describe('Controller: MarkingCtrl', function () {

  // load the controller's module
  beforeEach(module('resetpwdApp'));

  var MarkingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MarkingCtrl = $controller('MarkingCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
