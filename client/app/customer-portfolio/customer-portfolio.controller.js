'use strict';

angular.module('atrExpApp')

  .controller('CustomerPortfolioCtrl', function ($scope, $modal) {

    $scope.showCustomer = function(cust) {
      $scope.selected = cust
    }

    $scope.animationsEnabled = false

    $scope.open = function (size) {

      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/customer-portfolio/tpl/modal-customer-decision.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.selected;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      })
    };

  })

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

    // console.log($templateCache.get('./modal-customer-decision.html'))

    $scope.selected = items;

    // $scope.ok = function () {
    //   $modalInstance.close($scope.selected.item);
    // };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  })

.controller('AngularWayCtrl', AngularWayCtrl);

function AngularWayCtrl($resource) {
    var vm = this;
    $resource('/api/customer').query().$promise.then(function(persons) {
        vm.persons = persons;
    });
}

  