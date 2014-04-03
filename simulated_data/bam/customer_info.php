<?php

$json = <<<JSON
{
	"preorder": 1080,
	"dealed": 15000
}
JSON;

header('Content-Type:text/json');
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:Content-Type");
echo $json;
?>
