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
            'save': {
                method: 'POST',
            }
        });
    }]);
