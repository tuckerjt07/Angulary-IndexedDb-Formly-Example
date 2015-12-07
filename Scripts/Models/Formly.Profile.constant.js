/*global angular */
(function () {
    angular.module('Formly.Profile.constant', [])
        .constant('FormlyProfile', [
        {
            className: 'col-xs-12 col-sm-12 col-md-12 col-lg-12',
            fieldGroup: [
                {
                    key: 'editMode',
                    type: 'link',
                    className: 'col-xs-12 col-sm-12 col-md-12 col-lg-offset-11 col-lg-1',
                    ngModelAttrs: {
                        customAttrVal: {
                            attribute: 'angular-cursor'
                        }
                    },
                    templateOptions: {
                        linkText: 'Edit',
                        onClick: 'formState.editModeToggle()'
                    }
                }
            ]
        },
        {
            className: 'col-xs-12 col-sm-12 col-md-12 col-lg-12',
            fieldGroup: [
                {
                    key: 'firstName',
                    type: 'label',
                    'className': 'col-xs-12 col-sm-12 col-md-12 col-lg-1',
                    templateOptions: {
                        label: 'First Name'
                    },
                    hideExpression: 'formState.isEditMode'
                },
                {
                    key: 'firstName',
                    type: 'input',
                    className: 'col-xs-12 col-sm-12 col-md-12 col-lg-3',
                    templateOptions: {
                        label: 'First Name',
                        placeholder: 'Enter First Name',
                        onBlur: 'formState.onBlur()',
                        required: true,
                        errorCondition: true,
                        addonLeft: {
                            class: 'glyphicon glyphicon-person'
                        }
                    },
                    hideExpression: '!formState.isEditMode'
                },
                {
                    key: 'lastName',
                    type: 'label',
                    'className': 'col-xs-12 col-sm-12 col-md-12 col-lg-1',
                    templateOptions: {
                        label: 'Last Name'
                    },
                    hideExpression: 'formState.isEditMode'
                },
                {
                    key: 'lastName',
                    type: 'input',
                    className: 'col-xs-12 col-sm-12 col-md-12 col-lg-3',
                    templateOptions: {
                        label: 'Last Name',
                        placeholder: 'Enter Last Name',
                        onBlur: 'formState.onBlur()',
                        required: true,
                        addonLeft: {
                            class: 'glyphicon glyphicon-person'
                        }
                    },
                    hideExpression: '!formState.isEditMode'
                }
            ]
        },
        {
            className: 'col-xs-12 col-sm-12 col-md-12 col-lg-12',
            fieldGroup: [
                {
                    key: 'addressLine1',
                    type: 'label',
                    'className': 'col-xs-12 col-sm-12 col-md-12 col-lg-2',
                    templateOptions: {
                        label: 'Address Line 1'
                    },
                    hideExpression: 'formState.isEditMode'
                },
                {
                    key: 'addressLine1',
                    type: 'input',
                    className: 'col-xs-12 col-sm-12 col-md-12 col-lg-6',
                    templateOptions: {
                        label: 'Address Line 1',
                        placeholder: 'Enter Address Line 1',
                        onBlur: 'formState.onBlur()',
                        required: true,
                        addonLeft: {
                            class: 'glyphicon glyphicon-person'
                        }
                    },
                    hideExpression: '!formState.isEditMode'
                },
                {
                    key: 'addressLine2',
                    type: 'label',
                    'className': 'col-xs-12 col-sm-12 col-md-12 col-lg-2',
                    templateOptions: {
                        label: 'Address Line 2'
                    },
                    hideExpression: 'formState.isEditMode'
                },
                {
                    key: 'addressLine2',
                    type: 'input',
                    className: 'col-xs-12 col-sm-12 col-md-12 col-lg-6',
                    templateOptions: {
                        label: 'Address Line 2',
                        placeholder: 'Enter Address Line 2',
                        onBlur: 'formState.onBlur()',
                        addonLeft: {
                            class: 'glyphicon glyphicon-person'
                        }
                    },
                    hideExpression: '!formState.isEditMode'
                }
            ]
        },
        {
            className: 'col-xs-12 col-sm-12 col-md-12 col-lg-12',
            fieldGroup: [
                {
                    key: 'city',
                    type: 'label',
                    'className': 'col-xs-12 col-sm-12 col-md-12 col-lg-1',
                    templateOptions: {
                        label: 'City'
                    },
                    hideExpression: 'formState.isEditMode'
                },
                {
                    key: 'city',
                    type: 'input',
                    className: 'col-xs-12 col-sm-12 col-md-12 col-lg-4',
                    templateOptions: {
                        label: 'City',
                        placeholder: 'Enter City',
                        onBlur: 'formState.onBlur()',
                        required: true,
                        addonLeft: {
                            class: 'glyphicon glyphicon-person'
                        }
                    },
                    hideExpression: '!formState.isEditMode'
                },
                {
                    key: 'state',
                    type: 'label',
                    'className': 'col-xs-12 col-sm-12 col-md-12 col-lg-1',
                    templateOptions: {
                        label: 'State'
                    },
                    hideExpression: 'formState.isEditMode'

                },
                {
                    key: 'state',
                    type: 'select',
                    className: 'col-xs-12 col-sm-12 col-md-12 col-lg-2',
                    templateOptions: {
                        label: 'State',
                        placeholder: 'Select State',
                        onBlur: 'formState.onBlur()',
                        modelValue: 'item.Id',
                        display: '(item.Description)',
                        required: true,
                        options: []
                    },
                    controller: 'formState.loadStateDropdown',
                    hideExpression: '!formState.isEditMode'
                },
                {
                    key: 'zip',
                    type: 'label',
                    'className': 'col-xs-12 col-sm-12 col-md-12 col-lg-1',
                    templateOptions: {
                        label: 'Zip Code'
                    },
                    hideExpression: 'formState.isEditMode'
                },
                {
                    key: 'zip',
                    type: 'input',
                    className: 'col-xs-12 col-sm-12 col-md-12 col-lg-3',
                    templateOptions: {
                        label: 'Zip Code',
                        placeholder: 'Enter Zip Code',
                        onBlur: 'formState.onBlur()',
                        required: true,
                        type: 'number',
                        addonLeft: {
                            class: 'glyphicon glyphicon-person'
                        }
                    },
                    hideExpression: '!formState.isEditMode'
                }
            ]
        }
    ]);
}());
