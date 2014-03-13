function runUpdate () {
    $( "#runFileList tbody").load( "/service/fileList.php?page=run", setupRunButtons );
}

function setupRunButtons () {
    $( ".run" ).click( function() {
        var fileName = $( this ).attr( "file" );
        var userConfirm = confirm( "Are you sure you want to run " + fileName + "?" );
        if( userConfirm ) {
            $( "#runStatus" ).load (
                "/service/run.php",
                {"file": fileName}
            );
        }
    });
}

function moveHead ( axis, direction ) {
    var movement = $( "#movement" ).val();
    if( direction == 'down' ) {
        movement = -movement;
    }
    $( "#homeStatus" ).load (
        "/service/run.php",
        {"axis": axis, "movement": movement}
    );
}

function setUserHome () {
    $( "#homeStatus" ).load (
        "/service/run.php",
        {"setUserHome": true}
    );
}

