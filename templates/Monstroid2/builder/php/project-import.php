<?php

function rmdir_recursive($dir) {
    foreach(scandir($dir) as $file) {
       if ('.' === $file || '..' === $file) continue;
       if (is_dir("$dir/$file")) rmdir_recursive("$dir/$file");
       else unlink("$dir/$file");
   }

   rmdir($dir);
}

if(isset($_POST["template"]) && isset($_POST["dir"])) {
    $filePath = $_POST["template"];
    $fileName = basename($filePath);
    $ext = explode(".", $fileName);
    $continue = strtolower($ext[1]) == 'zip' ? true : false;
    if(!$continue) {
        echo -2;
        return;
    }

    // PHP current path
    $filenoext = basename($filePath, '.zip');  // absolute path to the directory where zipper.php is in (lowercase)
    $filenoext = basename($filenoext, '.ZIP');  // absolute path to the directory where zipper.php is in (when uppercase)

    $targetdir = "../" . $_POST["dir"]; // target directory
    $targetzip = "../" . $filePath; // target zip file
    $tmpdir = "../temp/upload";


    // create directory if not exists', otherwise overwrite
    // target directory is same as filename without extension
    if (is_dir($tmpdir)) rmdir_recursive($tmpdir);

    $tmpTargetDir = $targetdir . "/temp";

    if (!file_exists($tmpTargetDir)){  mkdir($tmpTargetDir, 0777, true); }

    $zip = new ZipArchive();
    $x = $zip->open($targetzip);  // open the zip file to extract

    if (empty($zip->locateName('project.json'))) {
        if (is_dir($tmpTargetDir)) rmdir_recursive($tmpTargetDir);
        $zip->close();
        unlink($targetzip);
        echo -4;
        exit();
    } else {
        $zip->close();
		rmdir_recursive($targetdir);

		mkdir($targetdir, 0777, true);

        $archive = zip_open($targetzip);
        while($entry = zip_read($archive)){
            $size = zip_entry_filesize($entry);
            $name = zip_entry_name($entry);

            if (is_dir($name) || substr($name, -1) === "/"){
                if (!file_exists($targetdir . $name)){
                    mkdir($targetdir . $name, 0777, true);
                }
            }else{
                if (($unzipped = fopen($targetdir . $name, 'wb')) !== false){
                    while($size > 0){
                        $chunkSize = ($size > 10240) ? 10240 : $size;
                        $size -= $chunkSize;
                        $chunk = zip_entry_read($entry, $chunkSize);
                        if($chunk !== false) fwrite($unzipped, $chunk);
                    }

                    fclose($unzipped);
                }
            }
        }
        zip_close($archive);
        unlink($targetzip);
        echo 1;
    }
}