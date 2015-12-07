/*global angular */
(function () {
    'use strict';
    angular.module('Main.controller', ['ngMessages'])
        .controller('MainCtrl', ['$q', 'States', 'Usernames', 'DatabaseObject', 'ObjectStore', 'IndecesObject', 'TransactionFactory',
                                 'FormlyHelper', 'FormlyActiveUsername', 'FormlyProfile', 'FormlyAddUser',
                                 function ($q, States, Usernames, DatabaseObject, ObjectStore, IndecesObject, TransactionFactory,
                FormlyHelper, FormlyActiveUsername, FormlyProfile, FormlyAddUser) {
                //function global variables
                var self, statesForDropdown, getStatesForDropdown, statesAPIUrl, statesDatabaseObject, statesObjectStoreObject, statesIndecesObject, modelDatabaseObject, modelObjectStoreObject, modelIndecesObject;

                //Create statesForDropdown array
                statesForDropdown = [];

                //Function to load the array
                getStatesForDropdown = function (data) {
                    var listOfStates, stateObject;
                    listOfStates = data.RestResponse === undefined ? data : data.RestResponse.result;
                    for (stateObject in listOfStates) {
                        if (listOfStates.hasOwnProperty(stateObject)) {
                            statesForDropdown.push({
                                Id: listOfStates[stateObject].abbr,
                                Description: listOfStates[stateObject].name
                            });
                        }
                    }
                    return statesForDropdown;
                };

                self = this;

                //Set up the States Database Object
                statesDatabaseObject = new DatabaseObject.CreateObject('StatesStore', 1.0);
                modelDatabaseObject = new DatabaseObject.CreateObject('ModelStore', 1.0);

                //Set up the States Object Store Object
                statesObjectStoreObject = new ObjectStore.CreateObject('statesstore', null, true);
                modelObjectStoreObject = new ObjectStore.CreateObject('profileinfo', 'userid', false);

                //Set up the indeces object
                statesIndecesObject = [];
                modelIndecesObject = [];
                statesIndecesObject[0] = new IndecesObject[0].CreateObject('Id', {
                    unique: false
                });
                modelIndecesObject[0] = new IndecesObject[0].CreateObject('addressLine1', {
                    unique: true
                });

                //Set the endpoint url for getting the states
                statesAPIUrl = 'http://services.groupkt.com/state/get/USA/all';

                // funcation assignment
                self.onProfileEditSubmit = onProfileEditSubmit;

                self.onAddUsername = onAddUsername;

                self.Clicked = Clicked;

                self.editMode = false;

                //The functions for the profile information form
                self.profileOptions = {
                    formState: {
                        isEditMode: false,
                        //Controller to load the state dropdown
                        loadStateDropdown: function ($scope) {
                            States.getAllCached(statesAPIUrl, statesDatabaseObject, statesObjectStoreObject,
                                    statesIndecesObject, getStatesForDropdown)
                                .then(function (data) {
                                    $scope.to.options = data;
                                    return data;
                                });
                            $scope.$watch('to.options', function () {
                                if ($scope.to.options.length > 0) {

                                }
                            });
                        },
                        //Save the model to the database onBlur
                        onBlur: function () {
                            TransactionFactory.updateDataByKeyWithPromise(modelDatabaseObject, modelObjectStoreObject, modelIndecesObject, self.profileModel)
                                .then(function () {
                                    console.log('Saved');
                                });
                        },
                        //Attach the self.Clicked function to the form
                        editModeToggle: function () {
                            self.Clicked();
                        }
                    }
                };

                //The functions for the active username form
                self.activeUsernameOptions = {
                    formState: {
                        //Controller used to load the username dropdown
                        activeUsernameController: function ($scope) {
                            Usernames.getAll(modelDatabaseObject, modelObjectStoreObject, modelIndecesObject)
                                .then(function (usernames) {
                                    $scope.to.options = usernames;
                                    return usernames;
                                });
                        },
                        //Fired when the dropdown selection changes
                        activeUsernameChanged: function () {
                            //Set the profileModel user id to the new user id
                            self.profileModel.userId = self.activeUsernameModel.userId;
                            //Pull the information from the IndexedDb database
                            Usernames.getUserByUserId(modelDatabaseObject, modelObjectStoreObject, modelIndecesObject, self.profileModel.userId)
                                .then(function (userInfo) {
                                    self.profileModel = userInfo;
                                });
                        }
                    }
                };
                //Assign the fields from the models to the formly form fields
                self.activeUsernameFields = FormlyActiveUsername;

                self.profileFields = FormlyProfile;

                self.usernameFields = FormlyAddUser;

                // function definition
                //Fired on the profile edit submit button
                function onProfileEditSubmit() {
                    if (self.profileModel !== undefined) {
                        alert(JSON.stringify(self.profileModel), null, 2);
                    }
                }

                //Fired when the edit text is clicked
                function Clicked() {
                    self.editMode = self.profileOptions.formState.isEditMode = self.profileOptions.formState.isEditMode ? false : true;
                }

                //Fired on addUsername Submit
                function onAddUsername() {
                    if (self.usernameModel !== undefined) {
                        //Add the username to the indexedDb database
                        TransactionFactory.updateDataByKeyWithPromise(modelDatabaseObject, modelObjectStoreObject,
                                modelIndecesObject, self.usernameModel)
                            .then(function () {
                                //Get the new list of users and repopulate the username dropdown
                                Usernames.getAll(modelDatabaseObject, modelObjectStoreObject, modelIndecesObject).then(function (usernames) {
                                    var field;
                                    field = FormlyHelper.getFieldInFieldGroup(self.activeUsernameFields, 'userId');
                                    field.templateOptions.options = usernames;
                                    return usernames;
                                });
                            });
                    }
                }
        }]);
}());
