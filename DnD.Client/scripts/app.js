
var app = angular.module('dndapp', ['ngRoute', 'ngGrid', 'ui.bootstrap', 'ngSanitize'/*, 'ui.tree', 'ui.select2', 'ui.slider'*/]);

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

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      // Pages
      .when("/about", { templateUrl: "partials/about.html", controller: "PageStaticCtrl" })
      //users
      .when("/users", { templateUrl: "partials/user-control/user-list.html", controller: "UserCtrl" })
      //Main dictionaries
      .when("/race", { templateUrl: "partials/simple-dictionary.html", controller: "RaceCtrl" })
      .when("/attributes", { templateUrl: "partials/game-dictionary/attribute/attribute-list.html", controller: "AttributeCtrl" })
      .when("/subrace", { templateUrl: "partials/simple-dictionary.html", controller: "SubraceCtrl" })
      .when("/item-type", { templateUrl: "partials/game-dictionary/item-type-list.html", controller: "ItemTypeCtrl" })
        //campaighn
      .when("/chat", { templateUrl: "partials/about.html", controller: "PageStaticCtrl" })
	  .when("/map-edit/:CampaighnId/:Id/", { templateUrl: "partials/map/map-edit.html", controller: "MapEditCtrl" })
    ;
}]);
app.factory('dataService', ['$http', '$rootScope', '$q', function ($http, $rootScope, $q) {
    var url = 'http://localhost:10869/api/';
    var dataFactory = {};


    dataFactory.sendPost = function (apiPath, value) {
        $http.defaults.headers.common['UserKey'] = app.getCookie('UserKey');

        return $q(function (resolve, reject) {
            $http.post(url + apiPath, { Value: value })
                .success(function (data, status, headers, config) {
                    

                    if (data.hasOwnProperty('Value')) {
                        if (data.ErrorCode !== 1) {
                            $rootScope.$broadcast("ErrorMessage", data.ErrorMessage + '. Код(' + data.ErrorCode + ')');
                            reject();
                            return;
                        };
                        resolve(data.Value);
                        return;
                    }

                    if (data.hasOwnProperty('MessageDetail')) {
                        $rootScope.$broadcast("ErrorMessage", data.MessageDetail);
                        reject();
                        return;
                    }


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

app.controller('MessageCtrl', function ($scope, $uibModal) {

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
        $scope.modalInstance = $uibModal.open({
            templateUrl: 'message.html',
            scope: $scope
        });
    });

    $scope.$on('QuestionMessage', function (event, questionMessage, functionSuccess) {
        $scope.message = questionMessage;
        $scope.functionSuccess = functionSuccess;
        $scope.windowType = 'question';
        $scope.modalInstance = $uibModal.open({
            templateUrl: 'message.html',
            scope: $scope
        });
    });


});

app.controller('LoginCtrl', function ($scope, $uibModal, dataService) {

    $scope.loginModel = {
        Login: 'login',
        Password: 'password'
    };

    $scope.loginUser = function () {
        var promise = dataService.sendPost('UserAccess/Login', $scope.loginModel);
        promise.then(function (val) {
            app.setCookie('UserKey', val);
        });

        $scope.modalInstance.dismiss();
    };

    $scope.$on('LoginMessage', function (event) {
        $scope.modalInstance = $uibModal.open({
            templateUrl: 'login.html',
            scope: $scope
        });
    });


});

