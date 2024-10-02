<?php

function deleteDir($dirPath) {
    if (! is_dir($dirPath)) {
        throw new InvalidArgumentException("$dirPath must be a directory");
    }
    if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
        $dirPath .= '/';
    }
    $files = glob($dirPath . '*', GLOB_MARK);
    foreach ($files as $file) {
        if (is_dir($file)) {
            deleteDir($file);
        } else {
            unlink($file);
        }
    }
    rmdir($dirPath);
}
if (isset($_POST["fonts"]) && isset($_POST["project"]) && isset($_POST["dir"]) ){
  $src = explode(',', $_POST["fonts"]);
  $projectname = $_POST["project"];
  $fontsdir = $_POST["dir"];
  $checkfile = "novi-icon-font.txt";

  $checkdir = "../" . $projectname . "/" . $fontsdir;
  for ($i = 0; $i<count($src); $i++) {
      if (file_exists($checkdir . $src[$i])){
          if (file_exists($checkdir . $src[$i] . "/novi-icon-font.txt")){
             deleteDir($checkdir . $src[$i]);
          }
      }
  }
}