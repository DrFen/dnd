app.directive('treeHelper', function (dataService) {
    return {
        templateUrl: '/templates/tree-helper/tree-helper.html',
        scope: {
            treeApi: "@treeApi",
            selectedItem : "=selectedItem"
           
        },
        controller: function ($scope) {
            $scope.selectedItem = '';
            $scope.treeList = [];

        },
        link: function (scope, element, attrs) {
		scope.openNodes = [];
		scope.hasLeaf = [];
		scope.lastLeaf = [];
		scope.selectedItem = '';
        
		var fillAction = function (treeElem) {
		    scope.openNodes.push(treeElem.Id);

		    if (treeElem.Nodes.length !== 0) {
		        scope.hasLeaf.push(treeElem.Id);
		    }
		};

        scope.rebindTree = function() {
            dataService.sendPost(scope.treeApi, '').then(function (val) {
                scope.treeList = val;
                scope.bruteTree(scope.treeList, fillAction);
            });
        }
		
		scope.bruteTree = function (tree, action) {
		    
		        var last = '';
		        for (var i = 0; i < tree.length; i++) {
		            last = tree[i].Id;
		            action(tree[i]);
		            scope.bruteTree(tree[i].Nodes, action);

		        }
		        scope.lastLeaf.push(last);
	   
		};
		
		//0-Узел 1- закрытый узел 2- открытый узел
		scope.getTreeType = function (nodeId) {
			if(scope.hasLeaf.indexOf(nodeId) !== -1){
				if(scope.openNodes.indexOf(nodeId)!==-1)
					return 2;
				return 1;
			} else{
				return 0;
			}
		};
		
		scope.changeLeafOpenStatus = function(nodeId){
			var openIndex = scope.openNodes.indexOf(nodeId);
			if(openIndex === -1){
				scope.openNodes.push(nodeId);
			}else{
				scope.openNodes.splice(openIndex, 1);
			};
		};
		
		scope.selectNode = function(nodeId){
			scope.selectedItem = nodeId;
		};
		scope.isLast = function(nodeId){
			return scope.lastLeaf.indexOf(nodeId) !== -1;
		};


            scope.rebindTree();

        }

    }

});