<?php
function recurse_copy($src,$dst) {
    $dir = opendir($src);
    @mkdir($dst);
    while(false !== ( $file = readdir($dir)) ) {
        if (( $file != '.' ) && ( $file != '..' )) {
            if ( is_dir($src . '/' . $file) ) {
                recurse_copy($src . '/' . $file,$dst . '/' . $file);
            }
            else {
                copy($src . '/' . $file,$dst . '/' . $file);
            }
        }
    }
    closedir($dir);
}

if (isset($_POST["source"]) && isset($_POST["project"]) && isset($_POST["destination"]) ){
  $src = $_POST["source"];
  $fileName = $_POST["file"];
  $destination = $_POST["destination"];
  $projectName = $_POST["project"];
  $fontName = basename ($src);
  if ($src == "null"){
    echo json_encode(null);
    exit();
  }

  $projectUrl = "../" . $projectName;
  $targetDir = $projectUrl . $destination . $fontName . "/";


  if (!file_exists($targetDir)){
    mkdir($targetDir, 0777, true);
  }

  recurse_copy("../" . $src, $targetDir);

  echo $destination . $fontName . "/" . $fileName;
}
