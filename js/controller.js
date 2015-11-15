var apartmentSocial = angular.module('apartmentSocial', ['ngRoute','facebook', 'ngCookies'])

apartmentSocial.controller('mainCtrl', ['$scope','$http', 'Facebook','$rootScope', '$cookies', '$location' , function($scope,$http,Facebook,$rootScope, $cookies, $location){
  $scope.logout = function() {
    Facebook.logout(function() {
      $scope.$apply(function() {
        $rootScope.user   = {};
        $cookies.remove('user')
        $scope.logged = false;  
      });
    });
  }

  console.log($cookies.getAll())
  $scope.toAbout = function(){
    $location.url('/about')

  }


}])
.controller('homeCtrl', ['$scope', '$http', function($scope, $http){

}])

.controller('aboutCtrl', ['$scope', function($scope){

}])
.controller('signupCtrl', ['$scope','Facebook', '$rootScope', '$location','$cookies', function($scope,Facebook,$rootScope,$location,$cookies){

  $scope.logged = false;
  $scope.$watch(
    function() {
      return Facebook.isReady();
    },
    function(newVal) {
      if (newVal)
        $scope.facebookReady = true;
    }
  );
  var userIsConnected = false; 
  Facebook.getLoginStatus(function(response) {
    if (response.status == 'connected') {
      userIsConnected = true;
    }
  });
  $scope.IntentLogin = function() {
    if(!userIsConnected) {
      $scope.login();
    }
  };
  $scope.login = function() {
    Facebook.login(function(response) {
      if (response.status == 'connected') {
        $scope.logged = true;
        $scope.me();
      }
    });
  };

  $scope.me = function() {
    Facebook.api('/me', function(response) {
      $rootScope.user = response
      $location.url('/signup/' + $rootScope.user.id)
      $cookies.put('user', response.name)

      $scope.$apply(function() {
        $rootScope.user = response;
      });
    });
  };
}])

.controller('loginCtrl', ['$scope', function($scope){

}])

.controller('aptInfoCtrl', ['$rootScope','$scope', function($rootScope,$scope){


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
    .when('/signup/:id',{
      templateUrl: '/partials/aptInfo.html',
      controller: 'aptInfoCtrl'
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
