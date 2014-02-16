<?php
    require 'commonUtils.php';

    $sourcePage = $_GET["page"];
    if( strcmp( $sourcePage, "upload" ) == 0 ) {
        $buttonClass = "delete";
    } elseif( strcmp( $sourcePage, "run" ) == 0 ) {
        $buttonClass = "run";
    } else {
        $buttonClass = "unknown";
    }

    $fileLs = shell_exec( 'ls -lt --time-style=long-iso ' . getUploadPath() );
    $files = explode( "\n", $fileLs );
    foreach( $files as $file ) {
        preg_match( "/(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}) (.*)/", $file, $matches );
        if( sizeof( $matches ) > 0 ) {
            echo '<tr>';
            foreach( array_slice( $matches, 1 ) as $match ) {
                echo '<td>' . $match . '</td>';
            }
            echo '<td><input type="submit" value="" class=' . $buttonClass . ' file="' . $matches[3] . '"/></td>';
            echo '<\tr>';
        }
    }
?>