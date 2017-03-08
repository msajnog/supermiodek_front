'use strict';

/**
 * @ngdoc service
 * @name filmwebFrontApp.categoryService
 * @description
 * # categoryService
 * Service in the filmwebFrontApp.
 */
angular.module('supermiodek')
  .factory('productService', ['$resource', 'API_ENDPOINT', function ($resource, API_ENDPOINT) {
    return  $resource(API_ENDPOINT.url + 'products/', {}, {
      'get': {
        method: 'GET',
      },
    //   'save': {
    //     method: 'POST',
    //   }
    });
  }]);
