'use strict';

angular.module('supermiodek')

    .service('AuthService', ['$q', '$http', 'RESOURCES', function($q, $http, RESOURCES) {
        var LOCAL_TOKEN_KEY = '';
        var isAuthenticated = false;
        var authToken;

        function loadUserCredentials() {
            var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
            if (token) {
                useCredentials(token);
            }
        }

        function storeUserCredentials(token) {
            window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
            useCredentials(token);
        }

        function useCredentials(token) {
            isAuthenticated = true;
            authToken = token;

            // Set the token as header for your requests!
            $http.defaults.headers.common.Authorization = authToken;
        }

        function destroyUserCredentials() {
            authToken = undefined;
            isAuthenticated = false;
            $http.defaults.headers.common.Authorization = undefined;
            window.localStorage.removeItem(LOCAL_TOKEN_KEY);
        }

        var register = function(user) {
            return $q(function(resolve, reject) {
                $http.post(RESOURCES.api + '/signup', user).then(function(result) {
                    if (result.data.status) {
                        resolve(result.data.msg);
                    } else {
                        reject(result.data.msg);
                    }
                });
            });
        };

        var login = function(user) {
            return $q(function(resolve, reject) {
                $http.post(RESOURCES.api + '/authenticate', user).then(function(result) {
                    if (result.data.status) {
                        storeUserCredentials(result.data.token);
                        resolve(result.data.msg);
                    } else {
                        reject(result.data.msg);
                    }
                });
            });
        };

        var logout = function() {
            destroyUserCredentials();
        };

        loadUserCredentials();

        return {
            login: login,
            register: register,
            logout: logout,
            isAuthenticated: function() {return isAuthenticated;},
        };
    }])

    .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
        return {
            responseError: function (response) {
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated,
                }[response.status], response);
                return $q.reject(response);
            }
        };
    })

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    });
