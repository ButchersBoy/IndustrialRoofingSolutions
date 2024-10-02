<?php
if (!isset($_POST["data"]) || !isset($_POST["destination"]) || !isset($_POST["dir"])){
    exit();
}

$data = json_decode($_POST["data"], true);
$url = $data["src"];
$width = $data["width"];
$height = $data["height"];
$x = $data["x"];
$y = $data["y"];
$pathToImg = "../" . $url;
$dir = "../" . $_POST["dir"];
$targetDir = $dir . $_POST["destination"];


ini_set('display_errors', false);

error_reporting(-1);

register_shutdown_function(function(){
    $error = error_get_last();
    if(null !== $error && $error["type"] == 1)
    {
        echo "Server memory limit is not enough to processing this image. Please change your server settings or contact your administrator";
    }
});


if (isset($url) && !empty($url)){
	$baseName = basename($url);
	$path_info = pathinfo($baseName);
	$ext = "." . $path_info["extension"];
	$formattedName = preg_replace("/\s+/", "-", mb_convert_case($path_info["filename"], MB_CASE_LOWER, "UTF-8"));
	$filenameWithoutExt = $formattedName . "-" . $width . "x" . $height;
	$filename = $filenameWithoutExt . $ext;

	switch ($ext) {
	    case ".png":
	        $im = imagecreatefrompng($pathToImg);
	        break;
	    case ".jpeg":
	        $im = imagecreatefromjpeg($pathToImg);
	        break;
	    case ".jpg":
	    	$im = imagecreatefromjpeg($pathToImg);
	    	break;
	    case ".gif":
	        $im = imagecreatefromgif($pathToImg);
	        break;
	}

	$im2 = imagecreatetruecolor($width, $height);
	if ($ext == ".png" || $ext == ".gif"){
        imagealphablending($im2, false);
        imagesavealpha($im2, true);
	}

	imagecopyresampled($im2, $im, 0, 0, $x, $y, $width, $height, $width, $height); 
	
	imagedestroy($im);

	if ($im2 !== FALSE) {
	    $tmpdir = "../temp/";
	    if (!file_exists($tmpdir)){
	        mkdir($tmpdir, 0777);
	    }
		switch ($ext) {
		case ".png":
		    imagepng($im2, $tmpdir . $filename);
		    imagedestroy($im2);
		    break;
		case ".jpeg":
		    imagejpeg($im2, $tmpdir . $filename);
		    imagedestroy($im2);
		    break;
		case ".jpg":
			imagejpeg($im2, $tmpdir . $filename);
			imagedestroy($im2);
			break;
		case ".gif":
		    imagegif($im2, $tmpdir . $filename);
		    imagedestroy($im2);
		    break;
		}
		if (file_exists($targetDir . $filename)){
		    if (filesize($targetDir . $filename) !== filesize($tmpdir . $filename)){
		        $counter = 0;
		        $checkName = $filenameWithoutExt;
                while(file_exists($targetDir . $checkName . $ext)){
                    $counter++;
                    $checkName = $filenameWithoutExt . '-' . $counter;
                }
                rename($tmpdir . $filename, $targetDir . $checkName . $ext);
                echo $_POST["destination"] . $checkName . $ext;

            }
            else {
                echo $_POST["destination"] . $filename;
            }
        }
        else {
            rename($tmpdir . $filename, $targetDir . $filename);
            echo $_POST["destination"] . $filename;
        }
	}
}
