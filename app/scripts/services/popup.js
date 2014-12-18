'use strict';

angular.module('adminPanelApp')
  .factory('Popup', function($rootScope, ngDialog) {


    var isTemplate = function isTemplate(value){
      return !angular.isString(value) && angular.isObject(value);
    };

    return {
      confirm: function(message, optionsOverride){
        var options = {
          template: $rootScope.templates.confirmDefaultPopup,
          scope: $rootScope.$new(true)
        };

        if(isTemplate(message)){
          if(message.scope){
            options.scope = message.scope;
          }

          options.scope.message = message.message;
          options.scope.description = message.description;
          options.scope.yesText = message.yesText;
          options.scope.noText = message.noText;
          options.scope.template = message.template;
        } else {
          options.scope.message = message;
        }

        if(optionsOverride){
          angular.extend(options, optionsOverride);
        }



        return this.openConfirm(options);

      },

      alert: function(message, optionsOverride){
        var options = {
          template: $rootScope.templates.alertDefaultPopup,
          scope: $rootScope.$new(true)
        };

        if(isTemplate(message)){
          if(message.scope){
            options.scope = message.scope;
          }

          options.scope.message = message.message;
          options.scope.description = message.description;
          options.scope.okText = message.okText;
          options.scope.template = message.template;
        } else {
          options.scope.message = message;
        }

        if(optionsOverride){
          angular.extend(options, optionsOverride);
        }

        return this.open(options).closePromise;

      },

      open: ngDialog.open,

      openConfirm: ngDialog.openConfirm,

      close: ngDialog.close,

      closeAll: ngDialog.closeAll,

      setForceBodyReload: ngDialog.setForceBodyReload
    };

  }
);
