<?php
    require "upload/autoloader.php";

    $autoloader = new \Upload\Autoloader();
    $autoloader->register();
    if (!isset($_FILES) || empty($_FILES)|| !isset($_POST["path"])){
        die();
    }
    $path = $_POST["path"];

    if (!isset($_POST['core'])){
        if (!preg_match('/^projects\/[^\/]+\//', $path)){
            http_response_code(400);
            echo 'File Upload to "' . $path . '" is forbidden';
            exit();
        }
    }

    $destination = "../" . $path;

    if (!is_dir($destination)){
        mkdir($destination, 0777, true);
    }

    if (file_exists($destination . $_FILES['file']['name'])){
        unlink($destination . $_FILES['file']['name']);
    }

    $callbackAfterUpload = function (\Upload\FileInfoInterface $fileInfo) {
        echo preg_replace('/^projects\/[^\/]+\//', "", $_POST["path"]) . $fileInfo->getNameWithExtension();
    };

    // Try to upload file
    try {
        $storage = new \Upload\Storage\FileSystem($destination, true);
        $file = new \Upload\File('file', $storage);
        $file->afterUpload($callbackAfterUpload);
        $file->upload();
    } catch (\InvalidArgumentException $e) {
        http_response_code(409);
        echo $e->getMessage();
    } catch (\Exception $e){
        http_response_code(500);
        echo $e->getMessage();
    }