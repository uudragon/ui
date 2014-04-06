<?php

$json = <<<JSON
{"sum_agents": 200, 
	"rank_agent_today": 2, 
	"sum_sales_today": 8500, 
	"sum_sales_history": 51870120, 
	"new_customer_today": 25, 
	"sum_customer_history": 1000}
JSON;

  header('Content-Type:text/json');
  header("Access-Control-Allow-Origin:*");
  header("Access-Control-Allow-Headers:Content-Type");
  echo $json;
?>