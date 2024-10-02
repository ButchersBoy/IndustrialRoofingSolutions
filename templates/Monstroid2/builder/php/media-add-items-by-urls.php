<?php
ob_start(null, 0, PHP_OUTPUT_HANDLER_CLEANABLE);
include_once("media-utils.php");
if (isset($_POST["urls"]) && isset($_POST["dir"])){

  $projectDir = "../" . $_POST["dir"];
  $mediaDir = $projectDir . "novi/media/";
  $thumbsDir = $_POST["dir"] . "novi/media/thumbnails/";
  $urls = json_decode($_POST["urls"]);

  $extensions = array("jpeg", "jpg", "png", "gif");

  if (!file_exists($mediaDir)){
    mkdir($mediaDir, 0777, true);
  }

  if (!file_exists("../" . $thumbsDir)){
    mkdir("../" . $thumbsDir, 0777, true);
  }

  $files = array();

  foreach ($urls as $url) {
    $name = "unsplash-photo.jpg";
    $pathInfo = pathinfo($name);
    $ext = $pathInfo["extension"];
    $baseName = $pathInfo["filename"];

    $checkName = $name;
    $counter = 0;

    while (file_exists($mediaDir . $checkName)){
      $counter++;
      $checkName = $baseName . "-" . $counter . "." . $ext;
    }

    if (in_array($ext, $extensions)){
      file_put_contents($mediaDir . $checkName, fopen($url, 'r'));
      array_push($files, $checkName);
    }
  }

  $items = array();
  foreach ($files as $filename) {
    $ext = pathinfo($filename, PATHINFO_EXTENSION );
    $size = getimagesize($mediaDir . $filename);
    $item = array(
        "original" => $filename,
        "width" => $size[0],
        "height" => $size[1]
    );

    if (in_array($ext, $extensions)){
        $item["type"] = "image";
        if (createThumbnail($mediaDir . $filename, "../" . $thumbsDir . $filename)) {
          $item["thumbnail"] = $thumbsDir . $filename;
        } else {
          $item["thumbnail"] = $mediaDir . $filename;
        }
    }

    array_push($items, $item);
  }

  ob_clean();

  echo json_encode($items);
}

