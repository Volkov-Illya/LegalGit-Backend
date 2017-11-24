/*
 * @author ohmed
 * Stage environment config file
*/

var config = {

    name:           'Stage testing environment',

    mongodb: {
        host:       'mongodb://localhost',
        port:       27017,
        db:         'bimba-tools'
    },

    web: {
        host:       'http://188.166.164.236',
        port:       3005
    },

    notifications: {
        port:           3006,
        internalPort:   3007
    }

};

//

module.exports = config;
