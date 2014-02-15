function runUpdate () {
    $( "#runFileList tbody").load( "/service/fileList.php?page=run", setupRunButtons );
}

function setupRunButtons () {
    $( ".run" ).click( function() {
        var fileName = $( this ).attr( "file" );
        var userConfirm = confirm( "Are you sure you want to run " + fileName + "?" );
        if( userConfirm ) {
            $.ajax( {
                url: '/service/run.php',
                type: 'POST',
                data: 'file=' + fileName
            }).always( function( data, textStatus, errorThrown ) {
                if( textStatus != "success" ) {
                    alert( "Error occurred while running: " + constructResponse( data, textStatus, errorThrown ) );
                }
            });
        }
    });
}
