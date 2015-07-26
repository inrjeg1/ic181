'use strict';

angular.module('atrExpApp')
  .controller('MarketCtrl', function ($scope, $modal) {

    // load selected customer in modal
    $scope.showCustomer = function(cust) {
      $scope.selected = cust
    }

    // modal backdrop animation
    $scope.animationsEnabled = true

    $scope.open = function (size) {
      // open modal and load tpl
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/market/tpl/modal-customer-decision.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          selectedCustomer: function () {
            return $scope.selected;
          }
        }
      });
      // add selected customer to $scope.selected
      modalInstance.result.then(function (selectedCustomer) {
        $scope.selected = selectedCustomer;
      })
    };
  })

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, selectedCustomer, $http) {
    // re-add selectedCustomer to $scope.selected
    $scope.selected = selectedCustomer;

    // $scope.ok = function () {
    //   $modalInstance.close($scope.selected.item);
    // };

    $scope.closeModal = function () {
      $modalInstance.dismiss('close');
    };
  
    //add offer
    $scope.addOffer = function() {
      
      console.log($scope.selected)
      var thisoffer = {
        team: "Atradius Credit Insurance", 
        customer_id: $scope.selected.id, 
        customer_name: $scope.selected.name, 
        price: 20, 
        riskacceptance: 90
      }

      console.log(thisoffer)
    
      $http.post('/api/offer', thisoffer)
           .success(function(data){alert("success")})
           .error(function(err){alert(err)});
      
      $scope.closeModal()    
      };
})

.controller('LoadMarketCtrl', function LoadMarketCtrl($resource) {
    var vm = this;
    // fetch data with $resource
    $resource('/api/customer').query().$promise.then(function(customers) {
        vm.customers = customers;
    });
})

.controller('SpinnerCtrl', SpinnerCtrl)
      .directive('jqSpinner', jqSpinner);

  function SpinnerCtrl() {
      var spinner = this;
      spinner.val = 0;
  };

  function jqSpinner() {
      return {
          restrict: 'A',
          require: 'ngModel',
          link: function (scope, element, attrs, spinner) {
              element.spinner({
                  spin: function (event, ui) {
                      spinner.$setViewValue(ui.value);
                  }
              });
          }
      };
  };

