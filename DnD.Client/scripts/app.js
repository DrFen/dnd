
var app = angular.module('dndapp', ['ngRoute', 'ngGrid', 'ui.bootstrap']);

app.setCookie = function (name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
};

app.getCookie = function (name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

app.userParams = {
    UserKey: app.getCookie('UserKey')
};

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      // Pages
      .when("/about", { templateUrl: "partials/about.html", controller: "PageStaticCtrl" })
      //users
      .when("/users", { templateUrl: "partials/user-control/user-list.html", controller: "UserCtrl" });

}]);
app.factory('dataService', ['$http', '$rootScope', '$q', function ($http, $rootScope, $q) {
    var url = 'http://localhost:10869/api/';
    var dataFactory = {};


    dataFactory.sendPost = function(apiPath, value) {
        $http.defaults.headers.common['UserKey'] = app.userParams.UserKey;

        return $q(function(resolve, reject) {
            $http.post(url + apiPath, value)
                .success(function(data, status, headers, config) {
                    resolve(data.Value);
                })
                .error(function (data, status, headers, config) {
                    if (status === 403) {
                        $rootScope.$broadcast("LoginMessage");
                    } else
                        $rootScope.$broadcast("ErrorMessage", 'Ошибка с кодом ' + status);
                    return reject();
                });
        });
    };
    return dataFactory;
}]);

app.controller('MessageCtrl', function ($scope, $modal) {

    $scope.modalInstance = null;
    $scope.functionSuccess = null;

    $scope.windowType = null;

    $scope.close = function () {
        $scope.modalInstance.dismiss();
    };

    $scope.ok = function () {
        if ($scope.functionSuccess)
            $scope.functionSuccess();
        $scope.modalInstance.dismiss();
    };

    $scope.dismiss = function () {
        $scope.modalInstance.dismiss();
    };

    $scope.$on('ErrorMessage', function (event, errorMessage) {
        $scope.message = errorMessage;
        $scope.windowType = 'error';
        $scope.modalInstance = $modal.open({
            templateUrl: 'message.html',
            scope: $scope
        });
    });

    $scope.$on('QuestionMessage', function (event, questionMessage, functionSuccess) {
        $scope.message = questionMessage;
        $scope.functionSuccess = functionSuccess;
        $scope.windowType = 'question';
        $scope.modalInstance = $modal.open({
            templateUrl: 'message.html',
            scope: $scope
        });
    });


});


app.controller('LoginCtrl', function ($scope, $modal) {


    $scope.loginUser = function () {
        var key = 'test';
        app.userParams.UserKey = key;
        app.setCookie('UserKey', key);
        $scope.modalInstance.clode();
    };

    $scope.$on('LoginMessage', function (event) {
        $scope.modalInstance = $modal.open({
            templateUrl: 'login.html',
            scope: $scope
        });
    });


});

