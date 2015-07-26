'use strict';

angular.module('atrExpApp')
  .controller('MadeOffersCtrl', function ($scope, $modal, $http) {

    // load selected customer in modal
    $scope.showOffer = function(selectedOffer) {
      $scope.selected = selectedOffer
      $scope.offerCustomer = function(offerCustomer){
        $http.get('/api/customer/' + selected.customer_id, offerCustomer)
             .success(function(data){alert("success")})
             .error(function(err){alert(err)});
        console.log(offerCustomer)
        alert(offerCustomer)
      }

    }

    // modal backdrop animation
    $scope.animationsEnabled = true

    $scope.open = function (size) {
      // open modal and load tpl
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/madeoffers/tpl/adjust-offer-decision.html',
        controller: 'AdjustOfferInstanceCtrl',
        size: size,
        resolve: {
          selectedOffer: function () {
            return $scope.selected;
          }
        }
      });
      // add selected customer to $scope.selected
      modalInstance.result.then(function (selectedOffer) {
        $scope.selected = selectedOffer;
      })
    };
  })

.controller('AdjustOfferInstanceCtrl', function ($scope, $modalInstance, selectedOffer, $http) {
    // re-add selectedCustomer to $scope.selected
    $scope.selected = selectedOffer;
    

    // $scope.ok = function () {
    //   $modalInstance.close($scope.selected.item);
    // };

    $scope.closeModal = function () {
      $modalInstance.dismiss('close');
    };
  
    //add offer
    $scope.addOffer = function() {
      
      console.log($scope.selected)
      var thisoffer = {team: "Test", customer: $scope.selected.name, price: 20, riskacceptance: 90}
      console.log(thisoffer)

    
      $http.post('/api/offer', thisoffer)
           .success(function(data){alert("success")})
           .error(function(err){alert(err)});
      
      $scope.closeModal()    
      };
})

.controller('LoadMadeOffersCtrl', function LoadMadeOffersCtrl($resource) {
    var vm = this;
    // fetch data with $resource
    $resource('/api/offer').query().$promise.then(function(offers) {
        vm.offers = offers;
    });
})

.controller('SpinnerCtrl', SpinnerCtrl)
      .directive('jqSpinner', jqSpinner);

  function SpinnerCtrl($scope) {
      var spinner = this;
      spinner.val = $scope.selected.riskacceptance;
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

