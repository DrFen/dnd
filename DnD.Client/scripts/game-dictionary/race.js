app.controller('RaceCtrl', function ($scope, $rootScope, $location, $uibModal, dataService) {



    var listUrl = 'Dictionary/RaceList';
    var detailtUrl = 'Dictionary/RaceDetail';
    var editUrl = 'Dictionary/RaceEdit';
    var deletetUrl = 'Dictionary/RaceDelete';
    var templateHtml = 'partials/game-dictionary/race-edit.html';
    $scope.selectedBonus = {};
    var columnDefs = [{ field: 'Name', displayName: 'Наименование', width: 300 },
                      { field: 'Description', displayName: 'Описание' },
                      { field: 'Id', displayName: 'id', visible: false }];


    $scope.selectedItems = [];
    $scope.filterOptions = {
        filterText: ''
    };


    $scope.gridOptions = {
        data: 'myData',
        columnDefs: columnDefs,
        selectedItems: $scope.selectedItems,
        enableCellEdit: false,
        multiSelect: false,
        filterOptions: $scope.filterOptions
    };


    $scope.reload = function () {
        var promise = dataService.sendPost(listUrl, '');
        promise.then(function (val) {
            $scope.myData = val;
        });
    };

    $scope.add = function () {
        $scope.editModel = { Id: null, Name: '', Description: '' };
        $scope.editModel.Attributes = [];
        $scope.modalInstance = $uibModal.open({
            animation: true,
            scope: $scope,
            templateUrl: templateHtml,
            size: 'lg'

        });
    };

    $scope.edit = function () {
        if (!$scope.selectedItems)
            return;

        dataService.sendPost(detailtUrl, $scope.selectedItems[0].Id).then(function (val) {
            $scope.editModel = val;

            $scope.modalInstance = $uibModal.open({
                animation: true,
                scope: $scope,
                templateUrl: templateHtml,
                size: 'lg'
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

    $scope.delete = function () {
        if (!$scope.selectedItems)
            return;

        if ($scope.selectedItems.length === 0)
            return;
        $rootScope.$broadcast('QuestionMessage', 'Вы действительно хотите удалить?', function () {
            var promise = dataService.sendPost(deletetUrl, $scope.selectedItems[0].Id);
            promise.then(function (val) {
                $scope.reload();
            });
        });
    };


    $scope.reload();

});
