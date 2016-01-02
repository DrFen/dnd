app.controller('UserCtrl', function ($scope, $rootScope, $location, $uibModal, dataService) {

    $scope.myData = [];//dataService.sendPost('useraccess/TestApi', '31415');

    var columnDefs = [{ field: 'Login', displayName: 'Имя пользователя', width: 300 },
                      { field: 'Name', displayName: 'Имя', width: 300 },
                      { field: 'Id', displayName: 'id', width: 200 }];

    $scope.selectedItems = [];

    $scope.reload = function() {
        var promise = dataService.sendPost('useraccess/TestApi', '31415');
        promise.then(function (val) {
            $scope.myData = val;
        }, function (reason) {
            alert('Failed load');
        });
    };


    $scope.gridOptions = {
        data: 'myData',
        columnDefs: columnDefs,
        selectedItems: $scope.selectedItems,
        multiSelect: false
    };

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

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
            console.log('returned ' + selectedItem);
        }, function () {
            console.log('returned cancel');;
        });
    };

    $scope.lock = function() {
        console.log('Зобанено');
    };

    $scope.lockUser = function () {
        $rootScope.$broadcast('QuestionMessage', 'Вы действительно хотите заблокировать пользователя?', $scope.lock);
    };


});

app.controller('UserEditCtrl', function ($scope, $rootScope, $uibModalInstance, selectedItem) {

    $scope.selectedItem = selectedItem;
    
    $scope.ok = function () {
        if (!selectedItem.Password || selectedItem.Password === '') {
            $rootScope.$broadcast('ErrorMessage', 'Не допускается пустой пароль');
            return;
        };
        if ($scope.selectedItem.Password !== selectedItem.PasswordRepeat) {
            $rootScope.$broadcast('ErrorMessage', 'Пароли не совпадают');
            return;
        }
        $uibModalInstance.close($scope.selectedItem); //тут можно передать переменную
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});