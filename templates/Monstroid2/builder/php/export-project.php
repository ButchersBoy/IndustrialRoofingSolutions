<?php
    include_once("zip.php");

    if ( isset($_POST['dir']) && isset($_POST['name'])) {
        $project_dir = $_POST['dir'];
        $sourceUrl = "../" . $project_dir;
        $project_name =  preg_replace("/\s+/", "-", strtolower(preg_replace('/[\?|\||\\|\/|\:|\*|\>|\<|\.|\"|\,]/', "", $_POST['name'])));
        $destination = '../temp/' . $project_name . '.zip';

        if (!file_exists("../temp/")) {
          mkdir("../temp/", 0777);
        }

        if (file_exists($destination)){
          unlink($destination);
        }

        if (zip($sourceUrl, $destination)){
            echo json_encode(array( "download_file" => "temp/" . basename($destination)));
        }
    }



    function zip($source, $destination)
    {
        if (!file_exists($source)) {
            return false;
        }

        $zip = new Zip();
        $zip->setZipFile($destination);

        $source = str_replace('\\', '/', realpath($source));

        if (is_dir($source))
        {
            $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($source), RecursiveIteratorIterator::SELF_FIRST);

            foreach ($files as $file)
            {
                $file = str_replace('\\', '/', $file);

                // Ignore "." and ".." folders
                if( in_array(substr($file, strrpos($file, '/')+1), array('.', '..')) )
                    continue;

                $file = str_replace('\\', '/', realpath($file));

                if (is_dir($file))
                {
                    $dirName = str_replace($source . '/', '', $file . '/');
                    $zip->addDirectory($dirName);
                }
                else if (is_file($file))
                {
                    $relativeFile = str_replace($source . '/', '', $file);
                    if (!preg_match('/^[^\/]*\.\/.*/', $relativeFile)){
                       $zip->addFile(file_get_contents($file), $relativeFile, 0, null, false);

                    }else if (preg_match('/^[^\/]*\.(html)|project.json$/', $relativeFile)){
                      $zip->addFile(file_get_contents($file), $relativeFile, 0, null, false);
                    }
                }
            }
        }
        else if (is_file($source))
        {
            $zip->addFile(file_get_contents($source), basename($source), 0, null, false);
        }

        $zip->finalize();

        return true;
    }

