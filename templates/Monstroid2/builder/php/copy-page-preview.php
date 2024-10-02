<?php

$uploadDir = 'novi/pages/';
$result = array();

if (isset($_POST["url"]) && isset($_POST["dir"]) && !empty($_POST["url"])){
  $projectName = $_POST["dir"];
  $url = $_POST["url"];

  if ($url == "null"){
    echo json_encode(null);
    exit();
  }

  $projectUrl = "../" . $projectName;

  if (!file_exists("../temp")){
    mkdir("../temp");
  }

  $path_info = pathinfo($url);
  $targetName = $path_info["filename"];
  $ext = "." . $path_info["extension"];

  copy($projectUrl . $url, "../temp/" . $targetName . $ext);
  rename("../temp/" . $targetName . $ext, $projectUrl . $uploadDir . $targetName . "-copy" . $ext);

  echo json_encode($uploadDir . $targetName . "-copy" . $ext);
}

