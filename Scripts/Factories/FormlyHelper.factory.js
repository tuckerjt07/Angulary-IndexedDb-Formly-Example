/*global angular */
(function () {
    'use strict';
    angular.module('FormlyHelper', [])
        .factory('FormlyHelper', [function () {
            return {
                //Find a specific formly field in a field group by its key
                getFieldInFieldGroup: function(fieldsObject, fieldKey) {
                    var fieldGroup, field;
                    //Get the object instead of the array
                    fieldsObject = fieldsObject[0];
                    //Iterate over each field group in the object
                    for (fieldGroup in fieldsObject.fieldGroup) {
                        if (fieldsObject.fieldGroup.hasOwnProperty(fieldGroup)) {
                            //Iterate over each field in the group
                            for (field in fieldsObject.fieldGroup) {
                                if (fieldsObject.fieldGroup.hasOwnProperty(field)) {
                                    //If the current fields key matches the passed value
                                    if (fieldsObject.fieldGroup[field].key === fieldKey) {
                                        //Return the field object and break out of the loops
                                        return fieldsObject.fieldGroup[field];
                                    }
                                }
                            }
                        }
                    }
                }
            };
        }]);
}());
