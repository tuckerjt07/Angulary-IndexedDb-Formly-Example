/*global angular */
(function () {
    'use strict';
    angular.module('Formly.ActiveUsername.constant', [])
        .constant('FormlyActiveUsername', [
        {
            className: 'col-xs-12 col-sm-12 col-md-12 col-lg-12',
            fieldGroup: [
                {
                    key: 'userId',
                    type: 'select',
                    className: 'col-xs-12 col-sm-12 col-md-12 col-lg-4',
                    templateOptions: {
                        label: 'Active Username',
                        placeholder: 'Select Username',
                        modelValue: 'item',
                        display: '(item)',
                        options: [],
                        onChange: 'formState.activeUsernameChanged()'
                    },
                    controller: 'formState.activeUsernameController'
                }
            ]
        }
    ]);
}());
