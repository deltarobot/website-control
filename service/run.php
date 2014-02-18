<?php
    require 'commonUtils.php';

    function sendError( $message ) {
        echo '<span class="error">' . $message . ', not executed.</span>';
        exit();
    }

    function writeToPipe( $command ) {
        $handle = popen( getGcodePipePath(), 'w' );
        if( $handle == false ) {
            sendError( "Couldn't open the gcode pipe at " . getGcodePipePath() );
        }

        if( fwrite( $handle, $command . "\n" ) === false ) {
            sendError( 'Could not write to file' );
        }
        pclose( $handle );

        echo '<span class="success">Issued ' . $command . ' command.</span>';
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
        writeToPipe( 'G91' . $command );
    } elseif ( array_key_exists( 'setUserHome', $_POST ) ) {
        writeToPipe( 'G100' );
    } else {
        sendError( 'Did not recognize command' );
    }
?>
