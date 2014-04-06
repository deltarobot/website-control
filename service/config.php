<?php
$dir = $_POST["dir"];
$my_file = '/home/http/config.properties';
$pattern='/(.*)\s{3,}/U';
preg_match_all($pattern,$dir,$matches);
$handle = fopen($my_file, 'w') or die('Cannot open file:  '.$my_file);
foreach ($matches[1] as $settings)
{
            fwrite($handle, $settings."\n");

}
?>

