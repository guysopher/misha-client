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
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/', {
        controller:   'ListCtrl',
        controllerAs: 'list',
        templateUrl:  'views/list.html',
      }).otherwise({
        redirectTo: '/'
      });
  })

  .controller('MainCtrl', ['$scope', '$resource', function ($scope, $resource) {

  }])

  .controller('ListCtrl', ['$scope', '$resource', function ($scope, $resource) {
    var api = 'http://localhost:1337';

    var User = $resource(api + '/user/:userId', { userId: '@id' });
    var Pending = $resource(api + '/pending/:userId', { userId: '@id' });

    $scope.username = "YOU!"

    chrome.storage.local.get('me', function(res) {
      if(res.me && res.me.name) {
        $scope.username = res.me.name.split(' ')[0].toUpperCase();
      }
    });

    $scope.users = [];

    User.query({limit:2000})
     .$promise.then(function(data) {
       $scope.users = data;
     });

    $scope.notifyMe = function(userId) {
      var notify = new Pending({
        user_id: $scope.me.id,
        waiting_for: userId,
        message: 'is now available!'
      });
      notify.$save();
    };

    $scope.sendMessage = function(userId, message) {
      var notify = new Pending({
        user_id: userId,
        waiting_for: $scope.me.id,
        message: message
      });
      notify.$save();
    }

  }]);