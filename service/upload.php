<?php
    require 'commonUtils.php';
    function sendError( $message ) {
        echo '<span class="error">' . $message . ', not uploaded.</span>';
        exit();
    }

    if( ! array_key_exists( 'gcode', $_FILES ) ) {
        sendError( 'No file provided' );
    }

    $file = $_FILES['gcode'];
    $filename = basename( $file['name'] );
    $targetFile = getUploadPath() . $filename;

    if( $file['size'] > 1024 * 1024 ) {
        sendError( 'File larger than 1MB' );
    }

    if( move_uploaded_file( $file['tmp_name'], $targetFile ) ) {
        echo '<span class="success">' . $filename . ' has been uploaded</span>';
    } else {
        sendError( 'Could not upload file' );
    }
?>
