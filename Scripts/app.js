/* global angular */
(function () {
    'use strict';
    angular.module('FormlyTestApp', ['formly', 'formlyBootstrap', 'Main.controller', 'ui.mask', 'State.factory',
                                     'Usernames.factory', 'IndexedDb.Utils', 'FormlyHelper', 'Formly.ActiveUsername.constant',
                                     'Formly.Profile.constant', 'Formly.AddUser.constant', 'ProfileOptions.factory'],
                   function (formlyConfigProvider) {
            formlyConfigProvider.setType([
                {
                    name: 'input',
                    templateUrl: 'formly-templates/input-template.html',
                    overwriteOk: true
            },
                {
                    name: 'label',
                    templateUrl: 'formly-templates/label-template.html',
                    overwriteOk: true
            },
                {
                    name: 'link',
                    templateUrl: 'formly-templates/link-template.html',
                    overwriteOk: true
            },
                {
                    name: 'select',
                    templateUrl: 'formly-templates/select-template.html',
                    overwriteOk: true
            },
                {
                    name: 'toggle-link',
                    templateUrl: 'formly-templates/toggle-link-template.html',
                    overwriteOk: true
            },
                {
                    name: 'checkbox',
                    templateUrl: 'checkbox-template.html',
                    overwriteOk: true
            }
        ]);
        formlyConfigProvider.setWrapper([
            {
                template: [
                '<div class="formly-template-wrapper">',
                '<div class="form-group" ng-class="{\'has-error\': options.validation.errorExistsAndShouldBeVisible}">',
                '<label for="{{::id}}" class="control-label"><span class="text-danger">{{options.templateOptions.required ? \'*\' : \'\'}}</span>{{options.templateOptions.label}}</label>',
                '<formly-transclude></formly-transclude>',
                '<div class="validation text-danger"',
                'ng-if="options.validation.errorExistsAndShouldBeVisible"',
                'ng-messages="options.formControl.$error">',
                '<div ng-messages-include="formly-templates/validation.html"></div>',
                '<div ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages">',
                '{{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}',
                '</div>',
                '</div>',
                '</div>',
                '</div>'
            ].join(' '),
                types: ['input', 'label', 'select']
            },
            {
                template: [
                '<div class="checkbox formly-template-wrapper-for-checkboxes form-group">',
                '<label for="{{::id}}">',
                '<formly-transclude></formly-transclude>',
                '</label>',
                '</div>'
            ].join(' '),
                types: 'checkbox'
        }]);
    })
    .run(function (formlyConfig, formlyValidationMessages) {
        formlyConfig.extras.ngModelAttrsManipulatorPreferBound = true;
        formlyValidationMessages.addTemplateOptionValueMessage('maxlength', 'maxlength', '', 'is the maximum length', 'Too long');
        formlyValidationMessages.addTemplateOptionValueMessage('minlength', 'minlength', '', 'is the minimum length', 'Too short');
        formlyValidationMessages.addTemplateOptionValueMessage('required', 'label', '', 'is a required field', 'Required');
    })
    .directive('angularCursor', [function () {
        return {
            restrict: 'A',
            scope: {
                cursor: '@cursor'
            },
            link: function (scope, element) {
                element.bind('mouseover', function () {
                    element.css('cursor', scope.cursor);
                });
            }
        };
    }]);
})();
