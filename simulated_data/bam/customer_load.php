<?php

$json = <<<JSON
{
	"number": "0165234",
	"type": "已付款",
	"name": "段誉",
	"gender": "男",
	"birthday": "1800-05-02",
	"email": "yuge@gmail.com",
	"location": "云南省大理市某区",
	"street": "不详",
	"address": "不详",
	"tax": "1111111000000",
	"order": "一年",
	"payway": "在线支付",
	"parent": {
		"name": "段王爷",
		"gender": "男"
	},
	"invoice": {
		"type": "公司",
		"prefix": "不详",
		"effectiveDate": "1826-05-02",
		"content": "大理国际"
	},
	"phone": {
		"home": "245715787515",
		"main": "02571157578",
		"company": "02571157578",
		"mobile": "89578157578"
	},
	"comment": "客户很满意!",
	"postcode": "005234"
}
JSON;

header('Content-Type:text/json');
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:Content-Type");
echo $json;
?>
