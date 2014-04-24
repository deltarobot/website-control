<?php
    require 'commonUtils.php';

    function sendError( $message ) {
        echo '<span class="error">' . $message . ', microcontroller operation not performed.</span>';
        exit();
    }

    if( array_key_exists( 'restart', $_POST ) ) {
        writeToPipe( getBootloadPath(), "q", false );
        echo '<span class="success">Restarted the microcontroller</span>';
    } else if( array_key_exists( 'firmware', $_FILES ) ) {
        $file = $_FILES['firmware'];
        $filename = basename( $file['name'] );

        if( $file['size'] > 1024 * 1024 ) {
            sendError( 'File larger than 1MB' );
        }

        $contents = file_get_contents( $file['tmp_name'] );
        if( $contents == false ) {
            sendError( "Couldn't open the file at " . $file["tmp_name"] );
        }

        writeToPipe( getBootloadPath(), $contents, false );
        file_put_contents( getBootloadImagePath(), $contents );
        echo '<span class="success">' . $filename . ' is being flashed</span>';
    } else {
        sendError( 'Did not recognize command' );
    }
?>
