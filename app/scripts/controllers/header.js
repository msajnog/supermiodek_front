'use strict';

/**
 * @ngdoc function
 * @name supermiodek.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the supermiodek
 */
angular.module('supermiodek')
.controller('HeaderCtrl', ['$scope', '$state',  function ($scope, $state) {
    $scope.scrollTo = function(elementSelector) {
        if (jQuery(elementSelector).length) {
            jQuery("body").animate({scrollTop: jQuery(elementSelector).offset().top - 80}, "slow");
        } else {
            $state.go('/')
        }
    }
}]);
