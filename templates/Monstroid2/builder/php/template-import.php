<?php

function rmdir_recursive($dir) {
    foreach(scandir($dir) as $file) {
       if ('.' === $file || '..' === $file) continue;
       if (is_dir("$dir/$file")) rmdir_recursive("$dir/$file");
       else unlink("$dir/$file");
   }

   rmdir($dir);
}

function get_page_title($content) {
    if (!$content) return null;

    $res = preg_match("/<title>(.*)<\/title>/siU", $content, $title_matches);
    if (!$res) return null;

    // Clean up title: remove EOL's and excessive whitespace.
    $title = preg_replace('/\s+/', ' ', $title_matches[1]);
    $title = preg_replace('/\,/', '', $title);
    $title = trim($title);
    return $title;
}

// Remove HTML comments
function remove_html_comments($content = '') {
	return preg_replace('/<!--(?!\s*(?:\[if [^\]]+]|<!|>))(?:(?!-->).|\n)*-->/', '', $content);
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

    $zip = new ZipArchive();
    $x = $zip->open($targetzip);  // open the zip file to extract

    // create directory if not exists', otherwise overwrite
    // target directory is same as filename without extension
    if (is_dir($tmpdir))  rmdir_recursive($tmpdir);
    if (is_dir($targetdir))  rmdir_recursive($targetdir);

    if ($x == true) {

        mkdir($targetdir, 0777, true);

        $zip->extractTo($targetdir); // place in the directory with same name
        $zip->close();

        $project = array();
        $project["presets"] = array();
        $project["name"] = $filenoext;
        $project["dir"] = substr($targetdir, 3);
        $project["pages"] = array();
        $pages = glob($targetdir . '/*.html');

         for ($i = 0; $i < count($pages); $i++) {
            $content = file_get_contents($pages[$i]);
            $fileNameNoExt = basename($pages[$i], '.html');
            $isIndex = $fileNameNoExt === "index";
            $title = get_page_title($content);
            if ($title === null) {
                $title = $fileNameNoExt;
            }
            $project["pages"][$i] = array(
                "title" => $title,
                "index" => $isIndex,
                "isActive" => $isIndex,
                "path" => $fileNameNoExt . ".html",
                "preview" => null
            );
         }

         file_put_contents($targetdir . "/project.json", json_encode($project));
         echo json_encode($project);
         unlink($targetzip);
    }else{
        echo 5;
        echo -3;
    }
}