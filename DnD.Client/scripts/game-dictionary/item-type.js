app.controller('ItemTypeCtrl', function ($scope, $rootScope, $location, $uibModal, dataService) {
    
    var listUrl = 'Dictionary/ItemTypeList';
    var editUrl = 'Dictionary/ItemTypeEdit';
    var deletetUrl = 'Dictionary/ItemTypeDelete';
    var templateHtml = 'partials/game-dictionary/item-type-edit.html';

    $scope.reload = function () {
        var promise = dataService.sendPost(listUrl, '');
        promise.then(function (val) {
            $scope.gridData = val;
        });
    };

    $scope.rowClick = function (node) {
        $scope.editModel = node;
    };

    $scope.edit = function () {
        var promise = dataService.sendPost('Combo/ItemType', true);
        promise.then(function (val) {
            $scope.itemTypes = val;
            $scope.modalInstance = $uibModal.open({
                animation: true,
                scope: $scope,
                templateUrl: templateHtml
            });
        });
    };
    
    $scope.closeEdit = function () {
        $scope.modalInstance.dismiss();
    };

    $scope.saveEdit = function () {
        var promise = dataService.sendPost(editUrl, $scope.editModel);
        promise.then(function (val) {
            $scope.reload();
            $scope.modalInstance.dismiss();
        });
    };


    $scope.add = function () {
        var promise = dataService.sendPost('Combo/ItemType', true);
        promise.then(function(val) {
            $scope.itemTypes = val;
            $scope.editModel = {
                Id: null,
                Name: '',
                Description: '',
                Plural: '',
                RootId: $scope.editModel.Id
            };
            $scope.modalInstance = $uibModal.open({
                animation: true,
                scope: $scope,
                templateUrl: templateHtml
            });
        });
    };

    $scope.delete = function () {
        if (!$scope.editModel)
            return;

        $rootScope.$broadcast('QuestionMessage', 'Вы действительно хотите удалить?', function () {
            var promise = dataService.sendPost(deletetUrl, $scope.editModel.Id);
            promise.then(function (val) {
                $scope.reload();
            });
        });
    };

    $scope.reload();
});
