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
        return osSpecific( '../uploads/bootload', '/home/cnc/serial-data' );
    }
?>
