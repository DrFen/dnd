app.directive('mapSquare', function (dataService, $rootScope, $timeout) {
    return {
			templateUrl: '/templates/map-square/map-square.html',
			scope: {
				viewParams: "=viewParams",
				cells: "=cells",
				addItem: "=addItem"
			},
        controller: function ($scope) {				
		
        },
        link: function (scope, element, attrs) {		
			
			
			
			scope.init = function(){
			
				
				
				scope.canvas = document.getElementById("map-canvas");
				scope.canvasBackgroundContext = scope.canvas.getContext("2d");
				scope.canvas.height = scope.canvas.offsetHeight;
				scope.canvas.width = scope.canvas.offsetWidth;


				scope.canvasSelection = document.getElementById("map-canvas-selection");
				scope.canvasSelectionContext = scope.canvasSelection.getContext("2d");	
				scope.canvasSelection.height = scope.canvas.offsetHeight;
				scope.canvasSelection.width = scope.canvas.offsetWidth;
				
				scope.canvasGrid = document.getElementById("map-canvas-grid");
				scope.canvasGridContext = scope.canvasGrid.getContext("2d");	
				scope.canvasGrid.height = scope.canvas.offsetHeight;
				scope.canvasGrid.width = scope.canvas.offsetWidth;
				
				
				scope.layerKey = [];
				scope.layerContext = [];
				scope.layerElems = [];
				for(var i =0; i<scope.cells.Layers.length; i++){


					var cnv = document.createElement('canvas'); 
					document.getElementById('map-border').appendChild(cnv);
					cnv.className = 'map-canvas';
					cnv.setAttribute('id', 'map-canvas-' + scope.cells.Layers[i]);
					cnv.height = scope.canvas.offsetHeight;
					cnv.width = scope.canvas.offsetWidth;
					cnv.style.zIndex = i + 100;
					
					scope.layerKey.push(scope.cells.Layers[i]);
					scope.layerContext.push(cnv.getContext("2d"));
					scope.layerElems.push(cnv);
				}
				
				scope.offset = 0.5;
			
				
				
				
				scope.canvasSelection.onclick = function(event){
					scope.selectCell(event);
				};
				
				scope.canvasSelection.onmousemove  = function(event){
					if(scope.addItem)
						scope.renderSelection(event);
				};
				
				scope.$watch('viewParams', function(){
					scope.viewParams.StartWithX  = Math.max(scope.viewParams.StartWithX, 0);
					scope.viewParams.StartWithY  = Math.max(scope.viewParams.StartWithY, 0);
					
					scope.viewParams.XCount = Math.min(((scope.canvas.offsetWidth )/ scope.viewParams.CellSize | 0), scope.cells.XCount);
					scope.viewParams.YCount = Math.min(((scope.canvas.offsetHeight) / scope.viewParams.CellSize | 0), scope.cells.YCount);
					
					scope.render();
				
				}, true);
				console.log('init complete. XCount = ' + scope.viewParams.XCount + '; YCount = ' + scope.viewParams.YCount + ';');

				
			};
			
			scope.getCanvasContext = function(contextName){
				switch(contextName){
					case 'Background':
						return scope.canvasBackgroundContext;
					case 'Selection' :	
						return scope.canvasSelectionContext;
					case 'Grid' :	
						return scope.canvasGridContext;	
					default:
						var index = scope.layerKey.indexOf(contextName);
						if (index!= -1)
							return scope.layerContext[index];
						console.log('context '+contextName+' not found!');
						
				}
			}
			
			scope.getCanvasElem = function(contextName){
				switch(contextName){
					case 'Background':
						return scope.canvas;
					case 'Selection' :	
						return scope.canvasSelection;
					case 'Grid' :	
						return scope.canvasGrid;		
					default:
						var index = scope.layerKey.indexOf(contextName);
						if (index!= -1)
							return scope.layerElems[index];
						console.log('elem '+contextName+' not found!');
						
				}
			}
			
			scope.clearCanvas = function(contextName){
				var elem = scope.getCanvasElem(contextName);
				if(!elem)
					return;
				elem.width = elem.width;	
			}
			
			scope.getLayer = function(layerName){
				var answer = scope.cells[layerName + 'Layer'];
				if(!answer)
					console.log('layer '+layerName+' not found!');
				return answer;
			}
			
			
			
			scope.renderGrid = function(){
			
				scope.clearCanvas('Grid');
			
			    var yCount = Math.min(scope.viewParams.YCount, scope.cells.YCount - scope.viewParams.StartWithY);
				var xCount = Math.min(scope.viewParams.XCount, scope.cells.XCount - scope.viewParams.StartWithX);
				
				for(y=0; y <= scope.viewParams.CellSize * yCount; y+= scope.viewParams.CellSize){
					scope.canvasGridContext.moveTo(0, y + scope.offset);
					scope.canvasGridContext.lineTo(scope.viewParams.CellSize * xCount, y + scope.offset);
				}
				
				for(x=0; x <= scope.viewParams.CellSize * xCount; x+=scope.viewParams.CellSize){
					scope.canvasGridContext.moveTo(x + scope.offset, 0);
					scope.canvasGridContext.lineTo(x + scope.offset, scope.viewParams.CellSize * yCount);
				}
				
				scope.canvasGridContext.lineWidth = 1;
				scope.canvasGridContext.strokeStyle = "#000";
				scope.canvasGridContext.stroke();
				
				
			};
			
			scope.addImage = function(x, y, width, height, offset, imagePath, context){
				var image = new Image();
				image.onload = function(){
					context.drawImage(image,0,0,image.width,image.height,
					offset +scope.offset+ x * scope.viewParams.CellSize,
					offset +scope.offset + y * scope.viewParams.CellSize ,
					scope.viewParams.CellSize * width- 2 * offset,
					scope.viewParams.CellSize * height-2 * offset);
				};
				image.src = imagePath;
			}
			
			scope.renderImgLayer = function(contextName, offset){

				var context = scope.getCanvasContext(contextName);
				
				if(!context)
					return;
					
				context.width = context.width;
                var layer = scope.getLayer(contextName);
				
				if(!layer)
					return;
					
				
				for(var i = 0; i < layer.length; i++){
				 
				    if(layer[i].XFrom + layer[i].Width <= scope.viewParams.StartWithX)
						continue;
					
					if(layer[i].XFrom >= scope.viewParams.StartWithX + scope.viewParams.XCount)
						continue;
					
					if(layer[i].YFrom + layer[i].Height <= scope.viewParams.StartWithY)
						continue;
					
					if(layer[i].YFrom >= scope.viewParams.StartWithY + scope.viewParams.YCount)
						continue;
						
					var xFrom = Math.max(layer[i].XFrom, scope.viewParams.StartWithX) - scope.viewParams.StartWithX;
				    var yFrom = Math.max(layer[i].YFrom, scope.viewParams.StartWithY) - scope.viewParams.StartWithY;
					scope.viewParams.XCount - (scope.viewParams.StartWithX -  layer[i].XFrom)
					var height = Math.min(layer[i].Height, scope.viewParams.StartWithY + scope.viewParams.YCount - layer[i].YFrom);
					var width = Math.min(layer[i].Width, scope.viewParams.StartWithX + scope.viewParams.XCount - layer[i].XFrom);
					
												
					scope.addImage(xFrom, 
					yFrom, 
					width, 
					height, 
					offset, 
					layer[i].Image,
					context);
				}
			}
			
			scope.renderBackground = function(){
				scope.clearCanvas('Background');
				scope.renderImgLayer('Background', 1);
				
			};
			
			scope.renderSelection = function(elem){
				
				scope.canvasSelection.width  = scope.canvasSelection.width;
				
				if(scope.SelectedCell){
					if(scope.SelectedCell.X -scope.viewParams.StartWithX >= 0 
					&& scope.SelectedCell.Y -scope.viewParams.StartWithY >= 0
					&& scope.SelectedCell.X < scope.viewParams.StartWithX  + scope.viewParams.XCount
					&& scope.SelectedCell.Y < scope.viewParams.StartWithY  + scope.viewParams.YCount
					){
							
						scope.canvasSelectionContext.beginPath();
						scope.canvasSelectionContext.lineWidth="2";
						scope.canvasSelectionContext.strokeStyle="red";
						scope.canvasSelectionContext.rect((scope.SelectedCell.X-scope.viewParams.StartWithX)* scope.viewParams.CellSize, (scope.SelectedCell.Y-scope.viewParams.StartWithY)* scope.viewParams.CellSize,scope.viewParams.CellSize,scope.viewParams.CellSize); 
						scope.canvasSelectionContext.stroke();
					}
				}
				if(scope.addItem && elem){					
					var x = (Math.max(event.offsetX, 0)/scope.viewParams.CellSize|0);
					var y = (Math.max(event.offsetY, 0)/scope.viewParams.CellSize|0);
					
					if(x+scope.addItem.Width > scope.viewParams.XCount || y+scope.addItem.Width > scope.viewParams.XCount){
						scope.hideCursor = false;
						return;
					}
					
					scope.hideCursor = true;
					scope.canvasSelectionContext.fillStyle = scope.addItem.AuraColor;
					scope.canvasSelectionContext.fillRect(x * scope.viewParams.CellSize ,y * scope.viewParams.CellSize, scope.addItem.Width * scope.viewParams.CellSize, scope.addItem.Height * scope.viewParams.CellSize);
				}
			}
			
			scope.selectCell = function(event){
			
				if(scope.addItem){
					var x = (Math.max(event.offsetX, 0)/scope.viewParams.CellSize|0);
					var y = (Math.max(event.offsetY, 0)/scope.viewParams.CellSize|0);
					
					var layer = scope.getLayer(scope.addItem.Layer);
					if(!layer)
						return;
						
					layer.push({
						XFrom: x + scope.viewParams.StartWithX,
						YFrom: y + scope.viewParams.StartWithY,
						Width: scope.addItem.Width,
						Height: scope.addItem.Height,
						Image: scope.addItem.Image
					});	
					
					if(x+scope.addItem.Width > scope.viewParams.XCount || y+scope.addItem.Width > scope.viewParams.XCount)
						return;

					scope.addItem = null;
					scope.render();
					
				
				}else{				
					var x = Math.max(event.offsetX, 0);
					var y = Math.max(event.offsetY, 0);
					
					if((x/scope.viewParams.CellSize|0) > scope.viewParams.XCount || (y/scope.viewParams.CellSize|0) > scope.viewParams.YCount)
						return;
					
					scope.SelectedCell = {X : (x/scope.viewParams.CellSize|0) + scope.viewParams.StartWithX, Y:(y/scope.viewParams.CellSize|0) + scope.viewParams.StartWithY};
					scope.renderSelection();
				}		
				
			};

			scope.render = function(){
			    scope.clearCanvas('Grid');
				scope.renderGrid();
				
				scope.clearCanvas('Background');
				scope.renderBackground();
				
				for(var i = 0; i < scope.cells.Layers.length; i++){
					scope.clearCanvas(scope.cells.Layers[i]);
					scope.renderImgLayer(scope.cells.Layers[i], i + 2);
				}
				scope.renderSelection();
			}
			
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