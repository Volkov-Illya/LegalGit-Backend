
/*
 * @author ohmed
 * App endvironment manager
*/

var environment;

if ( __dirname.indexOf('/legal-prod/') !== -1 ) {

    environment = require('./../../config/ProductionEnvironment.js');

} else if ( __dirname.indexOf('/legal-stage/') !== -1 ) {

    environment = require('./../../config/StageEnvironment.js');

} else {

 	environment = require('./../../config/LocalEnvironment.js');

}

//

module.exports = environment;
