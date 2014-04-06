<?php
$my_file = '/home/http/config.properties';
$handle = fopen($my_file, 'r') or die('Cannot open file:  '.$my_file);
echo file_get_contents($my_file);
?>

