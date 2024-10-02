<?php

if ( isset($_POST['path']) && isset($_POST['content']) ) {
    $url = "../" . $_POST['path'];

    if (!file_exists($url)){
        echo "false";
    }


    if (!file_put_contents($url, $_POST['content'])){
        echo "false";
    }

    echo "true";
}









