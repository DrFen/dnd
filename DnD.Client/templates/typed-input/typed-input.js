app.directive('typedInput', function (dataService) {
    return {
        templateUrl: '/templates/typed-input/typed-input.html',
        scope: {
            inputValue: "=inputValue"
        },
        controller: function ($scope) {

        },
        link: function (scope, element, attrs) {

            scope.setValueList = function () {
                if (scope.inputValue.Type === 'combo' || scope.inputValue.Type === 'multiselect') {
                    if (scope.inputValue.ListApi) {
                        dataService.sendPost(scope.inputValue.ListApi, scope.inputValue.ListApiParams).then(function (val) {
                            scope.inputValue.ListValues  = val;
                        });
                    };
                };
                var i;
                if (scope.inputValue.Type === 'combo') {
                    var val = null;
                    for (i = 0; i < scope.inputValue.ListValues.length; i++) {
                        if (scope.inputValue.ListValues[i].Id === scope.inputValue.Value) {
                            val = scope.inputValue.Value;
                            break;
                        }
                    }
                    scope.inputValue.Value = val;
                };

                if (scope.inputValue.Type === 'multiselect') {
                    var newValues = [];
                    for (i = 0; i < scope.inputValue.ListValues.length; i++) {
                        if (scope.inputValue.Value.indexOf(scope.inputValue.ListValues[i].Id) !== -1)
                            newValues.push(scope.inputValue.ListValues[i].Id);
                    }
                    scope.inputValue.Value = newValues;

                };

            };

            scope.changeMultiselect = function (changedId) {
                var indexValue = scope.inputValue.Value.indexOf(changedId);
                if (indexValue === -1) {
                    scope.inputValue.Value.push(changedId);
                } else {
                    scope.inputValue.Value.splice(indexValue, 1);
                };
            }

            scope.setValueList();
        }

    }
});