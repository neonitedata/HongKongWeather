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
 * Formating the file to fit into the new textfile
 * @param {*} err 
 * @param {*} content 
 */
function formatFile(err, content){
    // do Formating
    var newStr = content.split(' ');
    console.log( newStr)

    // Append to existing Clean File
    fs.appendFileSync(dataFile, newStr)
}
