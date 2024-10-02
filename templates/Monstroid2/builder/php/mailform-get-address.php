<?php
    if ( isset($_POST['dir'])) {
        $project_dir = $_POST['dir'];
        $sourceUrl = "../" . $project_dir . "bat/rd-mailform.php";
   
         if (file_exists($sourceUrl) && !empty($sourceUrl)){   
            $content = file_get_contents($sourceUrl);                     
            if ( preg_match("/recipients\s*=\s*[\"\']([^\"\']*)[\"\'];/i", $content, $matches)){
              echo json_encode(array("emails" => $matches[1]));  
            } else {
              echo json_encode(array("emails" => ""));         
            }       
         } 
    }

