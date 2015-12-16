'use strict';

angular
  .module('misha', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .controller('MainCtrl', ['$scope', '$resource', function ($scope, $resource) {

    var api = 'http://localhost:1337';

    var User = $resource(api + '/user/:userId', {userId:'@id'});
    var Pending = $resource(api + '/pending/:userId', {userId:'@id'});

    chrome.storage.local.get('me', function(res) {
      $scope.me = res.me;
    });

    $scope.notifyMe = function(userId) {
      var notify = new Pending({
        user_id: '567151fe7d2baa1d49c0dcfa',
        waiting_for: '567151fe7d2baa1d49c0dcf9',
        message: 'is now available!'
      });
      notify.$save();
    };

    $scope.sendMessage = function(userId, message) {
      var notify = new Pending({
        user_id: $scope.me.id,
        waiting_for: userId,
        message: message
      });
      notify.$save();
    }

  }]);