'use strict';

angular.module('atrExpApp')
  .controller('SettingsCtrl', function ($scope, User, Auth) {
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

    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.teamSlogan = 'hi'
    // $scope.$watch('teamSlogan', function(newValue, oldValue) {
    //   if (newValue !== oldValue) {
    //     console.log('User updated:', newValue);
    //     $scope.teamSlogan = newValue
    //   }
    // }, true);
  })
