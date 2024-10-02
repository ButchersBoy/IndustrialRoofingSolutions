<?php
include_once("media-utils.php");

function base64_to_jpeg($base64_string, $output_file) {

 $decoded = base64_decode($base64_string);

 $ifp = fopen($output_file, "wb");

 $data = explode(',', $decoded);

 fwrite($ifp, base64_decode($data[1]));
 fclose($ifp);

 return $output_file;
}


if (isset($_POST["previews"]) && isset($_POST["dir"])){
  $previews = json_decode($_POST["previews"], true);
  $projectDir = "../" . $_POST["dir"];
  $mediaDir = $projectDir . "novi/media/";
  $thumbsDir = $projectDir . "novi/media/thumbnails/";
  $result = array();

  if (!file_exists($mediaDir)){
    mkdir($mediaDir, 0777, true);
  }

  if (!file_exists($thumbsDir)){
    mkdir($thumbsDir, 0777, true);
  }
  foreach ($previews as $value){

    base64_to_jpeg($value["imageString"], $thumbsDir . $value["name"] . "-novi-video.jpg");

    $thumb = resizeImage($thumbsDir . $value["name"] .  "-novi-video.jpg", 220, 230);
    imagejpeg($thumb, $thumbsDir . $value["name"] . "-novi-video.jpg");
    imagedestroy($thumb);

    $item = $value["item"];
    $item["thumbnail"] = $_POST["dir"] . "novi/media/thumbnails/" . $value["name"] . "-novi-video.jpg";
    array_push($result, $item);
  }


 echo json_encode($result);
}