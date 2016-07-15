{
  'use strict';
  angular.module('pokemonBattle', [
    'ui-router',
    'ngFlash',
    'textAngular',
  ])
  .config(config);

  config.$inject = ['$urlRouterProvider'];
  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('')
  }
}
