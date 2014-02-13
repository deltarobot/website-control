<?php
    require 'commonUtils.php';

    $fileLs = shell_exec( 'ls -lt --time-style=long-iso ' . getUploadPath() );
    $files = explode( "\n", $fileLs );
    foreach( $files as $file ) {
        preg_match( "/(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}) (.*)/", $file, $matches );
        if( sizeof( $matches ) > 0 ) {
            echo '<tr>';
            foreach( array_slice( $matches, 1 ) as $match ) {
                echo '<td>' . $match . '</td>';
            }
            echo '<\tr>';
        }
    }
?>