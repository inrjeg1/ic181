'use strict';

describe('Controller: SimulationCtrl', function () {

  // load the controller's module
  beforeEach(module('atrExpApp'));

  var SimulationCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SimulationCtrl = $controller('SimulationCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
