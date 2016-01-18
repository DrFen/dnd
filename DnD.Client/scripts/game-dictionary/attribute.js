app.controller('AttributeCtrl', function ($scope, $rootScope, $location, $uibModal, dataService) {

    var listUrl = 'Attribute/List';
    var editUrl = 'Attribute/UpdateAttribute';
    var deletetUrl = 'Dictionary/ItemTypeDelete';
    var templateHtml = 'partials/game-dictionary/attribute/attribute-edit.html';

    $scope.treeData = {
        treeValues: [],
        selectedTreeNode: null
    };
    $scope.selectedItems = [];

    var columnDefs = [{ field: 'Name', displayName: 'Наименование'},
                      { field: 'Id', displayName: 'id', visible: false }];

    $scope.gridOptions = {
        data: 'gridData',
        columnDefs: columnDefs,
        selectedItems: $scope.selectedItems,
        enableCellEdit: true,
        multiSelect: false
    };


    $scope.$watch('treeData.selectedTreeNode', function() { $scope.reload(); });



    $scope.reload = function () {
        dataService.sendPost(listUrl, $scope.treeData.selectedTreeNode).then(function (val) {
            $scope.gridData = val;
        });
    };

    $scope.add = function() {
        $scope.editModel = {
            Id: null,
            Name: '',
            Abbreviation: '',
            AttributeTypeId: $scope.treeData.selectedTreeNode,
            AttributeFunction: "00000000-0000-0000-0000-000000000001"
        };
        dataService.sendPost('Combo/AttributeType').then(function(val) {
            $scope.attributeTypes = val;
            dataService.sendPost('Combo/AttributeFunction').then(function(val) {
                $scope.attributeFunctions = val;

                $scope.modalInstance = $uibModal.open({
                    animation: true,
                    scope: $scope,
                    templateUrl: templateHtml
                });
            });
        });
    };

    $scope.edit = function () {
        if (!$scope.selectedItems)
            return;
        if ($scope.selectedItems.length !== 1)
            return;
        dataService.sendPost('Attribute/EditModel', $scope.selectedItems[0].Id).then(function (val) {
            $scope.editModel = val;
            dataService.sendPost('Combo/AttributeType').then(function(val) {
                $scope.attributeTypes = val;
                dataService.sendPost('Combo/AttributeFunction').then(function(val) {
                    $scope.attributeFunctions = val;

                    $scope.modalInstance = $uibModal.open({
                        animation: true,
                        scope: $scope,
                        templateUrl: templateHtml
                    });
                });
            });
        });
    };

    $scope.saveEdit = function () {
        dataService.sendPost(editUrl, $scope.editModel).then(function (val) {
            $scope.reload();
            $scope.modalInstance.dismiss();
        });
    };


});
