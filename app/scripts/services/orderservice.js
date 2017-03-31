'use strict';

/**
 * @ngdoc service
 * @name supermiodek.orderservice
 * @description
 * # orderservice
 * Service in the supermiodek.
 */
angular.module('supermiodek')
    .factory('orderService', ['$resource', 'RESOURCES', function($resource, RESOURCES) {
        return $resource(RESOURCES.api + 'order/', {}, {
            'get': {
                url: RESOURCES.api + 'orders/',
                method: 'GET',
            },
            'save': {
                method: 'POST',
            },
            'getOne': {
                url: RESOURCES.api + 'order/:id',
                method: 'GET',
                params: {id: '@id'}
            },
        });
    }]);
