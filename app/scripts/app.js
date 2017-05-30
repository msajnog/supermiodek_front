'use strict';

angular.
    module('supermiodek', [
    'ngResource',
    'ui.router',
    'angularFileUpload',
    'ngDialog'
    ])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider.state('/', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        data: {
            loadMainBanner: true,
            adminPage: false
        }
    }).state('shop', {
        url: '/shop',
        templateUrl: 'views/shop.html',
        controller: 'ShopCtrl',
        data: {
            loadMainBanner: true,
            adminPage: false
        }
    }).state('products', {
        url: '/products',
        templateUrl: 'views/products.html',
        controller: 'ProductsCtrl',
        data: {
            loadMainBanner: false,
            adminPage: true
        }
    }).state('addProduct', {
        url: '/products/add',
        templateUrl: 'views/addProduct.html',
        controller: 'ProductsCtrl',
        data: {
            loadMainBanner: false,
            adminPage: true
        }
    }).state('editProduct', {
        url: '/product/:id',
        templateUrl: 'views/editProduct.html',
        controller: 'EditProductCtrl',
        data: {
            loadMainBanner: false,
            adminPage: true
        }
    }).state('orders', {
        url: '/orders',
        templateUrl: 'views/orders.html',
        controller: 'OrdersCtrl',
        data: {
            loadMainBanner: false,
            adminPage: true
        }
    }).state('editOrder', {
        url: '/order/:id',
        templateUrl: 'views/editOrder.html',
        controller: 'EditOrderCtrl',
        data: {
            loadMainBanner: false,
            adminPage: true
        }
    }).state('config', {
        url: '/config',
        templateUrl: 'views/config.html',
        controller: 'ConfigCtrl',
        data: {
            loadMainBanner: false,
            adminPage: true
        }
    });

    $urlRouterProvider.otherwise("/");
    $locationProvider.hashPrefix('');
    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    // });
}])
.run(
[ '$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}]);
