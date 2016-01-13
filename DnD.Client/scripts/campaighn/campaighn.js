app.controller('CampaighnCtrl', function ($scope, $rootScope, $location, $uibModal, dataService) {



    var listUrl = 'Campaighn/List';
    var editUrl = 'Dictionary/RaceEdit';
    var deletetUrl = 'Dictionary/RaceDelete';
    var templateHtml = 'partials/campaighn/campaighn-edit.html';

    var columnDefs = [{ field: 'Name', displayName: 'Наименование', width: 300 },
                      { field: 'StartLevel', displayName: 'Начальный уровень' },
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

    $scope.$on('ngGridEventEndCellEdit', function (evt) {
        var promise = dataService.sendPost(editUrl, evt.targetScope.row.entity);
        promise.then(function (val) {
            $scope.reload();
        });
    });

    $scope.reload = function () {
        var promise = dataService.sendPost(listUrl, '');
        promise.then(function (val) {
            $scope.myData = val;
        });
    };

    $scope.add = function () {
        $scope.editModel = { Id: null, Name: '', Description: '' };
        $scope.modalInstance = $uibModal.open({
            animation: true,
            scope: $scope,
            templateUrl: templateHtml
        });
    };

    $scope.edit = function () {
        $scope.editModel = $scope.selectedItems[0];
        $scope.modalInstance = $uibModal.open({
            animation: true,
            scope: $scope,
            templateUrl: templateHtml
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
