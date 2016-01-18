'use strict';
app.controller('MainCtrl', function($scope, $location) {
    $scope.checkedMenuItem = null;

    $scope.menuItems = [
        {
            Name: 'Адмнистрирование',
            Id: '1',
            RootId: null,
            Action: null
        }, {
            Name: 'Справочники d&d',
            Id: '2',
            RootId: null,
            Action: null
        },
         {
             Name: 'Мастерская',
             Id: '3',
             RootId: null,
             Action: null
         },
        {
            Name: 'Пользователи',
            Id: '1.1',
            RootId: '1',
            Action: 'users'
        },
        {
            Name: 'Расы',
            Id: '2.1',
            RootId: '2',
            Action: null
        }
        ,
        {
            Name: 'Предметы',
            Id: '2.2',
            RootId: '2',
            Action: null
        }
        ,
        {
            Name: 'Атрибуты',
            Id: '2.3',
            RootId: '2',
            Action: 'attributes'
        },
        {
            Name: 'Расы',
            Id: '2.1.1',
            RootId: '2.1',
            Action: 'race'
        }
        ,
        {
            Name: 'Расы-варианты',
            Id: '2.1.2',
            RootId: '2.1',
            Action: 'subrace'
        },
        {
            Name: 'Виды предметов',
            Id: '2.2.1',
            RootId: '2.2',
            Action: 'item-type'
        }
        ,
        {
            Name: 'Кампании',
            Id: '3.1',
            RootId: '3',
            Action: 'campaighn'
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