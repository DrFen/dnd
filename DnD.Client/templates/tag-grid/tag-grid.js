app.directive('tagGrid', function ($uibModal) {
    return {
        templateUrl: '/templates/tag-grid/tag-grid.html',
        scope: {
            tagList: "=tagList",
			fullTagList : "=fullTagList"
           
        },
        controller: function ($scope) {
			$scope.selectParam = {
				ShowSelect : false,
				SelectedTag : null
			} ;

			if(!$scope.tagList)
				$scope.tagList = [];

        },
        link: function (scope, element, attrs) {
		   
			scope.deleteTag = function(index){
				scope.tagList.splice(index, 1);
			}
			
			scope.tagExist = function(tagId){
				for(var i = 0; i<scope.tagList.length; i++){
					if(scope.tagList[i].Id === tagId)
						return true;
				};
				return false;
			};
			
			scope.addTag = function(){
				scope.listForAdd = [];
				for(var i =0; i<scope.fullTagList.length;i++){
					if(!scope.tagExist(scope.fullTagList[i].Id))
						scope.listForAdd.push(scope.fullTagList[i]);
				};
				scope.selectParam.ShowSelect = true;			
			};
			
			scope.selectTag = function(){
				if(scope.selectParam.SelectedTag){
					for(var i=0; i<scope.listForAdd.length; i++){
						if(scope.listForAdd[i].Id === scope.selectParam.SelectedTag){
							scope.tagList.push(scope.listForAdd[i]);
							break;
						};	
					};
				};
				console.log(scope.tagList);
				scope.selectParam.ShowSelect = false;	
				scope.selectParam.SelectedTag = null;				
			};
			
			scope.dismissSelectTag = function(){
				scope.selectParam.ShowSelect = false;
				scope.selectParam.SelectedTag = null;
			};

        }

    }

});