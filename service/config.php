<?php
$dir = $_POST["dir"];
$my_file = 'C:\Users\student\Desktop\pi-website\pi-website\http\php\config.txt';
$pattern='/(.*)\s{3,}/U';
preg_match_all($pattern,$dir,$matches);
//echo "$matches[0]";
$handle = fopen($my_file, 'w') or die('Cannot open file:  '.$my_file);
//fwrite($handle, $dir);
foreach ($matches[1] as $settings)
{
        fwrite($handle, $settings."\n");

}
?>
