app.directive('mapSquare', function (dataService, $rootScope) {
    return {
			templateUrl: '/templates/map-square/map-square.html',
			scope: {
				squares: "=squares"           
			},
        controller: function ($scope) {
			
			$scope.viewParams = {
				SpriteSize : 30,
				XCount : 10,
				YCount: 10,
				StartWithX: 0,
				StartWithY: 0
			};
			
			$scope.renderView = [[]];
			
			if($scope.squares[0].length<$scope.viewParams.XCount)
				$scope.viewParams.XCount = $scope.squares[0].length;
				
			if($scope.squares.length<$scope.viewParams.YCount)
				$scope.viewParams.YCount = $scope.squares.length;		
			
			$scope.scroller = null;
			
			$scope.sliderY = {
				options: {
					min:0,
					max: $scope.squares.length - $scope.viewParams.YCount,
					orientation: 'vertical',
					stop: function (event, ui) { $scope.render(); $scope.$apply();}
					}
				};
			$scope.sliderX = {
				
				options: {
						min : 0,
						max : $scope.squares[0].length - $scope.viewParams.XCount,
						stop: function (event, ui) { $scope.render(); $scope.$apply();}
					}
				};	
			
			$scope.afterNextSelect = function(x,y){};
			
        },
        link: function (scope, element, attrs) {		

			scope.getSpriteStyle = function(sprite){
				return {
					"background-image":'url('+sprite.Background + ')',
					height : scope.viewParams.SpriteSize + 'px',
					width : scope.viewParams.SpriteSize + 'px',
					
				};
			};
			scope.getObjectStyle = function(sprite, index){
				return {
					"background-image":'url('+sprite.Image + ')',
					"z-index": index,					
					height : scope.viewParams.SpriteSize - 6 + 'px',
					width : scope.viewParams.SpriteSize - 6 + 'px',
					margin: '2px'
				};
			};
				
			scope.render = function(){
				scope.renderView = [];	

				for(var y = 0; y < scope.viewParams.YCount; y++){
					scope.renderView.push([]);				}
				
				for(var y = scope.viewParams.YCount - 1; y >=0; y--){	
					for(var x=0; x<scope.viewParams.XCount; x++){ 
							var addedElem = scope.squares[scope.viewParams.StartWithY + scope.viewParams.YCount-y-1][scope.viewParams.StartWithX + x];
							addedElem.viewX = x;
							addedElem.viewY = y;
							scope.renderView[y].push(addedElem);
						};					
				}			
			};	
			
			scope.selectObject = function(sprite){
				scope.selectedX = sprite.X;
				scope.selectedY = sprite.Y;
				console.log('X=' + sprite.X +' Y=' + sprite.Y + ' viewX =' + sprite.viewX  +' viewY =' + sprite.viewY);
				scope.afterNextSelect(sprite.X, sprite.Y);
				scope.afterNextSelect = function(x,y){};
			}
			
			/*Interface*/	
			scope.$on('deleteObjects',function(event, data){
				if(scope.selectedX ===undefined || scope.selectedY===undefined)
					return;
				scope.squares[scope.selectedY][scope.selectedX].PlacementObjects = [];
            });	
			
			scope.$on('moveObjects',function(event, data){
				if(scope.selectedX ===undefined || scope.selectedY===undefined)
					return;
				
				scope.nextSelectionArgs = {	
					X: scope.selectedX,
					Y: scope.selectedY
				};
				scope.afterNextSelect = function(x, y){
					scope.squares[y][x].PlacementObjects = scope.squares[scope.nextSelectionArgs.Y][scope.nextSelectionArgs.X].PlacementObjects;
					scope.squares[scope.nextSelectionArgs.Y][scope.nextSelectionArgs.X].PlacementObjects = [];
					scope.nextSelectionArgs = {};
				};
            });
			
			scope.render();
        }
    }
});