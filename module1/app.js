(function(){
'use strict';

angular.module('Module1App',[])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
    $scope.lunchMenu = "";
    $scope.message = "";
    $scope.sayMessage = function () {
      var comma = ',';
      var stringToSplit = $scope.lunchMenu;
      var arrayOfStrings = stringToSplit.split(comma);
      var len = 0;
      for (var i = 0; i < arrayOfStrings.length; i++) {
          if (arrayOfStrings[i].trim() != '')
          len++;
      }
      if (len == 0) {
        $scope.message = "Please enter data first";
      }
      else
      if (len <=3) {
        $scope.message = "Enjoy!";
      }
      else {
        $scope.message = "Too much!";
      }
    };
}
})();
