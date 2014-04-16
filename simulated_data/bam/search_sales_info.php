<?php

$json = <<<JSON
{
    "countOfToday": 20000,
    "sumOfToday": 51870120,
    "count": 51870120,
    "sum": 51870120
}
JSON;

  header('Content-Type:text/json');
  header("Access-Control-Allow-Origin:*");
  header("Access-Control-Allow-Headers:Content-Type");
  echo $json;
?>
