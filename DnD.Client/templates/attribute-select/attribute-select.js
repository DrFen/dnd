app.directive('attributeSelect', function (dataService) {
    return {
        templateUrl: '/templates/attribute-select/attribute-select.html',
        scope: {
            selectedListItems: "=selectedListItems"
        },
        controller: function ($scope) {
            $scope.treeData = {
                treeValues: [],
                selectedTreeNode: null,
                selected :[]
            };

           $scope.columnDefs = [
                { field: 'Name', displayName: 'Наименование', width: 195 },
                { field: 'Id', displayName: 'id', visible: false }
            ];

            $scope.gridData = [];
            $scope.gridOptions = {
                data: 'gridData',
                columnDefs: $scope.columnDefs,
                selectedItems: $scope.selectedListItems,
                multiSelect: false
            }


        },
        link: function (scope, element, attrs) {
            scope.$watch('treeData.selectedTreeNode', function () { scope.reload(); });
            scope.test = function() { debugger; };

            scope.reload = function () {
                dataService.sendPost('Attribute/List', scope.treeData.selectedTreeNode).then(function (val) {
                    scope.gridData = val;
                });
            };

          
            scope.reload();

        }

    }

});