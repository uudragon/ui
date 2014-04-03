<?php

$json = <<<JSON
{
    "extension": 568459226,
    "status": "已订购",
    "seat": "001",
    "timing": 1220,
    "jobNumber": 12304,
    "name": "乔锋",
    "group": "管理员"
}
JSON;

  header('Content-Type:text/json');
  header("Access-Control-Allow-Origin:*");
  header("Access-Control-Allow-Headers:Content-Type");
  echo $json;
?>
