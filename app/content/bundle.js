'use strict';

{
  var config = function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('');
  };

  'use strict';
  angular.module('pokemonBattle', ['ui-router', 'ngFlash', 'textAngular']).config(config);

  config.$inject = ['$urlRouterProvider'];
}
//# sourceMappingURL=bundle.js.map
