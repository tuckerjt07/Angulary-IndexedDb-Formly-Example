/*global angular */
(function () {
    'use strict';
    angular.module('Formly.AddUser.constant', [])
        .constant('FormlyAddUser',  [
        {
            className: 'col-xs-12 col-sm-12 col-md-12 col-lg-12',
            fieldGroup: [
                {
                    key: 'userId',
                    type: 'input',
                    className: 'col-xs-12 col-sm-12 col-md-12 col-lg-3',
                    templateOptions: {
                        label: 'Username',
                        placeholder: 'Enter New Username',
                        required: true
                    }
                }
            ]
        }
    ]);
}());
