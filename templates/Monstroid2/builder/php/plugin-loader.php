<?php
    $pluginsDir = "../plugins/";
    if (!file_exists($pluginsDir)) mkdir($pluginsDir);

    $plugins = glob($pluginsDir . "*");
    for ($i = 0; $i < count($plugins); $i++){
        $plugins[$i] = substr($plugins[$i], 3);
    }
    echo json_encode($plugins);

