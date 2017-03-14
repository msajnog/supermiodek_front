'use strict';

/**
 * @ngdoc function
 * @name supermiodek.controller:ProductsCtrl
 * @description
 * # ProductsCtrl
 * Controller of the supermiodek
 */
angular.module('supermiodek')
.controller('ProductsCtrl', ['$scope', 'productService', 'FileUploader', 'MEDIA', function ($scope, productService, FileUploader, MEDIA) {
    $scope.media_path = MEDIA.url;
    $scope.product = {};

    productService.get(function(response) {
        if (response.data) {
            $scope.products = response.data;
        }
    });

    $scope.uploader = new FileUploader({
        queueLimit: 1,
        url: 'http://127.0.0.1:8080/api/upload/',
        // removeAfterUpload: true
    });

    // $scope.uploader.onProgressItem = function (item, progress) {
        // console.log(item);
        // console.log(progress);
    // };

    $scope.saveProduct = function () {
        if (!$scope.addProductForm.$valid) {
            $scope.formInvalid = true;
            return;
        } else {
            $scope.formInvalid = false;
        }

        $scope.uploader.queue[0].upload()

        $scope.uploader.onError = function (err) {
          return;
        };

        $scope.uploader.onSuccessItem = function (item, response, status, headers) {
          if (response.status) {
            $scope.product.image = response.path;

            productService.save($scope.product, function (response) {
                console.log(response);
            });
          }
        };

        console.log($scope.product);
    };

}]);
