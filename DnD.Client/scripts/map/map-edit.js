app.controller('MapEditCtrl', function ($scope, $rootScope, $location, $routeParams, $uibModal, dataService) {
	$scope.Id = $routeParams.Id;
	$scope.CampaighnId = $routeParams.CampaighnId;
	
	
	
	
	$scope.init = function(){
		$scope.viewParams = {
								CellSize: 30,
								XCount : 0,
								YCount: 0,			
								StartWithX: 0,
								StartWithY: 0
							};
			
		$scope.presetSelectConfig ={
				formatResult: $scope.formatPreset,
				formatSelection: $scope.formatPreset,
				allowClear:true
		}		

		$scope.envVariable = {
			ActiveLayer : 'Background',
			ActiveNewItemId: undefined,
			Layers : [
				{Id : 'Background', Name : 'Поверхность', Show: true},
				{Id : 'Furniture', Name : 'Предметы и обстановка', Show: true},
				{Id : 'Person', Name : 'Персонажи', Show: true}
			],
			layerExists : function(layerId){
				for(var i = 0; i < this.Layers.length; i++){
					if(this.Layers[i].Id === layerId)
						return true;
				}
				return false;
			},
			getActiveLayerIndex : function(){
				for(var i = 0; i < this.Layers.length; i++){
					if(this.Layers[i].Id === this.ActiveLayer)
						return i;
				}
			},
			fillSelectedMapItem : function(){		
				if(!this.SelectedMapItem){
					this.SelectedMapItem = {Id: undefined};
					return;
				}
				for(var i = 0; i < $scope.presetList.length; i++){
					if($scope.presetList[i].Id === this.SelectedMapItem.Id){
						for(property in $scope.presetList[i]){
							if(property === 'Id')
								continue;
							//if(SelectedMapItem.hasOwnProperty(property){
								this.SelectedMapItem[property] = $scope.presetList[i][property];
							//}								
						}						
						return;
					}
				};
				this.SelectedMapItem = {Id: undefined};
			}
			
		}
		
		
		$scope.presetList = [
			{Id: 'p1', PreviewImg: 'sprites/item.jpg',             Image: 'sprites/item.jpg',             Name: 'preset 1',   Width: 1, Height: 1, Rotation: 0, Parameters:[]},
			{Id: 'p2', PreviewImg: 'sprites/exampe_terraine.jpg',  Image: 'sprites/exampe_terraine.jpg' , Name: 'preset 1',   Width: 1, Height: 1, Rotation: 0, Parameters:[]},
			{Id: 'p3', PreviewImg: 'sprites/exampe_terraine2.jpg', Image: 'sprites/exampe_terraine2.jpg', Name: 'preset 2:1', Width: 2, Height: 1, Rotation: 0, Parameters:[]},
			{Id: 'p4', PreviewImg: 'sprites/exampe_terraine3.jpg', Image: 'sprites/exampe_terraine3.jpg', Name: 'preset 1:2', Width: 1, Height: 2, Rotation: 0, Parameters:[]},
			{Id: 'p5', PreviewImg: 'sprites/exampe_terraine4.jpg', Image: 'sprites/exampe_terraine4.jpg', Name: 'preset 2:2', Width: 2, Height: 2, Rotation: 0, Parameters:[]}
		];

			
		if(!$scope.Id){
			$scope.squareArray = {
				XCount: 10,
				YCount: 10,
				Layers: [],
				BackgroundLayer:[],
				FurnitureLayer:[],
				PersonLayer:[],
				AnimationLayer : []
			};

		};
			
		
		
		$scope.ChangeSizeParam = {
			ChangeCount:1,
			ChangeXAxis: true,
			ChangeYAxis: true,
			Way : 'd'
		}		
		
	};
	
	$scope.changeSize = function(){
	
		if(!$scope.ChangeSizeParam)
			return;
			
		if(!$scope.ChangeSizeParam.Way || !$scope.ChangeSizeParam.ChangeCount)
			return;
			
		if(!($scope.ChangeSizeParam.Way ==='u' || $scope.ChangeSizeParam.Way ==='d'))
			return;
			
		if($scope.ChangeSizeParam.ChangeCount > 0){
			$scope.squareArray.XCount = $scope.squareArray.XCount + $scope.ChangeSizeParam.ChangeCount;
			$scope.squareArray.YCount = $scope.squareArray.YCount + $scope.ChangeSizeParam.ChangeCount;
			if($scope.ChangeSizeParam.Way ==='d'){
				
			}else{
			
			};
		} else{
			$scope.squareArray.XCount = Math.max($scope.squareArray.XCount + $scope.ChangeSizeParam.ChangeCount,0);
			$scope.squareArray.YCount = Math.max($scope.squareArray.YCount + $scope.ChangeSizeParam.ChangeCount,0);
			if($scope.ChangeSizeParam.Way ==='d'){
				
			}else{
			
			};
		};
			
	};
	
	
	$scope.formatPreset = function(data){
		for(var i=0; i<$scope.presetList.length; i++){
			if($scope.presetList[i].Id === data.id)
				return '<img style="width:15px; height:15px;" src="' + '../../'+$scope.presetList[i].PreviewImg+ '"/>&nbsp;&nbsp;' + data.text;
				
		}
		
	}
	
	$scope.addElement = function(){
		var newElement = {
				Width: 2,
				Height: 2,
				AuraColor : "rgba(255, 255, 0, 0.5)",
				Layer: $scope.envVariable.ActiveLayer,
				Image: 'sprites/item.jpg'
			};
		$scope.$broadcast('addElement', newElement)
	}
	
	$scope.addLayer = function(){
		var layerName = prompt("Введите имя слоя");		
		if(!layerName)
			return;
		layerName = layerName.trim();	
		var layerId = layerName.replace(new RegExp('[^a-zA-Z0-9а-яА-Я]', 'g'), '').toLowerCase();
		
		if(!layerId){
			$rootScope.$broadcast('ErrorMessage', 'Имя слоя должно включать цифры и буквы');
			return;
		}
		
		if($scope.envVariable.layerExists(layerId)){
			$rootScope.$broadcast('ErrorMessage', 'Существует слой с таким именем');
			return;
		}
		
		$scope.squareArray[layerId + 'Layer'] = [];
		$scope.envVariable.Layers.splice($scope.envVariable.getActiveLayerIndex() + 1, 0, {Id : layerId, Name : layerName, Show: true});


	}
	
	$scope.$watch('envVariable.Layers', function(){
			if(!$scope.envVariable.Layers[0].Show)
				$scope.envVariable.Layers[0].Show = true;
			$scope.squareArray.Layers = [];
			for(var i=0; i<$scope.envVariable.Layers.length; i++){
				if($scope.envVariable.Layers[i].Show && $scope.envVariable.Layers[i].Id !== 'Background')	
					$scope.squareArray.Layers.push($scope.envVariable.Layers[i].Id);
			};
	}, true);
		
	$scope.$watch('envVariable.SelectedMapItem.Id', function(){
		//debugger;
		$scope.envVariable.fillSelectedMapItem();
		console.log($scope.envVariable.SelectedMapItem);
	}, true);	
		
	$scope.onChangeVisibility = function(oldValue, layerId){
		if(oldValue && $scope.envVariable.ActiveLayer === layerId)
			$scope.envVariable.ActiveLayer = 'Background';
			
	};
	$scope.init();

});