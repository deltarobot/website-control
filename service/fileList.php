<?php
    require 'commonUtils.php';
    $uploadPath = getUploadPath();

    $output = shell_exec( "ls -lt --time-style=long-iso $uploadPath" );
    echo "<pre>$output</pre>";
?>