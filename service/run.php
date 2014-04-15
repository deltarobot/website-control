<?php
    require 'commonUtils.php';

    function sendError( $message ) {
        echo '<span class="error">' . $message . ', not executed.</span>';
        exit();
    }

    if( array_key_exists( 'axis', $_POST ) && array_key_exists( 'movement', $_POST ) ) {
        $axis = $_POST['axis'];
        $movement = $_POST['movement'];
        if( !in_array( $axis, array( 'X', 'Y', 'Z' ) ) ) {
            sendError( 'Unknown axis, ' . $axis );
        }
        if( !is_numeric( $movement ) ) {
            sendError( 'Non-numeric movement, ' . $movement );
        }
        $command = $axis . $movement;
        writeToPipe( getGcodePipePath(), 'G91' . $command, true );
    } elseif ( array_key_exists( 'setUserHome', $_POST ) ) {
        writeToPipe( getGcodePipePath(), 'G100', true );
    } elseif ( array_key_exists( 'homeMachine', $_POST ) ) {
        writeToPipe( getGcodePipePath(), 'G28', true );
    } elseif ( array_key_exists( 'file', $_POST ) ) {
        $file = $_POST['file'];
        $filePath = getUploadPath() . $file;
        $contents = file_get_contents( $filePath );
        if( $contents == false ) {
            sendError( "Couldn't open the gcode at " . $filePath );
        }
        writeToPipe( getGcodePipePath(), $contents, false );
        echo '<span class="success">Issued ' . $file . ' for execution.<span>';
    } else {
        sendError( 'Did not recognize command' );
    }
?>
