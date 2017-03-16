'use strict';

angular.module('supermiodek')
    .constant('AUTH_EVENTS', {
        notAuthenticated: 'auth-not-authenticated'
    })
    .constant('RESOURCES', (function() {
        var domain = 'http://127.0.0.1:8080/'; //  For a simulator use: 'http://127.0.0.1:8080/api'

        return {
            domain: domain,
            api: domain + 'api/'
        }
    })())
    .constant('MEDIA', {
        url: '/media/'
    });
