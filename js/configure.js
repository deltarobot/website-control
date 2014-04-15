function firmwareUploadComplete ( data, textStatus, errorThrown ) {
    $( "#firmwareUploadStatus" ).html( constructResponse( data, textStatus, errorThrown ) );
}

function restartMicrocontroller () {
    $( "#restartStatus" ).load (
        '/service/bootload.php',
        {restart: true}
    );
}

function updateSettings() {
    var all_settings = $( "[name='setting']" );
    var all_labels = $( "[name='settinglabel']" );
    var full_settings = '';
    for( var k=0; k < all_settings.length; k++ ) {
        var setting = all_settings[k];
        var label = all_labels[k];

        if( setting.type != 'text' ) continue;
        if( setting.value != '' ) {
            var dir = label.innerHTML.trim().concat( setting.value.trim() );
            full_settings = full_settings.concat( dir ).concat( '\n' );
        }
    }

    $( "#machineSettingsStatus" ).load(
        '/service/config.php',
        {settings: full_settings}
    )
}

function getMachineSettings() {
    $.ajax({ url: '/service/configUpload.php',
            type: 'get',
            success: populateFields( settings )
      });
}

function populateFields( settings ) {
    var split_settings = current_settings.match(/\d*\.?\d+/g);
    var inputs = $("[name='setting'");
    for( var i = 0; i < split_settings.length; i++) {
        inputs[i].value = split_settings[i];
    }
}
