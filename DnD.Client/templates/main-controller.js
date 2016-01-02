'use strict';
app.controller('MainCtrl', function($scope, $location) {
    console.log('Я работаю!');
    $scope.checkedMenuItem = null;

    $scope.menuItems = [
        {
            Name: 'Адмнистрирование',
            Id: 1,
            RootId: null,
            Action: null
        }, {
            Name: 'Справочники d&d',
            Id: 2,
            RootId: null,
            Action: null
        },
        {
            Name: 'Пользователи',
            Id: 11,
            RootId: 1,
            Action: 'users'
        },
        {
            Name: 'Расы',
            Id: 21,
            RootId: 2,
            Action: 'race'
        },
        {
            Name: 'Классы',
            Id: 22,
            RootId: 2,
            Action: 'classes'
        }
    ];

    $scope.showedItems = [];

    $scope.getItems = function () {
       //debugger;
        $scope.showedItems = [];
        if ($scope.checkedMenuItem != null) {
           // debugger;
            var currentItem = $scope.getItemById($scope.checkedMenuItem);
            if (currentItem.RootId == null) {
                $scope.showedItems.push({
                    Name: 'В начало',
                    Id: null,
                    RootId: null,
                    Action: null
                });
            } else {
                var previousItem = $scope.getItemById(currentItem.RootId);
                $scope.showedItems.push({
                    Name: 'Назад к ' + previousItem.Name ,
                    Id: previousItem.Id,
                    RootId: null,
                    Action: null
                });
            };
        };

        for (var i = 0; i < $scope.menuItems.length; i++) {
            if ($scope.menuItems[i].RootId === $scope.checkedMenuItem)
                $scope.showedItems.push($scope.menuItems[i]);
        }

    };

    $scope.selectMenuItem = function (id) {
        //debugger;
        var selectedItem = $scope.getItemById(id);
        if (selectedItem != null) {
            if (selectedItem.Action != null) {
                $location.path(selectedItem.Action);
                return;
            }
        }
        $scope.checkedMenuItem = id;
        $scope.getItems();
    };

    $scope.getItemById = function(id) {
        for (var i = 0; i < $scope.menuItems.length; i++) {
            if ($scope.menuItems[i].Id === id)
                return $scope.menuItems[i];
        }
        return null;
    };


    $scope.getItems();

});