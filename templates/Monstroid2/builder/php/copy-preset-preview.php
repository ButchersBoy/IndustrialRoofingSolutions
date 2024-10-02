<?php

$uploadDir = 'elements/'; 
$result = array();

if (isset($_POST["url"]) && isset($_POST["dir"]) && !empty($_POST["url"])){
  $projectName = $_POST["dir"];
  $url = $_POST["url"];

  $projectUrl = "../" . $projectName;

  $info = pathinfo($url);

  $baseName = basename($url, '.'.$info['extension']);


  copy($projectUrl . $url, "../temp/" . $baseName . '.'. $info['extension']);
  rename("../temp/" . $baseName . '.' . $info['extension'], $projectUrl . $uploadDir . $baseName . "-copy" . '.' . $info['extension']);

  echo json_encode($uploadDir . $baseName . "-copy" . '.' . $info['extension']);
}

