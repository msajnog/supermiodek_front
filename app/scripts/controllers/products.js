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
    $scope.regex = '^\d+,\d+$';

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

    $scope.removeItem = function () {
        $scope.uploader.queue[0].remove();
        angular.element("input[type='file']").val('');
    };

    $scope.saveProduct = function () {
        $scope.submitSuccess = false;
        var file = $scope.uploader.queue[0];

        if (!$scope.addProductForm.$valid) {
            $scope.formInvalid = true;
            return;
        } else {
            $scope.formInvalid = false;
        }

        if (file) {
            $scope.uploader.queue[0].upload()
            $scope.imageInvalid = false;
        } else {
            $scope.imageInvalid = true;
            return;
        }

        $scope.uploader.onError = function (err) {
          return;
        };

        $scope.uploader.onSuccessItem = function (item, response, status, headers) {
          if (response.status) {
            $scope.product.image = response.path;

            productService.save($scope.product, function (response) {
                console.log(response);
                $scope.product = {};
                $scope.removeItem();

                $scope.submitSuccess = true;
                $scope.successMessage = response.message;
            });
          }
        };

        console.log($scope.product);
    };

}]);
