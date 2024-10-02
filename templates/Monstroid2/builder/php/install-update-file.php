<?php

function rmdir_recursive($dir) {
    foreach(scandir($dir) as $file) {
       if ('.' === $file || '..' === $file) continue;
       if (is_dir("$dir/$file")) rmdir_recursive("$dir/$file");
       else unlink("$dir/$file");
   }

   rmdir($dir);
}

if (isset($_POST["file"])){
    $fileData = json_decode($_POST["file"], true);
    $destination = "../" . $fileData["path"];
    $finish = false;
    if (isset($_POST["finish"])){
        $finish = $_POST["finish"];
    }

    if ($fileData["type"] === "update"){
        $sourceFileUrl = "../" . $fileData["url"];
        if (!file_exists($sourceFileUrl)){
            echo -1;
            exit();
        }
        $path_parts = pathinfo($destination);

        if (!file_exists($path_parts['dirname'])){
            mkdir($path_parts['dirname'], 0777, true);
        }

        if (rename($sourceFileUrl, $destination)){
            echo 0;
        }else{
            echo -2;
        }
    }else{
         if (file_exists($destination)){
              unlink($destination);
         }

         echo 0;
    }

//    if ($finish && isset($_POST["version"])){
//        $tmpDir = "../temp/" . $_POST["version"];
//       if (file_exists($tmpDir)){
//        unlink($tmpDir);
//       }
//    }

}

