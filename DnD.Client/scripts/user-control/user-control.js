app.controller('UserCtrl', function ($scope, $location, $uibModal) {

    $scope.myData = [{ Login: "Moroni", CharCount: 50 },
                     { Login: "Tiancum", CharCount: 43 },
                     { Login: "Jacob", CharCount: 27 },
                     { Login: "Nephi", CharCount: 29 },
                     { Login: "Enos", CharCount: 34 }];



    var columnDefs = [{ field: 'Login', displayName: 'Имя пользователя', width: 300 },
                      { field: 'CharCount', displayName: 'Количество персонажей', width: 200 }];

    $scope.selectedItems = [];



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