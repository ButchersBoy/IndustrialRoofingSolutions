<?php

if (isset($_POST["fonts"]) && !empty($_POST["fonts"])){
  $fontsFile = "../icons/icons.json";
  $fonts = $_POST["fonts"];

  if (file_exists($fontsFile)){
    file_put_contents($fontsFile, $fonts);
    echo "success";
  }
}