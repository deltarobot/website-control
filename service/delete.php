<?php
    require 'commonUtils.php';

    if( strcmp( $_SERVER['REQUEST_METHOD'], "DELETE" ) == 0 ) {
        parse_str( file_get_contents( 'php://input' ) );
        $fileLs = shell_exec( 'ls ' . getUploadPath() );
        if( strpos( $fileLs, $file ) !== false ) {
            shell_exec( "rm '" . getUploadPath() . $file . "'" );
        } else {
            header("HTTP/1.1 406 " . $file . " is not a valid file." );
        }
    }
?>
