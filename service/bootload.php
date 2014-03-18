<?php
    require 'commonUtils.php';

    function sendError( $message ) {
        echo '<span class="error">' . $message . ', microcontroller operation not performed.</span>';
        exit();
    }

    if( array_key_exists( 'restart', $_POST ) ) {
        if( writeToPipe(  getBootloadPath(), "\xff", false ) != false ) {
            echo '<span class="success">Restarted the microcontroller</span>';
        } else {
            sendError( "Couldn't write data to " . getBootloadPath() );
        }
    } else if( array_key_exists( 'firmware', $_FILES ) ) {
        $file = $_FILES['firmware'];
        $filename = basename( $file['name'] );
        $targetFile = getBootloadPath();

        if( $file['size'] > 1024 * 1024 ) {
            sendError( 'File larger than 1MB' );
        }

        $contents = "\xff" . file_get_contents( $file['tmp_name'] ) . 'q';
        if( $contents == false ) {
            sendError( "Couldn't open the file at " . $file["tmp_name"] );
        }

        if( writeToPipe(  getBootloadPath(), $contents, false ) != false ) {
            echo '<span class="success">' . $filename . ' is being flashed</span>';
        } else {
            sendError( "Couldn't write data to " . getBootloadPath() );
        }
    } else {
        sendError( 'Did not recognize command' );
    }
?>