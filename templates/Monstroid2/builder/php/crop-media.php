<?php
include_once("media-utils.php");

if (!isset($_POST["data"]) || !isset($_POST["dir"])){
    echo(2);
    exit();
}

$data = json_decode($_POST["data"], true);
$copy_original = $data["copyOriginalImage"];
$url = $data["src"];
$width = $data["width"];
$height = $data["height"];
$resize = $_POST["resize"];
$img_width = $data["imgWidth"];
$img_height = $data["imgHeight"];
$path_to_img = "../" . $url;
$dir = "../" . $_POST["dir"];
$mediaDir = $dir . "novi/media/";
$thumbsDir = $dir . "novi/media/thumbnails/";


ini_set('display_errors', false);

error_reporting(-1);

register_shutdown_function(function(){
    $error = error_get_last();
    if(null !== $error && $error["type"] == 1){
        echo "Server memory limit is not enough to processing this image. Please change your server settings or contact your administrator";
    }
});


if (isset($url) && !empty($url)){

	if ($width == $img_width && $height == $img_height) {
		exit();
	}

    $baseName = basename($url);
    $path_info = pathinfo($baseName);
    $ext = "." . $path_info["extension"];

    if ($copy_original){
        if ($resize === "true"){
            $baseName = $path_info["filename"] .  "-r-" . $width . "x" . $height;
        }
        else{
            $baseName = $path_info["filename"] .  "-" . $width . "x" . $height;
        }

        $counter = 0;

        while(file_exists($mediaDir . $baseName . $ext)){
            $counter++;
            $baseName = $baseName . '-' . $counter;
        }

        $baseName = $baseName . $ext;

        $path_to_new_img = $mediaDir . $baseName;
        copy($path_to_img, $path_to_new_img);
        $path_to_img = $path_to_new_img;
    }

	switch ($ext) {
	    case ".png":
	        $im = imagecreatefrompng($path_to_img);
	        break;
	    case ".jpeg":
	        $im = imagecreatefromjpeg($path_to_img);
	        break;
	    case ".jpg":
	    	$im = imagecreatefromjpeg($path_to_img);
	    	break;
	    case ".gif":
	        $im = imagecreatefromgif($path_to_img);
	        break;
	}

	$im2 = imagecreatetruecolor($width, $height);

    if ($ext == ".png" || $ext == ".gif"){
        imagealphablending($im2, false);
        imagesavealpha($im2, true);
    }

    if ($resize === "true"){
        imagecopyresampled($im2, $im, 0, 0, 0, 0, $width, $height, $img_width, $img_height);
    }
    else {
        imagecopyresampled($im2, $im, 0, 0, $data["x"], $data["y"], $width, $height, $width, $height);
    }


	imagedestroy($im);
	if ($im2 !== FALSE) {
		switch ($ext) {
		case ".png":
		    imagepng($im2, $path_to_img);
		    imagedestroy($im2);
		    break;
		case ".jpeg":
		    imagejpeg($im2, $path_to_img);
		    imagedestroy($im2);
		    break;
		case ".jpg":
			imagejpeg($im2, $path_to_img);
			imagedestroy($im2);
			break;
		case ".gif":
		    imagegif($im2, $path_to_img);
		    imagedestroy($im2);
		    break;
		}

		if ($copy_original || (!$copy_original && $resize !== "true")){
		    createThumbnail($path_to_img, $thumbsDir . $baseName);
		}
	}
}

echo json_encode(array("copyOriginal" => $copy_original, "pathToImg" => $baseName, "pathToThumb" => $_POST["dir"] . "novi/media/thumbnails/" . $baseName, "width"=>$width, "height"=>$height));