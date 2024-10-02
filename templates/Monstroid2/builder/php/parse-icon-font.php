<?php
	spl_autoload_extensions(".php");
    spl_autoload_register();

	if (!isset($_POST['zip']) || empty($_POST['zip'])) { exit();}

	$zipPath = "../" . $_POST['zip'];
	$directory = basename($zipPath, ".zip");
    $destination = "../temp/" . $directory;

    if (file_exists($destination)){
    	//Remove directory...
    }else{
    	mkdir($destination, 0777, true);
    }

	if(class_exists("ZipArchive")){
		$zip = new ZipArchive();
		$res = $zip->open($zipPath);

		if ($res === TRUE) {
		    $zip->extractTo($destination);
		    $zip->close();
		    unlink($zipPath);
		} else {
		    unlink($zipPath);
		    exit();
		}
	}else{
		require_once "pclzip/pclzip.lib.php";
		$lib = new PclZip($zipPath);
		if(!$lib->extract(PCLZIP_OPT_PATH, $destination)) {
		    exit();
		}
	}

	$list = glob($destination . "/*.css"); 
	if (count($list) != 1){
		exit();
	}

	$source = file_get_contents($list[0]);
	$parser = new Sabberworm\CSS\Parser($source);

	$result = $parser->parse();

	$font = Array();

	$font["css"] = basename($list[0]);
	$font['files'] = Array();
	$font['icons'] = Array();

	$generalClass = '';
	$familyToken = '';
	$selectorsWithFamily = Array();
	$needGeneral = false;

	foreach($result->getAllRuleSets() as $ruleSet) {
		if (is_a($ruleSet, 'Sabberworm\CSS\RuleSet\AtRuleSet')){
			// Find font-face rule
			if ($ruleSet->atRuleName() == "font-face"){
				$data = parseFontFace($ruleSet);
				$font["files"] = $data["files"];
				$font["family"] = $data["family"];
			}
		}else if (is_a($ruleSet, 'Sabberworm\CSS\RuleSet\DeclarationBlock')){
			$hasContent = false;
			$hasFontFamily = false;
			$ruleSet->expandFontShorthand();

			foreach ($ruleSet->getRules() as $rule) {
				if ($rule->getRule() === "content"){
					$hasContent = true;
				}

				if ($rule->getRule() === "font-family"){
					$hasFontFamily = true;
				}
			}

			foreach ($ruleSet->getSelectors() as $selector) {
				$selectorText = $selector->getSelector();
				if ($hasFontFamily && !$hasContent){
					// Check for general Class
					preg_match('/^(?:\.|\[class=[\'\"](.*)[\'\"]\])([^\:]*)$/', $selectorText, $general);
					if (isset($general) && (!empty($general[1]) || !empty($general[2]))){
						if (!empty($general[1])){
							$generalClass = $general[1];
						}else{
							$generalClass = $general[2];
						}
					}

					if (empty($familyToken)){
						// Check for family Token
						preg_match('/\[class.+=[\'\"]\s*(.*)\s*[\'\"]\]:(?:before|after)/', $selectorText, $familyTokenMatch);
						if (isset($familyTokenMatch) && !empty($familyTokenMatch[1])){
							$familyToken = $familyTokenMatch[1];
						}
					}
				}

				if ($hasFontFamily){
					array_push($selectorsWithFamily, $selectorText);
				}

				if ($hasContent){
					preg_match('/\.([^\:]*)/', $selectorText, $class);
					if (isset($class) && isset($class[1])){
						array_push($font['icons'], $class[1]);
					}

					
					if (!in_array($selectorText, $selectorsWithFamily)){
						$needGeneral = true;
					}
				}

			} 

		}
	}

	if ($needGeneral){
		if (!empty($familyToken)){
			foreach ($font['icons'] as $icon) {
				if (strpos($icon, $familyToken === false)){
					$font['generalClass'] = $generalClass;
					break;
				}
			}
		}else{
			$font['generalClass'] = $generalClass;
		}
	}

	foreach ($font['files'] as $file) {
		if (!file_exists($destination . "/" . $file)){
			exit();
		}
	}
	$targetDir = preg_replace("/\s+/", "-", mb_convert_case($font['family'], MB_CASE_LOWER, "UTF-8"));

	if (file_exists("../icons/" . $targetDir)){
		deleteFolder("../icons/" . $targetDir);
	}

	$font["dir"] = "icons/" . $targetDir;

	rename($destination, "../icons/" . $targetDir);
	$file = fopen( "../icons/" . $targetDir . "/novi-icon-font.txt", "w");
	fclose($file);

	echo json_encode($font);

	function parseFontFace($ruleSet){
		$data = Array();
		$data['files'] = Array();
		foreach($ruleSet->getRules() as $rule) {
			if ($rule->getRule() === "font-family"){
				$data["family"] = preg_replace('/[\'\"]/',"", $rule->getValue()->__toString()); 
			}

			if ($rule->getRule() === "src"){
				foreach ($rule->getValues() as $values) {
					foreach ($values as $value){
						if (is_a($value, 'Sabberworm\CSS\Value\URL')){
							preg_match('/\([\'\"]*([^#]*?)(?:\?.*)?[\'\"]*\)/',$value->__toString(), $path);
							if (isset($path) && isset($path[1])){
								if (!in_array($path[1], $data['files'])){
									array_push($data['files'], $path[1]);
								}
							}
						}
					}
				}	
			}
		}

		return $data;
	}

	function deleteFolder($path){
		if (is_dir($path) === true){
			$files = array_diff(scandir($path), array('.', '..'));

			foreach ($files as $file){
				deleteFolder(realpath($path) . '/' . $file);
			}

			return rmdir($path);
		}else if (is_file($path) === true){
			return unlink($path);
		}

		return false;
	}