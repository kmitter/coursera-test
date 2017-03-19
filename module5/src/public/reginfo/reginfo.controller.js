(function () {
'use strict';

angular.module('public')
.controller('RegInfoController', RegInfoController);

RegInfoController.$inject = ['MenuService','regInfo'];
function RegInfoController(MenuService,regInfo) {
  var $regInfoCtrl = this;

console.log(regInfo);
 if (regInfo) {
   $regInfoCtrl.user = regInfo;
   MenuService.getMenuItem($regInfoCtrl.user.menunumber)
     .then(function(response) {
       $regInfoCtrl.menuItem = response;
     })
     .catch(function(response) {
       console.log(response);
     });
 }
}

})();
