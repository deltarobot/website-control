<?php
    require 'commonUtils.php';

    function sendError( $message ) {
        echo '<span class="error">' . $message . ', not executed.</span>';
        exit();
    }

    if( array_key_exists( 'axis', $_POST ) && array_key_exists( 'movement', $_POST ) ) {
        $command = $_POST['axis'] . $_POST['movement'];
        $handle = popen( getGcodePipePath(), 'w' ) or die('Cannot open file:  '.$my_file);
        if( $handle == false ) {
            sendError( "Couldn't open the gcode pipe at " . getGcodePipePath() );
        }

        fwrite( $handle, $command . "\n" );
        pclose( $handle );
        echo '<span class="success">Issued ' . $command . ' command.</span>';
    } else {
        sendError( 'Did not recognize command' );
    }
?>
