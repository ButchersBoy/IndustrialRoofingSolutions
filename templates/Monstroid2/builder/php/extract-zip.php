<?php
    if (isset($_POST['destination']) && isset($_POST['zip'])) {
        $zipPath = "../" . $_POST['zip'];
        $destination = "../" . $_POST['destination'];
        $scriptPath = $_SERVER['SCRIPT_NAME'];
        $deepFromRoot = substr_count($scriptPath, "/", 1);
        $destinationDeep = substr_count($destination, "../");

        if ($destinationDeep > $deepFromRoot){
            echo -2;
            return;
        }

        if (file_exists($destination)){
            if (!is_writable($destination)){
                echo -1;
                return;
            }
        }else{
            if (!mkdir($destination, 0777, true)){
                echo -1;
                return;
            }
        }


        if(class_exists("ZipArchive")){
            $zip = new ZipArchive();
            $res = $zip->open($zipPath);

            if ($res === TRUE) {
                $zip->extractTo($destination);
                $zip->close();
                unlink($zipPath);
                echo 0;
            } else {
                unlink($zipPath);
                echo -3;
            }
        }else{
            require_once "pclzip/pclzip.lib.php";
            $lib = new PclZip($zipPath);
            if(!$lib->extract(PCLZIP_OPT_PATH, $destination)) {
                echo -3;
            }else{
                echo 0;
            }

        }
    }

