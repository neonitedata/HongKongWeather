var fs = require('fs');

// Read Directory
fs.readdir( 'orgData', function( err, files ) {
    // Error Throw if the directory isn't existing
    if( err ) {
        console.error( "Could not list the directory.", err );
        process.exit( 1 );
    } 

    files.forEach( function( file, index ) {
            var fromPath = path.join( moveFrom, file );
            var toPath = path.join( moveTo, file );

            fs.stat( fromPath, function( error, stat ) {
                if( error ) {
                    console.error( "Error stating file.", error );
                    return;
                }

                

                });
            } );
    } );
} );