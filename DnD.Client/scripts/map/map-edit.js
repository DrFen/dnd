app.controller('MapEditCtrl', function ($scope, $rootScope, $location, $routeParams, $uibModal, dataService) {
	$scope.Id = $routeParams.Id;
	$scope.CampaighnId = $routeParams.CampaighnId;
	$scope.addItem = {
				Width: 2,
				Height: 2,
				AuraColor : "rgba(255, 255, 0, 0.5)",
				Layer: 'Background',
				Image: 'sprites/item.jpg'
			};
			
	/*$scope.newRefill = function(){
		$scope.squareArray = {
			XCount: 30,
			YCount: 30,
			Layers: ['Person'],
			BackgroundLayer:[
				{Id: 1,XFrom: 0, YFrom :0 , Width: 15, Height : 15, Image: 'sprites/exampe_terraine.jpg'},
				{Id: 2,XFrom: 15, YFrom :0 ,Width: 15, Height : 15, Image: 'sprites/exampe_terraine2.jpg'},
				{Id: 3,XFrom: 0, YFrom :15 , Width: 15, Height : 15, Image: 'sprites/exampe_terraine3.jpg'},
				{Id: 4,XFrom: 15, YFrom :15 , Width: 15, Height : 15, Image: 'sprites/exampe_terraine4.jpg'}
				]		
		};
	}	*/
			
	$scope.refill = function () {
        $scope.squareArray = {
			XCount: 10,
			YCount: 10,
			Layers: ['Person'],
			BackgroundLayer:[],
			PersonLayer:[]
		};
        for (var y = 0; y < 10; y++) {
            var row = [];
            for (var x = 0; x < 10; x++) {
                if (Math.floor(Math.random() * 10) % 2 == 0) {
                    $scope.squareArray.BackgroundLayer.push({ Id: y * 100000 + x, Image: 'sprites/exampe_terraine3.jpg', XFrom: x, YFrom:y, Width :1, Height:1});
                }
                else {
                    $scope.squareArray.BackgroundLayer.push({ Id: y * 100000 + x, Image: 'sprites/exampe_terraine4.jpg', XFrom: x, YFrom:y, Width :1, Height:1});
                }
            }
        }
		$scope.squareArray.PersonLayer.push({ Id: y * 99900000 , Image: 'sprites/person.jpg', XFrom: 5, YFrom:5, Width :1, Height:1});
    };
	
	$scope.moveRight = function(){
		$scope.squareArray.PersonLayer[0].XFrom +=1;
		$scope.$broadcast('render');
	}

    $scope.refill();
	//$scope.newRefill();
});