app.controller('UserCtrl', function ($scope, $rootScope, $location, $uibModal, dataService) {


    var columnDefs = [{ field: 'Login', displayName: 'Имя пользователя', width: 300 },
                      { field: 'Name', displayName: 'Имя', width: 300 },
                      { field: 'Id', displayName: 'id', width: 200 }];

    $scope.selectedItems = [];

    $scope.reload = function () {
        var promise = dataService.sendPost('UserAccess/UserList', '');
        promise.then(function (val) {
            $scope.myData = val;
        }, function (reason) {
            //alert('Failed load');
        });
    };


    $scope.gridOptions = {
        data: 'myData',
        columnDefs: columnDefs,
        selectedItems: $scope.selectedItems,
        multiSelect: false
    };

    $scope.reload();

    /*EDIT*/



    $scope.openEdit = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'userModalContent.html',
            controller: 'UserEditCtrl',
            resolve: {
                selectedItem: function () {
                    return $scope.selectedItems[0];
                }
            }
        });

        modalInstance.result.then(function (id) {
            $scope.reload();
            console.log('returned ' + id);
        }, function () {
            console.log('returned cancel');;
        });
    };

    $scope.lock = function () {
        console.log('Зобанено');
    };

    $scope.lockUser = function () {
        $rootScope.$broadcast('QuestionMessage', 'Вы действительно хотите заблокировать пользователя?', $scope.lock);
    };


});

app.controller('UserEditCtrl', function ($scope, $rootScope, dataService, $uibModalInstance, selectedItem) {

    if (selectedItem) {
        $scope.login = selectedItem.login;
    } else {
        $scope.login = '';
    }
    $scope.password = null;
    $scope.passwordRepeat = null;;

    $scope.ok = function () {
        if (!$scope.password || $scope.password === '') {
            $rootScope.$broadcast('ErrorMessage', 'Не допускается пустой пароль');
            return;
        };
        if ($scope.password !== $scope.passwordRepeat) {
            $rootScope.$broadcast('ErrorMessage', 'Пароли не совпадают');
            return;
        }

        var promise = dataService.sendPost('UserAccess/AddUser', {
            Login: $scope.login,
            Password: $scope.password
        });
        promise.then(function (val) {
            console.log('Added user id=' + val);
            $uibModalInstance.close(val);
        });

         
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});