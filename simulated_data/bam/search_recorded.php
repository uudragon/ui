<?php

$json = <<<JSON
[
	{"enter_amount": 20000, "bank_code": "中国银行", "account_name": "虚竹", "account_no": 51870120, "remark": "银行付款1"},
	{"enter_amount": 50000, "bank_code": "中国农业银行", "account_name": "段玉", "account_no": 51870121, "remark": "银行付款1"},
	{"enter_amount": 50000, "bank_code": "中国建设银行", "account_name": "晓峰", "account_no": 51870122, "remark": "银行付款1"},
	{"enter_amount": 30000, "bank_code": "中国工商银行", "account_name": "珠珠", "account_no": 51870123, "remark": "银行付款1"}
]
JSON;

  header('Content-Type:text/json');
  header("Access-Control-Allow-Origin:*");
  header("Access-Control-Allow-Headers:Content-Type");
  echo $json;
?>