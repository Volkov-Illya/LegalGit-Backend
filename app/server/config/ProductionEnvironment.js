/*
 * @author ohmed
 * Production environment config file
*/

var config = {

    name:           'Production environment',

    mongodb: {
        host:       'mongodb://localhost',
        port:       27017,
        db:         'bimba-tools-prod'
    },

    web: {
        host:       'http://188.166.164.236',
        port:       2222
    },

    notifications: {
        port:           3006,
        internalPort:   3007
    }

};

//

module.exports = config;
