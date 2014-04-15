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
    var allSettings = '';
    $( ".machineSetting" ).each( function () {
        var value = $( this ).val().trim();
        if( value != '' ) {
            var property = $( this ).attr( 'id' );
            allSettings = allSettings + property + '=' + value + '\n';
        }
    });

    $( "#machineSettingsStatus" ).load(
        '/service/config.php',
        {settings: allSettings}
    )
}

function getMachineSettings() {
    $.ajax({ url: '/service/configUpload.php',
            type: 'get',
            success: function( settings ) {
                populateFields( settings )
            }
      });
}

function populateFields( settings ) {
    var split_settings = settings.match(/\d*\.?\d+/g);
    var inputs = $("[name='setting'");
    for( var i = 0; i < split_settings.length; i++) {
        inputs[i].value = split_settings[i];
    }
}
