var apartmentSocial = angular.module('apartmentSocial', ['ngRoute','facebook'])

apartmentSocial.controller('mainCtrl', ['$scope','$http', function($scope,$http){
    $scope.works = 'IT SURE DOES'

  }])
.controller('homeCtrl', ['$scope', '$http', function($scope, $http){

}])

.controller('aboutCtrl', ['$scope', function($scope){

}])
.controller('signupCtrl', ['$scope','Facebook', function($scope, Facebook){



}])
.controller('loginCtrl', ['$scope', function($scope){

}])

  .config(function($routeProvider,$locationProvider){
    $routeProvider.when('/', {
      templateUrl: '/partials/home.html',
      controller: 'homeCtrl'
    })
    .when('/about', {
      templateUrl: '/partials/about.html',
      controller: 'aboutCtrl'
    })
    .when('/signup',{
      templateUrl: '/partials/signup.html',
      controller: 'signupCtrl'
    })
    .when('/login', {
      templateUrl: '/partials/login.html',
      controller: 'loginCtrl'
    })
    $locationProvider.html5Mode(true)
  })
  .config(function(FacebookProvider) {
     
    FacebookProvider.init('509368895893783');
  })
