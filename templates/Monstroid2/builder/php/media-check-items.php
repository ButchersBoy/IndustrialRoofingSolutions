<?php
include_once("media-utils.php");

if (isset($_POST["dir"]) && isset($_POST["items"])){
  $projectDir = "../" . $_POST["dir"];
  $items = json_decode($_POST["items"], true);
  $mediaDir = $projectDir . "novi/media/";
  $thumbsDir = $projectDir . "novi/media/thumbnails/";
  $extensions = array("jpeg", "jpg", "png", "gif");
  $video_extensions = array("mp4", "webm", "avi", "ogg");
  $video_previews = array();
  $itemsToRemove = array();
  $videosWithoutPreview = array();
  $itemsDimensions = array();

  if (!file_exists($mediaDir)){
    mkdir($mediaDir, 0777, true);
  }

  if (!file_exists($thumbsDir)){
    mkdir($thumbsDir, 0777, true);
  }

    $files = scandir($mediaDir);
    $thumbnails = scandir($thumbsDir);

  foreach ($items as $item){
    if (!file_exists($mediaDir . $item["original"])){
        array_push($itemsToRemove, $item["id"]);
        continue;
    }else{
        $size = getimagesize($mediaDir . $item["original"]);
        array_push($itemsDimensions, array("width" => $size[0], "height" => $size[1], "id" => $item["id"]));
        if (($key = array_search($item["original"], $files)) !== false) {
            unset($files[$key]);
        }
    }

    if (!file_exists("../" . $item["thumbnail"])){
        if ($item["type"] === "image"){
            createThumbnail($mediaDir . $item["original"], "../" . $item["thumbnail"]);
        }else{
            array_push($videosWithoutPreview, $item["id"]);
        }
    }else{
        if (($key = array_search(basename("../" . $item["thumbnail"]), $thumbnails)) !== false) {
                unset($thumbnails[$key]);
        }
    }
  }

   foreach ($files as $key => $value) {
      if (!in_array($value,array(".", "..", "thumbnails"))) {
          unlink($mediaDir . $value);
      }
   }

   foreach ($thumbnails as $key => $value) {
      if (!in_array($value,array(".", ".."))) {
          unlink($thumbsDir . $value);
      }
   }


  echo json_encode(
      array(
      "itemsToRemove" => $itemsToRemove,
      "videosWithoutPreview" => $videosWithoutPreview,
      "itemsDimensions" => $itemsDimensions
      )
  );
}