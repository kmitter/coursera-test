(function(){
'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowItDown = this;
  narrowItDown.searchTerm = "";
  narrowItDown.found = "";
  narrowItDown.error = "";
  narrowItDown.narrowItDown = function () {
    narrowItDown.found = "";
    narrowItDown.error = "";
    if (narrowItDown.searchTerm.trim() != '')
    {
      var promise = MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm)
      promise.then(function (response) {
        narrowItDown.found = response;
        if (narrowItDown.found.length === 0)
          narrowItDown.error = "Nothing found";
      })
      .catch(function () {
        narrowItDown.error = "Nothing found (possibly network error)";
      });
    }
    else {
      narrowItDown.error = "Nothing found";
    }
  }
  narrowItDown.removeItem = function (itemIndex) {
    narrowItDown.found.splice(itemIndex, 1);
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var foundItems = "";
  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    }).then(function (result) {
      var items = result.data.menu_items;
      // process result and only keep items that match
      var foundItems = [];
      for (var i=0; i< items.length; i++)
      {
        if (items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
        {
          foundItems.push(items[i]);
        }
      }
      // return processed items
      return foundItems;
    });
  }
}

function FoundItemsDirective() {
  return {
    restrict: 'E',
    templateUrl: 'foundItems.html',
    scope: {
      foundItems: '<',
      error: "@",
      onRemove: '&',
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'foundItemsController',
    bindToController: true
  };
}

function FoundItemsDirectiveController() {
  var foundItemsController = this;
}

})();
