'use strict';

angular.module('supermiodek')
.controller('InsideCtrl', ['$scope', 'AuthService', '$state', function($scope, AuthService, $state) {
    $scope.destroySession = function() {
        AuthService.logout();
    };

    $scope.logout = function() {
        AuthService.logout();
        $state.go('login');
    };
}]);
