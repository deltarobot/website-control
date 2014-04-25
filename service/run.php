<?php
    require 'commonUtils.php';

    function sendError( $message ) {
        echo '<span class="error">' . $message . ', not executed.</span>';
        exit();
    }

    function writeToLcd( $message ) {
        writeToPipe( getGcodePipePath(), 'G101|' . $message . "\n", false );
    }

    if( array_key_exists( 'axis', $_POST ) && array_key_exists( 'movement', $_POST ) ) {
        $axis = $_POST['axis'];
        $movement = $_POST['movement'];
        if( !in_array( $axis, array( 'X', 'Y', 'Z', 'A' ) ) ) {
            sendError( 'Unknown axis, ' . $axis );
        }
        if( !is_numeric( $movement ) ) {
            sendError( 'Non-numeric movement, ' . $movement );
        }
        $command = $axis . $movement;
        writeToLcd( 'Manual Movement' );
        writeToPipe( getGcodePipePath(), 'G91' . $command, true );
    } elseif ( array_key_exists( 'rawGcode', $_POST ) ) {
        $gCode = $_POST['rawGcode'] . "\n";
        writeToPipe( getGcodePipePath(), $gCode, false );
    } elseif ( array_key_exists( 'setUserHome', $_POST ) ) {
        writeToPipe( getGcodePipePath(), 'G100', true );
    } elseif ( array_key_exists( 'homeMachine', $_POST ) ) {
        writeToLcd( '     Homing' );
        writeToPipe( getGcodePipePath(), 'G28', true );
        writeToLcd( '     Homing~    Complete' );
    } elseif ( array_key_exists( 'file', $_POST ) ) {
        $file = $_POST['file'];
        $filePath = getUploadPath() . $file;
        $contents = file_get_contents( $filePath );
        if( $contents == false ) {
            sendError( "Couldn't open the gcode at " . $filePath );
        }
        if( strlen( $file ) > 16 ) {
            $shortFileName = substr( $file, 0, 16 );
        } else {
            $shortFileName = $file;
        }
        writeToLcd( ' Running File:~' . $shortFileName );
        writeToPipe( getGcodePipePath(), $contents, false );
        echo '<span class="success">Issued ' . $file . ' for execution.<span>';
    } elseif ( array_key_exists( 'emergencyStop', $_POST ) ) {
        exec( "~/bin/emergencyStop > /dev/null &" );
        sleep( 1 );
        writeToLcd( ' Emergency Stop~     (O_o)' . $shortFileName );
        echo '<span class="success">Stopped the machine.<span>';
    } elseif ( array_key_exists( 'shutdown', $_POST ) ) {
        exec( "~/bin/shutdown > /dev/null &" );
        writeToLcd( '    Good-bye~ (-.-) ZZZzzz...' . $shortFileName );
        echo '<span class="success">Shutting down.<span>';
    } else {
        sendError( 'Did not recognize command' );
    }
?>
