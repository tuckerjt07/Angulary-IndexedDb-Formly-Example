/*global angular */
(function () {
    'use strict';
    angular.module('State.factory', [])
        .factory('States', ['$http', '$q', 'TransactionFactory', function ($http, $q, TransactionFactory) {
            var getDataFromAPI;
            //Get data from API
            getDataFromAPI = function (url) {
                var deferred;
                deferred = $q.defer();
                $http.get(url).success(function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            };
            return {
                //Get the data cached in the IndexedDb database
                //If it does not exist make a request to the API and then cache the API's response into IndexedDb
                //Return the data
                getAllCached: function (url, databaseObject, objectStoreObject, indecesObject, dataExtraction) {
                    var deferred, dataToSave, saveArray;
                    deferred = $q.defer();
                    saveArray = [];
                    //Get all the data that is currently cached in indexedDb
                    TransactionFactory.selectAllWithPromise(databaseObject, objectStoreObject, indecesObject)
                        .then(function (returnedData) {
                            //If length is 0 there is no cached data
                            if (returnedData.length <= 0) {
                                //Get the data from the API via $http
                                getDataFromAPI(url).then(function (returnedDataFromAPI) {
                                    //If a function for extracting data into a specific format is passed
                                    if (dataExtraction !== undefined) {
                                        //Extract and format the data
                                        dataToSave = dataExtraction(returnedDataFromAPI);
                                    }
                                    //Insert the data into the IndexedDb database
                                    TransactionFactory.insertWithPromise(databaseObject, objectStoreObject, indecesObject, dataToSave)
                                        .then(function () {
                                            //Return the data
                                            deferred.resolve(dataToSave);
                                        });
                                });
                            } else {
                                //Return the data
                                deferred.resolve(returnedData);
                            }
                        });
                    return deferred.promise;
                }
            };
        }]);
}());
