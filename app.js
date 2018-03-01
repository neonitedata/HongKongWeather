var fs = require('fs');
var readDir = './orgData/';
var dataFile = './cleanData/database.csv';

/**
 * Read Directory and loop all files
 */
fs.readdir( './orgData', function( err, files ) {

    // Error Throw if the directory isn't existing
    if( err ) {
        console.error( "Could not list the directory.", err );
        process.exit( 1 );
    }
    
    // loop all files within directory
    files.forEach( function( file, index ) {

        // Check if file exists;
        fs.stat( readDir+file, function( error, stat ) {
            if( error ) {
                console.error( "Error stating file.", error );
                return;
            }
            
            // send file path to format File function
           fs.readFile(readDir+file,'utf8', formatFile);
        });

    });

});


/**
 * Get Date in new format
 * @param {string} file 
 */
function extractDate( date ){
    var time = date.slice(28, 33)+":00";
    var day = date.slice(49, date.length)

    date = day+" "+time+" GMT";
    date = new Date( date );

    return date;
}


/**
 * Formating the file to fit into the new textfile
 * @param {obj} err 
 * @param {string} content 
 */
function formatFile(err, content){
    // do Formating
    var dailyRecord = csvJSON(content);
    console.log(dailyRecord)
    //fs.appendFileSync(dataFile, dailyRecord);    
}



/**
 * Convert to JSON Format for easy access to data points
 * @param {string} csv 
 * @return {array}
 */
function csvJSON(csv){
    var lines = csv.split("\n");
    var result = [];
    var date = lines[0];

    date = extractDate(date);
    
    var headers = lines[1].split(",");

    for(var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline=lines[i].split(",");

        for( var j = 0; j<headers.length; j++ ){
            obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
    }

    //return result; //JavaScript object
    return [JSON.stringify(result), date]; //JSON
}
  