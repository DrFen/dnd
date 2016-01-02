app.controller('RaceCtrl', function ($scope, $rootScope, $location, $uibModal, dataService) {
    var listUrl = 'Dictionary/RaceList';
    $scope.selectedItems = [];

    var columnDefs = [{ field: 'Name', displayName: 'Наименование', width: 300 },
                      { field: 'Id', displayName: 'id', visible:false}];

   
    $scope.gridOptions = {
        data: 'myData',
        columnDefs: columnDefs,
        selectedItems: $scope.selectedItems,
        multiSelect: false
    };

    $scope.reload = function () {
        var promise = dataService.sendPost(listUrl, '');
        promise.then(function (val) {
            $scope.myData = val;
        });
    };



    $scope.reload();

});
