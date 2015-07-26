'use strict';

describe('Controller: MadeOffersCtrl', function () {

  // load the controller's module
  beforeEach(module('atrExpApp'));

  var MarketCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MarketCtrl = $controller('MadeOffersCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
