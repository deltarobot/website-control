function runUpdate () {
    loadResponse( '#runFileList tbody', '/service/fileList.php?page=run', null, setupRunButtons, true );
}

function setupRunButtons () {
    $( ".run" ).click( function() {
        var fileName = $( this ).attr( "file" );
        var userConfirm = confirm( "Are you sure you want to run " + fileName + "?" );
        if( userConfirm ) {
            loadResponse( '#runStatus', '/service/run.php', {'file': fileName} );
        }
    });
}

function moveHead ( axis, direction ) {
    var movement = $( "#movement" ).val();
    if( direction == 'down' ) {
        movement = -movement;
    }
    loadResponse( '#homeStatus', '/service/run.php', {'axis': axis, 'movement': movement} );
}

function setUserHome () {
    setLeapToZero();
    moveToZero();
    loadResponse( '#homeStatus', '/service/run.php', {'setUserHome': true} );
}

function homeMachine () {
    setLeapToZero();
    moveToZero();
    loadResponse( '#homeStatus', '/service/run.php', {'homeMachine': true} );
}

function sendRawGcode () {
    loadResponse( '#rawGcodeStatus', '/service/run.php', {'rawGcode': $( '#rawGcode' ).val().trim()} );
}
