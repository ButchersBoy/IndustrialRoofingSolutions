<?php

if (!isset($_POST["settings"]) || !isset($_POST["pages"]) || !isset($_POST["path"])){
    echo -1;
    die();
}

function to_xml(SimpleXMLElement $object, array $data, array $settings)
{   
    foreach ($data as $key => $value) {
        if (is_array($value)) {
            $new_object = $object->addChild('url');
            to_xml($new_object, $value, $settings);
        } else {
            if ($key == 'index') {
                $data = $value ? $settings['homePage'] : $settings['otherPages'];
                if ($data['frequency']) {
                    $object->addChild('changefreq', $data['frequency']);
                }
                if ($data['priority']) {
                    $object->addChild('priority', $data['priority']);
                }
            }
            else {
                $object->addChild($key, $value);
            }
        }   
    }   
}

$result = [];
$settings = json_decode($_POST["settings"], true);
$pages = json_decode($_POST["pages"], true);
$originalDestination = $_POST["path"] . 'sitemap.xml';
$destination = "../" . $originalDestination;

array_walk($pages, function(&$page) {
    $page = array_reverse($page, true);
});

$xml = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><urlset/>');

$xml->addAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
$xml->addAttribute('xsi:schemaLocation', 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd');
$xml->addAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

to_xml($xml, $pages, $settings);

if (file_put_contents($destination, $xml->asXML())) {
    $result['error'] = false;
    $result['destination'] = $originalDestination;
} else {
    $result['error'] = true;
}

echo json_encode($result);
