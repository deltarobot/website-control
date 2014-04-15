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
    $.ajax({ url: '/service/config.php',
            success: function( settings ) {
                splitSettings = settings.split( '\n' );
                $.each( splitSettings, function ( i ) {
                    lineSplit = splitSettings[i].split( '=' );
                    key = lineSplit[0].replace( /\./g, '\\.' );
                    value = lineSplit[1];
                    $( "#" + key ).val( value );
                });
            }
    });
}
