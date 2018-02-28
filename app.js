var fs = require('fs');
var readDir = './orgData/';

// Read Directory
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
            fs.readFile(file,'utf8', formatFile);
        });

    });

});



function formatFile(err, content){
    console.log( content )

}