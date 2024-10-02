<?php

function return_bytes($val) {
    $last = strtolower($val[strlen($val)-1]);
    $int = preg_replace('/[^0-9]/', '', $val);
    switch($last) {
      case 'g':
          $int *= 1024 * 1024 * 1024;
          break;
      case 'm':
          $int *= 1024 * 1024;
          break;
      case 'k':
          $int *= 1024;
          break;
    }
    return $int;
}

$checkdir = "../images";

$response = array(
    "demoPass" => file_exists("./novi-intro-password.txt"),
    "settings" => array(
        "upload_max_filesize" => return_bytes(ini_get('upload_max_filesize')),
        "memory_limit" => return_bytes(ini_get('memory_limit')),
        "max_file_uploads" => ini_get('max_file_uploads'),
        "post_max_size" => return_bytes(ini_get('post_max_size'))
        )
    );
echo json_encode($response);

