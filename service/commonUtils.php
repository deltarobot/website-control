<?php
    function getUploadPath() {
        if (strncasecmp(PHP_OS, 'WIN', 3) == 0) {
            return '../uploads/';
        } else {
            return '/home/http/uploads/';
        }
    }
?>
