app.directive('mapSquare', function (dataService, $rootScope, $timeout) {
    return {
			templateUrl: '/templates/map-square/map-square.html',
			scope: {
				cells: "=squares"           
			},
        controller: function ($scope) {
			$scope.viewParams = {
				SpriteSize: 30,
				XCount : 0,
				YCount: 0,			
				StartWithX: 0,
				StartWithY: 0
			};		
			
			
        },
        link: function (scope, element, attrs) {		
			
			scope.init = function(){
				scope.canvas = document.getElementById("map-canvas");
				scope.canvasContext = scope.canvas.getContext("2d");
				
				scope.canvas.height = scope.canvas.offsetHeight;
				scope.canvas.width = scope.canvas.offsetWidth;
				
				scope.offset = 0.5;
				scope.imageKey = [];
				scope.imageValue = [];
				
				scope.viewParams.XCount = Math.min(((scope.canvas.offsetWidth )/ scope.viewParams.SpriteSize | 0), scope.cells[0].length);
				scope.viewParams.YCount = Math.min(((scope.canvas.offsetHeight) / scope.viewParams.SpriteSize | 0), scope.cells.length);
				
				scope.canvas.onclick = function(event){
					scope.selectCell(event);
				};
				
				console.log('init complete. XCount = ' + scope.viewParams.XCount + '; YCount = ' + scope.viewParams.YCount + ';')

				
			};
			
			scope.render = function(){
				scope.renderGrid();
				scope.renderBackground();
			}
			
			scope.renderGrid = function(){
			
				for(y=0; y <= scope.viewParams.SpriteSize * scope.viewParams.YCount; y+= scope.viewParams.SpriteSize){
					scope.canvasContext.moveTo(0, y + scope.offset);
					scope.canvasContext.lineTo(scope.viewParams.SpriteSize * scope.viewParams.XCount, y + scope.offset);
				}
				
				for(x=0; x <= scope.viewParams.SpriteSize * scope.viewParams.XCount; x+=scope.viewParams.SpriteSize){
					scope.canvasContext.moveTo(x + scope.offset, 0);
					scope.canvasContext.lineTo(x + scope.offset, scope.viewParams.SpriteSize * scope.viewParams.YCount);
				}
				
				scope.canvasContext.lineWidth = 1;
				scope.canvasContext.strokeStyle = "#000";
				scope.canvasContext.stroke();
				
				if(scope.SelectedCell){
					scope.canvasContext.beginPath();
					scope.canvasContext.lineWidth="2";
					scope.canvasContext.strokeStyle="red";
					scope.canvasContext.rect(scope.SelectedCell.X * scope.viewParams.SpriteSize, scope.SelectedCell.Y * scope.viewParams.SpriteSize,scope.viewParams.SpriteSize,scope.viewParams.SpriteSize); 
					scope.canvasContext.stroke();
				}
				
				
			};
			
			
			scope.addImage = function(x, y, offset, imagePath){
				var image = new Image();
				image.onload = function(){
					scope.canvasContext.drawImage(image,0,0,image.width,image.height,offset +scope.offset+ x * scope.viewParams.SpriteSize,offset +scope.offset + y * scope.viewParams.SpriteSize ,scope.viewParams.SpriteSize - 2 * offset,scope.viewParams.SpriteSize-2 * offset);
				};
				image.src = imagePath;
			}
			
			scope.renderBackground = function(xFrom, xTo, yFrom, yTo){
				
				if(!xFrom || !xTo || !yFrom || !yTo){
					xFrom = 0;
					yFrom = 0;
					xTo = scope.viewParams.XCount;
					yTo = scope.viewParams.YCount;
				}
				
				xFrom = Math.max(0, xFrom);
				yFrom = Math.max(0, yFrom);
				xTo = Math.min(scope.viewParams.XCount, xTo);
				yTo = Math.min(scope.viewParams.YCount, yTo);
				
				
				for(y = yFrom; y < yTo; y++){
					for(x = xFrom; x < xTo; x++){
						scope.addImage(x, y, 1, scope.cells[y][x].Background);
					}
				};
				
			};
			
			scope.selectCell = function(event){
				var x = Math.max(event.offsetX, 0);
				var y = Math.max(event.offsetY, 0);
				var oldX;
				var oldY;
				var needRender = false;
				if(scope.SelectedCell){
					oldX = scope.SelectedCell.X;
					oldY = scope.SelectedCell.Y;
					needRender = true;
				}
				scope.SelectedCell = scope.cells[y/scope.viewParams.SpriteSize|0][x/scope.viewParams.SpriteSize|0];
				scope.renderGrid();
				if(needRender){
					scope.renderBackground(oldX -1, oldY-1, oldX + 1, oldY + 1);
				}
				
			};

			
			scope.init ();
			scope.render();
			window.onresize = function(event) {
				console.log('resize');
				scope.init ();
				scope.render();

			};
        }
    }
});