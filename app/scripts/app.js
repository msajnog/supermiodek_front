'use strict';

angular.
    module('supermiodek', [
    'ngResource',
    'ui.router',
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider.state('/', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        }).state('shop', {
            url: '/shop',
            templateUrl: 'views/shop.html',
            controller: 'ShopCtrl'
        });

        $urlRouterProvider.otherwise("/");
        $locationProvider.hashPrefix('');
        // $locationProvider.html5Mode({
        //     enabled: true,
        //     requireBase: false
        // });
    }]);
