<?php
    require 'commonUtils.php';

    function sendError( $message ) {
        echo '<span class="error">' . $message . ', firmware not flashed.</span>';
        exit();
    }

    if( ! array_key_exists( 'firmware', $_FILES ) ) {
        sendError( 'No file provided' );
    }

    $file = $_FILES['firmware'];
    $filename = basename( $file['name'] );
    $targetFile = getBootloadPath();

    if( $file['size'] > 1024 * 1024 ) {
        sendError( 'File larger than 1MB' );
    }

    $contents = "\xff" . file_get_contents( $file['tmp_name'] ) . 'q';
    if( $contents == false ) {
        sendError( "Couldn't open the file at " . $file['tmp_name'] );
    }

    if( file_put_contents(  getBootloadPath(), $contents ) != false ) {
        echo '<span class="success">' . $filename . ' is being flashed</span>';
    } else {
        sendError( "Couldn't write data to " . getBootloadPath() );
    }
?>