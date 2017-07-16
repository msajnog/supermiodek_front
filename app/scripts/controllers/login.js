'use strict';

angular.module('supermiodek')
    .controller('LoginCtrl', ['$scope', '$state', 'AuthService', function($scope, $state, AuthService) {
        $scope.user = {
            name: '',
            password: ''
        };

        $scope.login = function() {
            AuthService.login($scope.user).then(function() {
                $state.go('orders');
            }, function(errMsg) {
                alert('Login failed!\n' + errMsg);
            });
        };
    }]);
