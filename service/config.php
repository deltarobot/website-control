<?php
    require 'commonUtils.php';

    function sendError( $message ) {
        echo '<span class="error">' . $message . ', settings not updated.</span>';
        exit();
    }

    $configPath = getConfigPath();
    if( array_key_exists( 'settings', $_POST ) ) {
        $settings = $_POST["settings"];
        $handle = fopen( $configPath, 'w' );
        if( $handle == false ) {
            sendError( "Couldn't open the file at " . $configPath );
        }
        fwrite( $handle, $settings );
        fclose( $handle );
        exec( "~/bin/restartGCode" );
        echo '<span class="success">Settings updated.</span>';
    } else {
        $handle = fopen( $configPath, 'r' );
        if( $handle == false ) {
            sendError( "Couldn't open the file at " . $configPath );
        }
        echo file_get_contents( $configPath );
        fclose( $handle );
    }
?>

