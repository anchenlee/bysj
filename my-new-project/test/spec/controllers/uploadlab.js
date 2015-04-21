'use strict';

describe('Controller: UploadlabCtrl', function () {

  // load the controller's module
  beforeEach(module('resetpwdApp'));

  var UploadlabCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UploadlabCtrl = $controller('UploadlabCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
