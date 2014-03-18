function firmwareUploadComplete ( data, textStatus, errorThrown ) {
    $( "#firmwareUploadStatus" ).html( constructResponse( data, textStatus, errorThrown ) );
    uploadUpdate();
}

function restartMicrocontroller () {
    $( "#restartStatus" ).load (
        "/service/bootload.php",
        {"restart": true}
    );
}
