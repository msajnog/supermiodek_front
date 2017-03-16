'use strict';

/**
 * @ngdoc service
 * @name filmwebFrontApp.categoryService
 * @description
 * # categoryService
 * Service in the filmwebFrontApp.
 */
angular.module('supermiodek')
    .factory('productService', ['$resource', 'RESOURCES', function($resource, RESOURCES) {
        return $resource(RESOURCES.api + 'products/:status', {status: '@status'}, {
            'get': {
                method: 'GET',
                params: {status: '@status'}
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
