<?php
ob_start(null, 0, PHP_OUTPUT_HANDLER_CLEANABLE);
include_once("media-utils.php");
if (isset($_FILES) && !empty($_FILES) && isset($_POST["dir"])){

    foreach ($_FILES["files"]["tmp_name"] as $key => $tmp_name) {
        $mimetype = mime_content_type($tmp_name);
        if(!in_array($mimetype, array('image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm', 'video/avi', 'video/ogg'))) {
            http_response_code("406");
            echo "The wrong file format is selected. Only . jpg, .png, .gif, .webm, .avi, ogg formats are supported.";
            exit();
        }
    }

  $projectDir = "../" . $_POST["dir"];
  $mediaDir = $projectDir . "novi/media/";
  $thumbsDir = $_POST["dir"] . "novi/media/thumbnails/";

  $extensions = array("jpeg", "jpg", "png", "gif");
  $video_extensions = array("mp4", "webm", "avi", "ogg");

  if (!file_exists($mediaDir)){
    mkdir($mediaDir, 0777, true);
  }

  if (!file_exists("../" . $thumbsDir)){
    mkdir("../" . $thumbsDir, 0777, true);
  }

  $files = array();

  foreach ($_FILES["files"]["error"] as $key => $error) {
    if ($error == UPLOAD_ERR_OK) {
      $name = transliterateString($_FILES["files"]["name"][$key]);
      $name = mb_convert_case($name, MB_CASE_LOWER, "UTF-8");
      $name = preg_replace("/\s+/", "-", $name);
      $pathInfo = pathinfo($name );
      $ext = $pathInfo["extension"];
      $baseName = $pathInfo["filename"];

      $checkName = $name;
      $counter = 0;

      while (file_exists($mediaDir . $checkName)){
        $counter++;
        $checkName = $baseName . "-" . $counter . "." . $ext;
      }

      if (in_array($ext, $extensions) || in_array($ext, $video_extensions) ){

        move_uploaded_file( $_FILES["files"]["tmp_name"][$key], $mediaDir . $checkName);
        array_push($files, $checkName);
      }
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
        createThumbnail($mediaDir . $filename, "../" . $thumbsDir . $filename);
        $item["thumbnail"] = $thumbsDir . $filename;

    }else if (in_array($ext, $video_extensions)){
        $item["type"] = "video";
        $item["thumbnail"] = "isLoading";
    }

    array_push($items, $item);
  }

  ob_clean();

  echo json_encode($items);
}

