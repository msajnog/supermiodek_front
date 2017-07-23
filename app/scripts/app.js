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
        url: '/sklep',
        templateUrl: 'views/shop.html',
        controller: 'ShopCtrl',
        data: {
            loadMainBanner: true,
            adminPage: false
        }
    }).state('products', {
        url: '/produkty',
        templateUrl: 'views/products.html',
        controller: 'ProductsCtrl',
        data: {
            loadMainBanner: false,
            adminPage: true
        },
        requiresAuth: true
    }).state('addProduct', {
        url: '/produkty/dodaj',
        templateUrl: 'views/addProduct.html',
        controller: 'ProductsCtrl',
        data: {
            loadMainBanner: false,
            adminPage: true
        },
        requiresAuth: true
    }).state('editProduct', {
        url: '/produkty/:id',
        templateUrl: 'views/editProduct.html',
        controller: 'EditProductCtrl',
        data: {
            loadMainBanner: false,
            adminPage: true
        },
        requiresAuth: true
    }).state('orders', {
        url: '/zamowienia',
        templateUrl: 'views/orders.html',
        controller: 'OrdersCtrl',
        data: {
            loadMainBanner: false,
            adminPage: true
        },
        requiresAuth: true
    }).state('editOrder', {
        url: '/zamowienia/:id',
        templateUrl: 'views/editOrder.html',
        controller: 'EditOrderCtrl',
        data: {
            loadMainBanner: false,
            adminPage: true
        },
        requiresAuth: true
    }).state('config', {
        url: '/konfiguracja',
        templateUrl: 'views/config.html',
        controller: 'ConfigCtrl',
        data: {
            loadMainBanner: false,
            adminPage: true
        },
        requiresAuth: true
    }).state('login', {
        url: '/logowanie',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        data: {
            loadMainBanner: false,
            adminPage: false,
            removeFooter: true
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
[ '$rootScope', '$state', '$stateParams', '$location', 'AuthService',
    function ($rootScope, $state, $stateParams, $location, AuthService) {
    $rootScope.$on('$stateChangeStart', function (event,next) {
        $rootScope.authorized = AuthService.isAuthenticated();
        if (!AuthService.isAuthenticated()) {
            if (next && next.requiresAuth) {
                event.preventDefault();
                $state.go('login');
            }
        }
    });

    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}])
.controller('AppCtrl', ['$scope', '$state', 'AuthService', 'AUTH_EVENTS',
    function($scope, $state, AuthService, AUTH_EVENTS) {
    $scope.$on(AUTH_EVENTS.notAuthenticated, function() {
        AuthService.logout();
        $state.go('login');
        alert('Session Lost!');
    });
}]);
