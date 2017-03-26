'use strict';

/**
 * @ngdoc service
 * @name supermiodek.productservice
 * @description
 * # productservice
 * Service in the supermiodek.
 */
angular.module('supermiodek')
    .factory('productService', ['$resource', 'RESOURCES', function($resource, RESOURCES) {
        return $resource(RESOURCES.api + 'products/', {}, {
            'get': {
                url: RESOURCES.api + 'products/:status',
                method: 'GET',
                params: {status: '@status'}
            },
            'getOne': {
                url: RESOURCES.api + 'product/:id',
                method: 'GET',
                params: {id: '@id'}
            },
            'update': {
                url: RESOURCES.api + 'product/:id',
                method: 'PUT',
                params: {id: ':id'}
            },
            'remove': {
                url: RESOURCES.api + 'product/:id',
                method: 'delete',
                params: {id: ':id'}
            }
        });
    }])
    .factory('saveProductService', ['$resource', 'RESOURCES', function($resource, RESOURCES) {
        return $resource(RESOURCES.api + 'products/', {}, {
            'save': {
                method: 'POST',
            }
        });
    }]);
