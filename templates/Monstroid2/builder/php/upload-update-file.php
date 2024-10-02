<?php

function rmdir_recursive($dir) {
    foreach(scandir($dir) as $file) {
       if ('.' === $file || '..' === $file) continue;
       if (is_dir("$dir/$file")) rmdir_recursive("$dir/$file");
       else unlink("$dir/$file");
   }

   rmdir($dir);
}

if (isset($_POST["file"]) && isset($_POST["version"])){
    $fileData = json_decode($_POST["file"], true);
    $sourceFileUrl = $fileData["url"];
    $file_headers = @get_headers($sourceFileUrl);

    if($file_headers[0] == 'HTTP/1.1 404 Not Found'){
          echo -1;
          exit();
    } else if ($file_headers[0] == 'HTTP/1.1 302 Found' && $file_headers[7] == 'HTTP/1.1 404 Not Found'){
        echo -1;
        exit();
    }

    $sourceFileName = basename($fileData["url"]);
    $destination = "../" . $fileData["path"];
    $version = $_POST["version"];
    $tmpDir = "temp/" . $version;

    if ($_POST["start"] === 'true'){
        if ( !file_exists("../temp")){
            mkdir("../temp");
        }

        if ( file_exists("../" . $tmpDir)){
            rmdir_recursive("../" . $tmpDir);
        }

        mkdir("../" . $tmpDir);
    }

    $hash = bin2hex(openssl_random_pseudo_bytes(8));
    $url = $sourceFileUrl . "?id=" . $hash;

    if (copy($url, "../" . $tmpDir . "/" . $sourceFileName)){
        $fileData["url"] = $tmpDir . "/" . $sourceFileName;

        echo json_encode($fileData);
    }else{
        return -2;
    }
}

