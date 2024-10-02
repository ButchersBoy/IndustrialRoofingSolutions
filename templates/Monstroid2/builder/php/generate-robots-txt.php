<?php

if (!isset($_POST["settings"]) || !isset($_POST["path"])){
    echo -1;
    die();
}

$result = [];
$settings = json_decode($_POST["settings"], true);
$originalDestination = $_POST["path"] . 'robots.txt';
$destination = "../" . $originalDestination;
$content = "";

if ($settings['recommended']) {
    $content .= "User-Agent: *\n";
    if ($settings['indexingDisabled']) {
        $content .= "Disallow: /\n";
    } else {
        $content .= "Allow: /\n";
    }
}

if ($settings['sitemapUrl']) {
    $content .= "Sitemap: " . $settings['sitemapUrl'] . "\n";
}

if ($settings['customCode']) {
    $content .= $settings['customCode'];
}

if (file_put_contents($destination, $content)) {
    $result['error'] = false;
    $result['destination'] = $originalDestination;
} else {
    $result['error'] = true;
}

echo json_encode($result);
