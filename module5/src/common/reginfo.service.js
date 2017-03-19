(function () {
"use strict";

angular.module('common')
.service('RegInfoService', RegInfoService);


RegInfoService.$inject = [];
function RegInfoService() {
  var service = this;

  service.setRegInfo = function (user) {
    service.user = user;
  };

  service.getRegInfo = function () {
    return service.user;
  };

}

})();
