'use strict';

angular.module('atrExpApp')
  .service('Admin', function ($resource) {
    this.rounds = $resource('/api/rounds/');
  })
  .factory('Round', function ($resource) {
    return $resource('/api/rounds/:roundId', {}, {
        save: { method: 'POST' },
        update: { method: 'PUT', params: {entryId: '@roundId'} }
      });
  });