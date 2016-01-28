app.directive('mapSquare', function (dataService, $rootScope, $timeout) {
    return {
			templateUrl: '/templates/map-square/map-square.html',
			scope: {
				squares: "=squares"           
			},
        controller: function ($scope) {
			$scope.viewParams = {
				XCount : 25,
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
			
			
        },
        link: function (scope, element, attrs) {		

		
			scope.getSpriteParams = function(dimension){
				var height = document.getElementById("map-border").offsetHeight;
				var width = document.getElementById("map-border").offsetWidth ;
				
				var size =Math.min(height/scope.viewParams.YCount , width/scope.viewParams.XCount);
				
				if (dimension === 'w')
					return size / width * 100;
										
				return size / height * 100
			}
			
			scope.getWidth = function(){
			}

			scope.getSpriteStyle = function(sprite){
				return {
					"background-image":'url('+sprite.Background + ')',
					width : scope.getSpriteParams('w') + '%'
					
				};
			};
			scope.getObjectStyle = function(sprite, index){
				return {
					"background-image":'url('+sprite.Image + ')',
				};
			};
				
			scope.render = function(){
				console.log('render start');
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
				console.log('render stop');				
			};	
			
			scope.selectObject = function(sprite){
				scope.selectedX = sprite.X;
				scope.selectedY = sprite.Y;
				console.log('X=' + sprite.X +' Y=' + sprite.Y + ' viewX =' + sprite.viewX  +' viewY =' + sprite.viewY);
			}
			
						
			scope.render();
			
			/*window.onresize = function(event) {
				scope.$apply();
			};*/
        }
    }
});