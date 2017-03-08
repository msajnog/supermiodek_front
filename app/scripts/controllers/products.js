'use strict';

/**
 * @ngdoc function
 * @name supermiodek.controller:ProductsCtrl
 * @description
 * # ProductsCtrl
 * Controller of the supermiodek
 */
angular.module('supermiodek')
.controller('ProductsCtrl', ['$scope', 'productService', 'MEDIA', function ($scope, productService, MEDIA) {
    $scope.media_path = MEDIA.url;
    productService.get(function(response) {
        if (response.data) {
            $scope.products = response.data;
        }
    });
}]);
