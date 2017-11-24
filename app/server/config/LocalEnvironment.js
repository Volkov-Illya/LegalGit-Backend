/*
 * @author ohmed
 * Local environment config file
*/

var config = {

    name:           'Local dev environment',

    mongodb: {
        host:       'mongodb://bimba-remote:aloha123x@188.166.164.236:27017',
        db:         'bimba-tools'
    },

    web: {
        host:       'http://localhost',
        port:       3000
    },

    notifications: {
        port:           3006,
        internalPort:   3007
    }

};

//

module.exports = config;
