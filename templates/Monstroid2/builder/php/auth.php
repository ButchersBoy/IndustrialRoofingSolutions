<?php
include 'session.php';

$passSuccess = 1;
$passError = -1;
$targetPass = "";

$salt = "novibuilderfromversion0.9.0password";

if (strlen($currentPassword) < 1){
    echo $passSuccess;
    exit();
}

if (isset($_POST["token"])){
    $targetToken = $_POST["token"];
    if ($targetToken !== $currentToken) echo $passError;
    else echo $passSuccess;
    exit();
}

if (isset($_POST["pass"])){
    $targetPass = $_POST["pass"];
}

$pass = hash('sha256', $salt.$targetPass);
if ($pass !== $currentPassword) echo $passError;
else echo $passSuccess;







