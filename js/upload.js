function uploadUpdate() {
    $( "#fileList" ).load( "/service/fileList.php" );
}

function uploadComplete ( data, textStatus, errorThrown ) {
    var uplaodResponse;
    if( textStatus == "success" ) {
        uploadResponse = data;
    } else {
        uploadResponse = textStatus + ": " + errorThrown;
    }
    $( "#uploadStatus" ).html( uploadResponse );
    uploadUpdate();
}
