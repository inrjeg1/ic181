'use strict';

angular.module('atrExpApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, toastr) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};

    $scope.languageToggle = ''
    $scope.iconAngle = 'angle-down'

    $scope.toggleLanguage = function() {  
      if ($scope.languageToggle === '') {
        $scope.languageToggle = 'panel-toggled'
      } else {
        $scope.languageToggle = ''
      }
      if ($scope.iconAngle === 'angle-down') {
        $scope.iconAngle = 'angle-up'
      } else {
        $scope.iconAngle = 'angle-down'
      }
    }


    $scope.team = Auth.getCurrentUser;

    // $scope.$watch('team.slogan',function () {
    //     console.log('$scope.team changed: ', $scope.team)
    // })

    // $scope.updateTeam = function (element) {
    //   $http.put('/api/users/' + $scope.teamId, {slogan: element});
    //   console.log('Element: ', element)
    // }

    $scope.changeSlogan = function (form) {
      Auth.changeSlogan($scope.team().slogan)
      .then(function() {
        $scope.message = 'Slogan successfully changed.';
        toastr.success('New slogan is saved in the database.', 'Saved!');
      })
      .catch(function() {
        $scope.errors.other = 'Incorrect slogan'
        $scope.message = ''
      })
    }

    // $scope.teamSlogan = Auth.getCurrentUser;
    // $scope.$watch('teamSlogan', function(newValue, oldValue) {
    //   if (newValue !== oldValue) {
    //     console.log('User updated:', newValue);
    //     $scope.teamSlogan = newValue
    //   }
    // }, true);
    $scope.tags = [
      { text: 'Tag1' },
      { text: 'Tag2' },
      { text: 'Tag3' }
    ];
  })
