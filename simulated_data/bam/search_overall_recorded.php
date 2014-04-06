<?php

$json = <<<JSON
{
    "recorded_today": 20000,
    "recorded_total": 51870120
}
JSON;

  header('Content-Type:text/json');
  header("Access-Control-Allow-Origin:*");
  header("Access-Control-Allow-Headers:Content-Type");
  echo $json;
?>