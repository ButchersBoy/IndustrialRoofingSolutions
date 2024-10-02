<?php
$path = $_POST["path"];
$src = "../" . $path . ".novi/";
$dst = "../" . $path . "novi/";
if (file_exists($src)){
    echo rename($src, $dst);
}
else echo true;