<?php
    require 'commonUtils.php';

    $output = shell_exec( 'ls -lt --time-style=long-iso ' . getUploadPath() );
    echo "<pre>$output</pre>";
?>