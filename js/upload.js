function uploadUpdate () {
    $( "#uploadFileList tbody").load( "/service/fileList.php?page=upload", setupDeleteButtons );
}

function setupDeleteButtons () {
    $( ".delete" ).click( function() {
        var fileName = $( this ).attr( "file" );
        var userConfirm = confirm( "Are you sure you want to delete " + fileName + "?" );
        if( userConfirm ) {
            $.ajax( {
                url: '/service/delete.php',
                type: 'DELETE',
                data: 'file=' + fileName
            }).always( function( data, textStatus, errorThrown ) {
                if( textStatus != "success" ) {
                    alert( "Error occurred while deleting: " + constructResponse( data, textStatus, errorThrown ) );
                }
                uploadUpdate();
            });
        }
    });
}

function uploadComplete ( data, textStatus, errorThrown ) {
    $( "#uploadStatus" ).html( constructResponse( data, textStatus, errorThrown ) );
    uploadUpdate();
}

