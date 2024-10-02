<?php

if (isset($_POST["config"]) && !empty($_POST["config"])){
  $configFile = "../config/config.json";
  $config = $_POST["config"];

  if (file_exists($configFile)){
    file_put_contents($configFile, $config);
    echo "success";
  }
}