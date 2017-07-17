'use strict';

/**
 * @ngdoc service
 * @name supermiodek.contactservice
 * @description
 * # contactservice
 * Service in the supermiodek.
 */
angular.module('supermiodek')
    .factory('contactService', ['$resource', 'RESOURCES', function($resource, RESOURCES) {
        return $resource(RESOURCES.api + 'contact/', {}, {
            'send': {
                method: 'POST'
            }
        });
    }]);
