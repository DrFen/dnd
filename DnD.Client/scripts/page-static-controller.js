﻿app.controller('PageStaticCtrl', function ($scope, $rootScope, $location) {

	$scope.randomString = function (count){
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			for( var i=0; i < count; i++ )
				text += possible.charAt(Math.floor(Math.random() * possible.length));

			return text;
	};

	$scope.tagList = [];
	$scope.fullTagList = [];
	for(var i = 0; i <10; i++){
			var name = $scope.randomString(Math.round(1 + Math.random() * 9));
			$scope.tagList.push({
				Id: 't' + i , 
				Name: name 
			});
			$scope.fullTagList.push({
				Id: 't' + i , 
				Name: name 
			});
	}
	
	for(var i=10; i<20; i++){
		$scope.fullTagList.push({
				Id: 't' + i , 
				Name: $scope.randomString(Math.round(1 + Math.random() * 9)) 
			});
	}
	

	
	$scope.userParam = {
		UserName : 'user 1',
		UserId : 'us1'
	};
	
	

    $scope.deleteAllObjects = function () {
        $scope.$broadcast('deleteObjects', {});
    };
    $scope.moveAllObject = function () {
        $scope.$broadcast('moveObjects', {});
    };

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

    /*
	public class AttributeValue
	{
		public Guid Id {get;set;}
		public string Type {get;set;}
		public string Label {get;set;}
		

		public List<ComboValue> ListValues {get;set;}
		public string ListApi {get;set;}
		public object ListApiParams {get;set;}
		public int? AllowSelectCount {get;set;}
		
		
		public object Value{get;set;}
		
	}
	*/

    $scope.inputArray = [
		{
		    Id: 'q1',
		    Type: 'number',
		    Label: 'тестовое число',
		    Value: 31415
		},
		{
		    Id: 'q2',
		    Type: 'text',
		    Label: 'тестовый текст',
		    Value: 'test-text'
		},
		{
		    Id: 'q3',
		    Type: 'textarea',
		    Label: 'тестовый textarea',
		    Value: 'test-texttest-texttest-texttest-texttest-texttest-texttest-texttest-texttest-texttest-texttest-texttest-texttest-texttest-texttest-texttest-texttest-text'
		},
		{
		    Id: 'q4',
		    Type: 'combo',
		    Label: 'тестовый комбик',
		    ListValues: [{ Id: 'c1', Name: 'name 1' }, { Id: 'c2', Name: 'name 2' }],
		    Value: 'c1'
		}
		,
		{
		    Id: 'q5',
		    Type: 'combo',
		    Label: 'тестовый комбик',
		    ListApi: 'api',
		    ListApiParams: {},
		    Value: 'c1'
		},
		{
		    Id: 'q6',
		    Type: 'multiselect',
		    Label: 'тестовый мультиселект',
		    AllowSelectCount: 2,
		    ListValues: [{ Id: 'c1', Name: 'name 1' }, { Id: 'c2', Name: 'name 2' }, { Id: 'c3', Name: 'name 3' }, { Id: 'c4', Name: 'name 4' }],
		    Value: ['c2', 'c3', 'asd1']
		},
		{
		    Id: 'q7',
		    Type: 'multiselect',
		    Label: 'тестовый мультиселект c api',
		    AllowSelectCount: null,
		    ListApi: 'as',
		    Value: ['cc1']
		},
		{
		    Id: 'q8',
		    Type: 'bool',
		    Label: 'тестовый textarea',
		    Value: true
		}]

});



/*$scope.attributeList = [
{
    Id: '1',
    Count: null,
    Attributes:[
        {Id: 'Static 1', Name: 'Static 1'},
        {Id: 'Static 2', Name: 'Static 2'},
        {Id: 'Static 3', Name: 'Static 3'}
    ]
},
{
    Id: '2',
    Count: 1,
    Attributes:[
        {Id: 'ONE_OF_N_1', Name: 'ONE_OF_N_1'},
        {Id: 'ONE_OF_N_2', Name: 'ONE_OF_N_2'},
        {Id: 'ONE_OF_N_3', Name: 'ONE_OF_N_3'}
    ]
},
{
    Id: '3',
    Count: 2,
    Attributes:[
        {Id: 'TWO_OF_N_1', Name: 'TWO_OF_N_1'},
        {Id: 'TWO_OF_N_2', Name: 'TWO_OF_N_2'},
        {Id: 'TWO_OF_N_3', Name: 'TWO_OF_N_3'}
    ]
}
];*/


