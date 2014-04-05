<?php

$json = <<<JSON
{
    "sales_today": 100321,
    "sales_history": 200,
    "sales_added": 120,
    "sales_should": 5000,
    "sales_balance": 23245000
}
JSON;

  header('Content-Type:text/json');
  header("Access-Control-Allow-Origin:*");
  header("Access-Control-Allow-Headers:Content-Type");
  echo $json;
?>