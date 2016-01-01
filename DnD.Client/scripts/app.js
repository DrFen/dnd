
var app = angular.module('dndapp', ['ngRoute', 'ngGrid', 'ui.bootstrap']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      // Pages
      .when("/about", { templateUrl: "partials/about.html", controller: "PageStaticCtrl" })
      //users
      .when("/users", { templateUrl: "partials/user-control/user-list.html", controller: "UserCtrl" });

}]);

app.controller('ErrorCtrl', function ($scope) {
    $scope.$on('ErrorMessage', function (event, args) { alert(args)});
});
