<?php

$json = <<<JSON
[{
	"id": 8,
	"orders_no": "OD1001",
	"shipment_no": "FH1001",
	"shipped_qty": 1,
	"express_code": 1,
	"express_name": "test name",
	"express_orders_no": "bbbbbb",
	"express_cost": 20,
	"courier": "obama",
	"courier_tel": "13800138000",
	"create_time": "2014-04-11",
	"creater": "jack",
	"update_time": "2014-04-09",
	"updater": null,
	"yn": 0
}, {
	"id": 10,
	"orders_no": "OD1002",
	"shipment_no": "FH1002",
	"shipped_qty": 1,
	"express_code": 1,
	"express_name": "如风达快递",
	"express_orders_no": "bbbbbb",
	"express_cost": 20,
	"courier": "obama",
	"courier_tel": "13800138000",
	"create_time": "2014-04-15",
	"creater": "jack",
	"update_time": "2014-04-15",
	"updater": null,
	"yn": 0
}]
JSON;

  header('Content-Type:text/json');
  header("Access-Control-Allow-Origin:*");
  header("Access-Control-Allow-Headers:Content-Type");
  echo $json;
?>
