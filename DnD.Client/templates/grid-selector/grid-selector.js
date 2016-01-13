app.directive('gridSelector', function (dataService) {
    return {
        templateUrl: '/templates/grid-selector/grid-selector.html',
        scope: {
            fullListApi: "@fullListApi",
            selectedItems: "=selectedList",
            fullListParam: "=fullListParam"
           
        },
        controller: function ($scope) {
            $scope.columnDefs = [
                { field: 'Name', displayName: 'Наименование', width: 195 },
                { field: 'Id', displayName: 'id', visible: false }
            ];

            $scope.fullList = [];
            $scope.selectedFullItems = [];
            $scope.fullListGridOptions = {
                    data: 'fullList',
                    columnDefs: $scope.columnDefs,
                    selectedItems: $scope.selectedFullItems,
                    multiSelect: false
            }

            $scope.workList = [];
            $scope.selectedWorkItems = [];
            $scope.workListGridOptions = {
                data: 'workList',
                columnDefs: $scope.columnDefs,
                selectedItems: $scope.selectedWorkItems,
                multiSelect: false
            }

        },
        link: function (scope, element, attrs) {
            scope.existsInArray = function (searchValue, searchArray) {
                if (!searchArray)
                    searchArray = [];
                for (var i = 0; i < searchArray.length; i++) {
                    if (searchValue.Id == searchArray[i].Id)
                        return true;
                }
                return false;
            }

            scope.reload = function () {
                var promise = dataService.sendPost(scope.fullListApi, scope.fullListParam);
                promise.then(function (val) {
                    scope.fullList = [];
                    scope.workList = [];
                    for (var i = 0; i < val.length; i++) {
                        if (scope.existsInArray(val[i], scope.selectedItems))
                            scope.workList.push(val[i]);
                        else
                            scope.fullList.push(val[i]);
                    }
                });
            };

            scope.sendToWork = function() {
                if (!scope.selectedFullItems)
                    return;
                for (var i = 0; i < scope.fullList.length; i++) {
                    if (scope.fullList[i].Id == scope.selectedFullItems[0].Id) {
                        scope.workList.push(scope.fullList[i]);
                        scope.fullList.splice(i, 1);
                        return;
                    }
                }
            };

            scope.sendAllToWork = function () {
                if (!scope.selectedFullItems)
                    return;
                for (var i = 0; i < scope.fullList.length; i++) {
                        scope.workList.push(scope.fullList[i]);
                };
                scope.fullList = [];
            };

            scope.sendFromWork = function () {
                if (!scope.selectedFullItems)
                    return;
                for (var i = 0; i < scope.workList.length; i++) {
                    if (scope.workList[i].Id == scope.selectedWorkItems[0].Id) {
                        scope.fullList.push(scope.workList[i]);
                        scope.workList.splice(i, 1);
                        return;
                    }
                }
            };

            scope.sendAllFromWork = function () {
                if (!scope.selectedFullItems)
                    return;
                for (var i = 0; i < scope.workList.length; i++) {
                    scope.fullList.push(scope.workList[i]);
                };
                scope.workList = [];
            };
            scope.reload();

        }

    }

});