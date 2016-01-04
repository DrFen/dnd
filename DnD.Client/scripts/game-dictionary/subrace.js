app.controller('SubraceCtrl', function ($scope, $rootScope, $location, $uibModal, dataService) {
   
    var listUrl = 'Dictionary/SubraceList';
    var editUrl = 'Dictionary/SubraceEdit';
    var deletetUrl = 'Dictionary/SubraceDelete';
    var templateHtml = 'partials/game-dictionary/subrace-edit.html';

    var columnDefs = [{ field: 'Name', displayName: 'Наименование', width: 300 },
                      { field: 'RaceName', displayName: 'Раса', visible: false },
                      { field: 'RaceId', displayName:'RaceId', visible: false },
                      { field: 'Description', displayName: 'Описание' },
                      { field: 'Id', displayName: 'id', visible: false }];



    /*******************************/
    
    $scope.selectedItems = [];
    $scope.filterOptions = {
        filterText: ''
    };
    $scope.collapsed = true;

    $scope.test = function() { debugger; };

   
    $scope.gridOptions = {
        data: 'myData',
        columnDefs: columnDefs,
        selectedItems: $scope.selectedItems,
        enableCellEdit: true,
        multiSelect: false,
        //
        showGroupPanel: false,
        groups: ['RaceName'],
        //
        filterOptions: $scope.filterOptions,
        onRegisterApi: function (api) {
            $scope.gridApi = api;
        }
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
        $scope.reloadRaces();
        $scope.editModel = { Id: null, Name: '', Description: '', RaceId: null };
        $scope.modalInstance = $uibModal.open({
            animation: true,
            scope: $scope,
            templateUrl: templateHtml
        });
    };

    $scope.edit = function () {
        $scope.reloadRaces();
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

    $scope.editAllowed = function () {
        if (!editModel.Name || editModel.Name === '')
            return false;

        if (!editModel.RaceId)
            return false;
        
        return true;
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


    /*
     COMBOS
     */
    $scope.races = [];

    $scope.reloadRaces = function () {
        var promise = dataService.sendPost('Combo/Race', true);
        promise.then(function (val) {
            $scope.races = val;
        });
    };

    $scope.select2Config = {
       };

    $scope.reload();
    
});
