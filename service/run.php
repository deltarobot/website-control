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
        $command = $_POST['axis'] . $_POST['movement'];
        writeToPipe( 'G91' . $command );
    } elseif ( array_key_exists( 'setUserHome', $_POST ) ) {
        writeToPipe( 'G100' );
    } else {
        sendError( 'Did not recognize command' );
    }
?>
