<?php

$json = <<<JSON
{
"ordersCount": 42302,
"salesAmount": 12321,
"accuOrdersCount": 2343221,
"accuSalesAmount": 12321
}
JSON;

  header('Content-Type:text/json');
  header("Access-Control-Allow-Origin:*");
  header("Access-Control-Allow-Headers:Content-Type");
  echo $json;
?>
