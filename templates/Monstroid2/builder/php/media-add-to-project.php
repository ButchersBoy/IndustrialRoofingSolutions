<?php
if (isset($_POST["dir"]) && isset($_POST["fileName"]) && isset($_POST["destination"])) {
    $projectDir  = "../" . $_POST["dir"];
    $filename = $_POST["fileName"];
    $destination = $_POST["destination"];

    $filePath = $projectDir . "novi/media/" . $filename;
    if (!file_exists($filePath)){
      echo -1;
      exit();
    }

    if (!file_exists($projectDir . $destination)) {
        mkdir($projectDir . $destination, 0777, true);
    }

    $filePath = $projectDir . "novi/media/" . $filename;
    $destFile = $projectDir . $destination . $filename;

    $counter = 0;
    $pathInfo = pathinfo($filename);
    $ext = $pathInfo["extension"];
    $baseName = $pathInfo["filename"];
    $checkName = $filename;
    while (file_exists($projectDir . $destination . $checkName)){
      $counter++;
      $checkName = $baseName . "-" . $counter . "." . $ext;
    }

    copy($filePath, $projectDir . $destination . $checkName);

    echo $destination . $checkName;
}