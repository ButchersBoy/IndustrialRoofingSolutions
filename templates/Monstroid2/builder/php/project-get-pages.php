<?php
    if ( isset($_POST['pages']) && isset($_POST['dir']) && !empty($_POST['pages'])) {
        $pages = json_decode($_POST['pages'], true);
        $dir = $_POST['dir'];
        for ($i = 0; $i < count($pages); $i++) {
          if (isset($pages[$i]["path"]) && !empty($pages[$i]["path"])) {
              $htmlPath = "../" . $dir  . $pages[$i]["path"];
              if (file_exists($htmlPath)) {
                  $pages[$i]["html"] = file_get_contents($htmlPath);
              }
          }
        }
        echo json_encode($pages);
    }

