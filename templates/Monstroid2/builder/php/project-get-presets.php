<?php
    if ( isset($_POST['presets']) && isset($_POST['dir']) && !empty($_POST['presets'])) {
        $presets = json_decode($_POST['presets'], true);
        $dir = $_POST['dir'];
        for ($i = 0; $i < count($presets); $i++) {
          if (isset($presets[$i]["path"]) && !empty($presets[$i]["path"])) {
              $htmlPath = "../" . $dir . "elements/" . $presets[$i]["path"];
              if (file_exists($htmlPath)) {
                  $presets[$i]["html"] = file_get_contents($htmlPath);
              }
          }
        }

        echo json_encode($presets);
    }

