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
                // url: RESOURCES.api + 'orders/',
                method: 'GET'
            },
            'save': {
                method: 'POST'
            },
            'update': {
                // url: RESOURCES.api + 'order/:id',
                method: 'PUT',
                // params: {id: ':id'}
            },
            'remove': {
                url: RESOURCES.api + 'order/:id',
                method: 'delete',
                params: {id: ':id'}
            }
        });
    }]);
