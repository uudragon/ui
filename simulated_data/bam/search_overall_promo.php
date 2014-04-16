<?php

$json = <<<JSON
{
	"td_hq_sum": 123,
	"td_agent_sum": 123,
	"td_consume": 123,
	"remain": 123,
	"hq_sum": 123,
	"agent_sum": 123
}
JSON;

  header('Content-Type:text/json');
  header("Access-Control-Allow-Origin:*");
  header("Access-Control-Allow-Headers:Content-Type");
  echo $json;
?>
