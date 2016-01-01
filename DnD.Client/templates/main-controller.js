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
            Name: 'пункт 2',
            Id: 2,
            RootId: null,
            Action: null
        },
        {
            Name: 'пункт 3',
            Id: 3,
            RootId: null,
            Action: null
        },
        {
            Name: 'пункт 1.3.1',
            Id: 131,
            RootId: 13,
            Action: 'about'
        }, {
            Name: 'пункт 1.3.2',
            Id: 132,
            RootId: 13,
            Action: 'about'
        },
        {
            Name: 'Пользователи',
            Id: 11,
            RootId: 1,
            Action: 'users'
        },
        {
            Name: 'пункт 1.2',
            Id: 12,
            RootId: 1,
            Action: 'about'
        },
        {
            Name: 'пункт 1.3',
            Id: 13,
            RootId: 1,
            Action: null
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