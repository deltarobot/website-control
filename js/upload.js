function uploadUpdate() {
    $( "#fileList tbody").load( "/service/fileList.php" );
}

function uploadComplete ( data, textStatus, errorThrown ) {
    var uploadResponse;
    if( textStatus == "success" ) {
        uploadResponse = data;
    } else {
        uploadResponse = textStatus + ": " + errorThrown;
    }
    $( "#uploadStatus" ).html( uploadResponse );
    uploadUpdate();
}
