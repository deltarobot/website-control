<?php
    require 'commonUtils.php';

    function sendError( $message ) {
        echo '<span class="error">' . $message . ', settings not updated.</span>';
        exit();
    }

    if( array_key_exists( 'settings', $_POST ) ) {
        $settings = $_POST["settings"];
        $my_file = getConfigPath();
        $handle = fopen( $my_file, 'w' );
        if( $handle == false ) {
            sendError( "Couldn't open the pipe at " . $pipe );
        }
        fwrite( $handle, $settings );
        fclose( $handle );
        echo '<span class="success">Settings updated.</span>';
    } else {
        sendError( 'Did not recognize command' );
    }
?>

