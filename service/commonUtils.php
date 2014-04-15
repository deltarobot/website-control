<?php
    function osSpecific( $windowsReturn, $linuxReturn ) {
        if (strncasecmp(PHP_OS, 'WIN', 3) == 0) {
            return $windowsReturn;
        } else {
            return $linuxReturn;
        }
    }

    function getUploadPath() {
        return osSpecific( '../uploads/', '/home/http/uploads/' );
    }

    function getGcodePipePath() {
        return osSpecific( '../uploads/gcode', '/home/cnc/gcode' );
    }

    function getBootloadPath() {
        return osSpecific( '../uploads/bootload', '/home/cnc/bootload' );
    }

    function getConfigPath() {
        return osSpecific( '../uploads/config.properties', '/home/cnc/config.properties' );
    }

    function writeToPipe( $pipe, $data, $echoSuccess ) {
        $handle = fopen( $pipe, 'w' );
        if( $handle == false ) {
            sendError( "Couldn't open the pipe at " . $pipe );
        }

        if( fwrite( $handle, $data . "\n" ) === false ) {
            sendError( 'Could not write to file' );
        }
        fclose( $handle );

        if( $echoSuccess ) {
            echo '<span class="success">Issued ' . $data . ' command.</span>';
        }
    }
?>
