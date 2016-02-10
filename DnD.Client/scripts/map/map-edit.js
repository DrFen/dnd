app.controller('MapEditCtrl', function ($scope, $rootScope, $location, $routeParams, $uibModal, dataService) {
	$scope.Id = $routeParams.Id;
	$scope.CampaighnId = $routeParams.CampaighnId;
	
	$scope.viewParams = {
				CellSize: 30,
				XCount : 0,
				YCount: 0,			
				StartWithX: 0,
				StartWithY: 0
			};	
			
	$scope.addItem = {
				Width: 2,
				Height: 2,
				AuraColor : "rgba(255, 255, 0, 0.5)",
				Layer: 'Person',
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
			XCount: 100,
			YCount: 100,
			Layers: ['Person'],
			BackgroundLayer:[],
			PersonLayer:[],
			AnimationLayer : []
		};
        for (var y = 0; y < $scope.squareArray.YCount; y++) {
            var row = [];
            for (var x = 0; x < $scope.squareArray.XCount; x++) {
                if (Math.floor(Math.random() * 10) % 2 == 0) {
                    $scope.squareArray.BackgroundLayer.push({ Id: y * 100000 + x, Image: 'sprites/exampe_terraine3.jpg', XFrom: x, YFrom:y, Width :1, Height:1});
                }
                else {
                    $scope.squareArray.BackgroundLayer.push({ Id: y * 100000 + x, Image: 'sprites/exampe_terraine4.jpg', XFrom: x, YFrom:y, Width :1, Height:1});
                }
            }
        }
		$scope.squareArray.PersonLayer.push({ Id: y * 99900000 , Image: 'sprites/person.jpg', XFrom: 510, YFrom:505, Width :1, Height:1});
    };
	
	$scope.moveRight = function(){
		$scope.squareArray.PersonLayer[0].XFrom +=1;
		$scope.$broadcast('render');
	}

	$scope.scroll = function(offsetX, offsetY){
		$scope.viewParams.StartWithX +=offsetX;
		$scope.viewParams.StartWithY +=offsetY;
	}
	
	$scope.animationTest = function(){
		var animation = {
			Id: 'an1',
			XFrom : 2,
			YFrom: 1,
			XTo : 5,
			YTo: 5,
			Speed: 0.1,
			Image : 'sprites/arrow.png'
		};
		
		$scope.$broadcast('addMotionAnimation', animation);
	}
	
    $scope.refill();
	//$scope.newRefill();
});