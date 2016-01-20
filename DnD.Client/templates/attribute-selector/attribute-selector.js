app.directive('attributeSelector', function (dataService, $rootScope, $uibModal) {
    return {
        templateUrl: "/templates/attribute-selector/attribute-selector.html",
        scope: {
            attributeList: "=attributeList"
        },
        controller: function ($scope) {
            $scope.dimensionCount = 1;
            $scope.infinityDimension = true;

            $scope.gridData = [];
            $scope.selectedItems = [];
            $scope.treeData = {
                treeValues: [],
                selectedTreeNode: null
            };

            $scope.reload = function () {
                dataService.sendPost('Attribute/SelectList', $scope.treeData.selectedTreeNode).then(function (val) {
                    $scope.gridData = val;
                });
            };

            $scope.$watch('treeData.selectedTreeNode', function () { $scope.reload(); });

            $scope.gridOptions = {
                data: 'gridData',
                columnDefs: [{ field: 'Label', displayName: 'Наименование' },
                            { field: 'Id', displayName: 'id', visible: false }],
                selectedItems: $scope.selectedItems,
                enableCellEdit: false,
                multiSelect: false
            };

        },
        link: function (scope, element, attrs) {
            scope.setJsId = function () {
                for (var i = 0; i < scope.attributeList.length; i++) {
                    scope.attributeList[i].JsId = scope.attributeList[i].Id;
                };
            };

            scope.removeAttr = function (groupId, attrId) {
                if (!groupId || !attrId)
                    return;
                for (var i = 0; i < scope.attributeList.length; i++) {
                    if (scope.attributeList[i].JsId == groupId) {
                        for (var j = 0; j < scope.attributeList[i].Attributes.length; j++) {
                            if (scope.attributeList[i].Attributes[j].Id == attrId) {
                                scope.attributeList[i].Attributes.splice(j, 1);
                                return;
                            };
                        };
                    };
                };
            };

            scope.removeGroup = function (groupId) {
                if (!groupId)
                    return;
                for (var i = 0; i < scope.attributeList.length; i++) {
                    if (scope.attributeList[i].JsId == groupId) {
                        scope.attributeList.splice(i, 1);
                    };
                };
            };

            scope.addGroup = function () {
                var count = null;
                if (scope.infinityDimension) {
                    for (var i = 0; i < scope.attributeList.length; i++) {
                        if (scope.attributeList[i].Count == null) {
                            $rootScope.$broadcast('ErrorMessage', 'Уже есть группа постоянных атрибутов');
                            return;
                        };
                    };

                } else {
                    count = scope.dimensionCount;
                };

                scope.attributeList.push({
                    Id: null,
                    JsId: Math.floor(Math.random() * 100000000000000).toString(),
                    Count: count,
                    Attributes: []
                });

            };

            scope.addAttr = function (groupId) {
                if (!groupId)
                    return;

                scope.modal = $uibModal.open({
                    animation: true,
                    scope: scope,
                    templateUrl: 'templates/attribute-selector/attribute-select-grid.html',
                    size: 'lg'

                });
                scope.modal.result.then(function (selected) {
                    console.log(selected);
                    for (var i = 0; i < scope.attributeList.length; i++) {
                        if (scope.attributeList[i].JsId == groupId) {
                            scope.attributeList[i].Attributes.push(selected);
                            return;
                        };

                    };
                }, function () {
                    return;
                });

                scope.closeSelect = function() {
                    scope.modal.dismiss('cancel');
                }

                scope.applySelect = function () {
                    if (!scope.selectedItems)
                        scope.modal.dismiss('cancel');

                    scope.modal.close(scope.selectedItems[0]);
                }
                

            };

            scope.setJsId();

        }

    }

});