var fs = require('fs');

// Path Definition
var readDir = './orgData/';
var dataFile = './cleanData/';
var outputFormat = 'json';
var dataSet = {};

// Init the app
init();


/**
 * Read Directory and loop all files
 */
function init(){
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
            fs.readFile(readDir+file,'utf8', addToDataset);
            });
        });
    });
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
 * Formating the file to fit into the new textfile
 * @param {obj} err 
 * @param {string} content 
 */
function addToDataset(err, content){
    // do Formating
    var dailyRecord = formatData(content);
    for( var i = 0; i<dailyRecord[0].length; i++ ){
        if( !dataSet[dailyRecord[0][i]] ){
            console.log( dailyRecord[0][i] )
           // dataSet[dailyRecord[0][i]] = new Array();
        }else{  
             console.log( dailyRecord[0][i] ) 
            //dataSet[dailyRecord[0][i]]
        }
    } 
    console.log( dailyRecord )
    //fs.appendFileSync(dataFile+''+dailyRecord[1]+'.'+outputFormat, dailyRecord[0]);    
}


/**
 * Convert to JSON Format for easy access to data points
 * @param {string} csv 
 * @return {array}
 */
function formatData(csv){
    var lines = csv.split("\n");
    var date =  extractDate(lines[0]);
    var headers = lines[1].split(",");

    // define base of line object
    /*for(var h = 0; h<headers.length; h++){
        result[headers[h]] = {}
    }*/
   
    var obj = {};
    
    // Loop lines (stations)
    for(var i = 2; i < lines.length; i++) {
        var currentline = lines[i].split(",");
        
        // Loop through data points within line (station)
        for( var j = 1; j<headers.length; j++ ){
            if( !obj[headers[j]] )
                obj[headers[j]] = new Array(currentline[j]);
            else
                obj[headers[j]].push(currentline[j])
        }
    }

    //return result; //JavaScript object
    return [obj, date]; // JSON, Time/Date 
}