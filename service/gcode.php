<?php
    $output = shell_exec( 'ls -l --time-style=long-iso ../upload' );
    echo "<pre>$output</pre>";
?>