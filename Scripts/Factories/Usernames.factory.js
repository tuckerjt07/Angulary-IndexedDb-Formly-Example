/*global angular */
(function () {
    'use strict';
    angular.module('Usernames.factory', [])
        .factory('Usernames', ['$q', 'TransactionFactory', function ($q, TransactionFactory) {
            return {
                //Get all the usernames
                getAll: function (databaseObject, objectStoreObject, indecesObject) {
                    var deferred;
                    deferred = $q.defer();
                    //Get all the usernames from the indexeddb database
                    TransactionFactory.selectAllWithPromise(databaseObject, objectStoreObject, indecesObject).then(function (returnedData) {
                        var record, userIds;
                        userIds = [];
                        for (record in returnedData) {
                            if (returnedData.hasOwnProperty(record)) {
                                userIds.push(returnedData[record].userId);
                            }
                        }
                        //Return the userIds
                        deferred.resolve(userIds);
                    });
                    return deferred.promise;
                },
                //Get all the users information for a specific username
                getUserByUserId: function (databaseObject, objectStoreObject, indecesObject, userId) {
                    var deferred;
                    deferred = $q.defer();
                    //Gets the object associated with the passed indexeddb key
                    TransactionFactory.getByKeyWithPromise(databaseObject, objectStoreObject, indecesObject, userId).then(function (userInfo) {
                        deferred.resolve(userInfo);
                    });
                    return deferred.promise;
                }
            };
        }]);
}());
