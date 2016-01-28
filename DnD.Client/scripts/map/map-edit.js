app.controller('MapEditCtrl', function ($scope, $rootScope, $location, $routeParams, $uibModal, dataService) {
	$scope.Id = $routeParams.Id;
	$scope.CampaighnId = $routeParams.CampaighnId;
	
	$scope.refill = function () {
        $scope.squareArray = [];
        for (var y = 0; y < 200; y++) {
            var row = [];
            for (var x = 0; x < 200; x++) {
                var placementObjects = [];
                if (Math.floor(Math.random() * 10) % 2 == 0) {
                    placementObjects.push({
                        Id: Math.floor(Math.random() * 100000),
                        Image: 'sprites/exampe_terraine.jpg',
                        Selected: false
                    });
                    //console.log('y=' + i + ' x=' + j);
                }
                if (Math.floor(Math.random() * 10) % 2 == 0) {
                    row.push({ Id: y * 100000 + x, Background: 'sprites/exampe_terraine3.jpg', Y: y, X: x, PlacementObjects: placementObjects });
                }
                else {
                    row.push({ Id: y * 100000 + x, Background: 'sprites/exampe_terraine4.jpg', Y: y, X: x, PlacementObjects: placementObjects });
                }
            }

            $scope.squareArray.push(row);
        }
    };

    $scope.refill();
});