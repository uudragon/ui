<?php

$json = <<<JSON
[
	{"agent_code": 21, "quidco_amount": 5000, "quidco_detail": "四月返款", "quidco_desc": "银行卡转账", "accu_quidco_amount": 9000, "remark": "四月返款"},
	{"agent_code": 22, "quidco_amount": 5000, "quidco_detail": "四月返款", "quidco_desc": "支付宝转账", "accu_quidco_amount": 9000, "remark": "四月返款"},
	{"agent_code": 23, "quidco_amount": 5000, "quidco_detail": "四月返款", "quidco_desc": "货到付款", "accu_quidco_amount": 9000, "remark": "四月返款"},
	{"agent_code": 24, "quidco_amount": 5000, "quidco_detail": "四月返款", "quidco_desc": "银行卡转账", "accu_quidco_amount": 9000, "remark": "四月返款"},
	{"agent_code": 25, "quidco_amount": 5000, "quidco_detail": "四月返款", "quidco_desc": "支付宝转账", "accu_quidco_amount": 9000, "remark": "四月返款"},
	{"agent_code": 26, "quidco_amount": 5000, "quidco_detail": "四月返款", "quidco_desc": "银行卡转账", "accu_quidco_amount": 9000, "remark": "四月返款"},
	{"agent_code": 27, "quidco_amount": 5000, "quidco_detail": "四月返款", "quidco_desc": "货到付款", "accu_quidco_amount": 9000, "remark": "四月返款"},
	{"agent_code": 28, "quidco_amount": 5000, "quidco_detail": "四月返款", "quidco_desc": "货到付款", "accu_quidco_amount": 9000, "remark": "四月返款"},
	{"agent_code": 29, "quidco_amount": 5000, "quidco_detail": "四月返款", "quidco_desc": "支付宝转账", "accu_quidco_amount": 9000, "remark": "四月返款"},
	{"agent_code": 30, "quidco_amount": 5000, "quidco_detail": "四月返款", "quidco_desc": "银行卡转账", "accu_quidco_amount": 9000, "remark": "四月返款"}
]
JSON;

  header('Content-Type:text/json');
  header("Access-Control-Allow-Origin:*");
  header("Access-Control-Allow-Headers:Content-Type");
  echo $json;
?>