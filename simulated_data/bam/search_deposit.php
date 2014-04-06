<?php

$json = <<<JSON
[
	{"add_amount": 2000, "area": "华东", "agent_name": "迅捷有限公司", "creater": "晓峰", "total_amount": 1100, "actual_amount": 100, "balance": 1000},
	{"add_amount": 2000, "area": "华西", "agent_name": "天意有限公司", "creater": "虚竹", "total_amount": 1100, "actual_amount": 100, "balance": 1000},
	{"add_amount": 2000, "area": "华南", "agent_name": "国脉有限公司", "creater": "段玉", "total_amount": 1100, "actual_amount": 100, "balance": 1000},
	{"add_amount": 2000, "area": "华北", "agent_name": "海华有限公司", "creater": "朱朱", "total_amount": 1100, "actual_amount": 100, "balance": 1000},
	{"add_amount": 2000, "area": "华东", "agent_name": "迅捷有限公司", "creater": "晓峰", "total_amount": 1100, "actual_amount": 100, "balance": 1000},
	{"add_amount": 2000, "area": "华西", "agent_name": "天意有限公司", "creater": "虚竹", "total_amount": 1100, "actual_amount": 100, "balance": 1000},
	{"add_amount": 2000, "area": "华南", "agent_name": "国脉有限公司", "creater": "段玉", "total_amount": 1100, "actual_amount": 100, "balance": 1000},
	{"add_amount": 2000, "area": "华北", "agent_name": "海华有限公司", "creater": "朱朱", "total_amount": 1100, "actual_amount": 100, "balance": 1000},
	{"add_amount": 2000, "area": "华东", "agent_name": "迅捷有限公司", "creater": "晓峰", "total_amount": 1100, "actual_amount": 100, "balance": 1000},
	{"add_amount": 2000, "area": "华西", "agent_name": "天意有限公司", "creater": "虚竹", "total_amount": 1100, "actual_amount": 100, "balance": 1000}
]
JSON;

  header('Content-Type:text/json');
  header("Access-Control-Allow-Origin:*");
  header("Access-Control-Allow-Headers:Content-Type");
  echo $json;
?>