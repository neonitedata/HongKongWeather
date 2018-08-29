var fs = require('fs');

// Path Definition
var readDir = './orgData/',
		dataFile = './cleanData/',
		outputFormat = 'json',
		dataSet = {};

// Init the app
init();


/**
 * Read Directory and loop all files
 */
function init(){
    fs.readdir( readDir, function( err, files ) {

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
            fs.readFile(readDir+file,'utf8', processFile);
            });
        });
    });
}


/**
 * Save a particular datapoint to a particular dataSet
 */
function saveToFile( file, date, data){
 console.log(date, file)
}


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
 * Process and Format the file to fit into new structure
 * @param {obj} err
 * @param {string} content
 */
function processFile(err, content){
    var obj = formatData(content),
				date = obj[1],
				obj = obj[0];

	  // loop through type of weather data
		for(var item in obj){
			saveToFile(item, date, obj[item]);	// Save particular category with records
		}

  	// fs.appendFileSync(dataFile+''+dailyRecord[1]+'.'+outputFormat, dailyRecord[0]);
}



/**
 * Convert to JSON Format for easy access to data points
 * @param {string} csv
 * @return {array}
 */
function formatData(csv){
    var lines 		=	csv.split("\n"),
				date 			=	extractDate(lines[0]),
				headers 	=	lines[1].split(","),
				obj 			= {};

    // Loop lines (stations)
    for(var i = 2; i < lines.length-1; i++) {
        var currentline = lines[i].split(",");

        // Loop through data points within line (station)
        for( var j = 1; j<headers.length-1; j++ ){
            if( !obj[headers[j]] )
                obj[headers[j]] = new Array(currentline[j]);
            else
                obj[headers[j]].push(currentline[j])
        }
    }


    //return result; //JavaScript object
    return [obj, date]; // JSON, Time/Date
}
