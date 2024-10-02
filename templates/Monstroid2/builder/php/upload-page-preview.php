<?php

$uploadDir = 'novi/pages/';
$result = array();

if (isset($_POST["dir"]) && isset($_POST["path"])){

    $path = $_POST["path"];
    $projectName = $_POST["dir"];
    $baseName = basename($path);

    $path_info = pathinfo($baseName);
    $targetName = preg_replace("/\s+/", "-", mb_convert_case($path_info["filename"], MB_CASE_LOWER, "UTF-8"));
    $ext = "." . $path_info["extension"];

    if(!in_array($ext, array('.jpeg', '.jpg', '.png'))) {
            http_response_code("406");
            echo "The wrong file format is selected. Only . jpg, .png formats are supported.";
            exit();
    }

    if (!file_exists("../" . $projectName . "novi")){
        mkdir("../" . $projectName . "novi");
    }
    if (!file_exists("../" . $projectName . $uploadDir)){
        mkdir("../" . $projectName . $uploadDir);
    }

    $tmpName = "../" . $projectName . $uploadDir . $targetName . $ext;

    $i = 0;

    while (true) {
        if (file_exists($tmpName)){
            $tmpName = "../" . $projectName . $uploadDir . $targetName . "-" . (++$i) . $ext;
        }else{
            break;
        }
    }

    if(copy("../" . $projectName . $path, iconv("utf-8", "cp1251", $tmpName))){
        if ($i > 0){
            $result['url'] = $uploadDir . $targetName . "-" . $i . $ext;
        }else{
            $result['url'] = $uploadDir . $targetName . $ext;
        }
    };
}
echo json_encode($result);