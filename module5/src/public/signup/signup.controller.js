(function () {
'use strict';

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService','RegInfoService'];
function SignupController(MenuService,RegInfoService) {
  var $signupCtrl = this;
  $signupCtrl.user = {};

  $signupCtrl.submit = function () {
    MenuService.getMenuItem($signupCtrl.user.menunumber.toUpperCase())
    .then(function () {
          $signupCtrl.invalidMenunumber = false;
          $signupCtrl.completed = true;
          RegInfoService.setRegInfo($signupCtrl.user);
          console.log(RegInfoService.getRegInfo());
        })
    .catch(function() {
          $signupCtrl.invalidMenunumber = true;
          $signupCtrl.completed = false;
        });
  }
}

})();
