'use strict';

/**
 * @ngdoc service
 * @name supermiodek.configService
 * @description
 * # configService
 * Service in the supermiodek.
 */
angular.module('supermiodek')
    .factory('configService', ['$resource', 'RESOURCES', function($resource, RESOURCES) {
        return $resource(RESOURCES.api + 'config/', {}, {
            'get': {
                method: 'GET'
            },
            'save': {
                method: 'POST'
            },
            'update': {
                url: RESOURCES.api + 'config/:id',
                method: 'PUT',
                params: {id: ':id'}
            }
        });
    }]);
