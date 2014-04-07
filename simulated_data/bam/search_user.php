<?php
$json = <<<JSON
{
    "recordsCount": 25,
    "currentPage": 1,
    "records": [
        {"id": 1, "type": 1, "name": "test1", "account": "account2", "isValid": 1, "gender": "male", "email": "testemail@email.com", "positions": "admin"},
        {"id": 2, "type": 2, "name": "test2", "account": "account6", "isValid": 1, "gender": "female", "email": "testemdail@email.com", "positions": "admin"},
        {"id": 3, "type": 2, "name": "test3", "account": "account34", "isValid": 1, "gender": "male", "email": "test3@email.com", "positions": "register"},
        {"id": 4, "type": 1, "name": "test4", "account": "account6", "isValid": 1, "gender": "female", "email": "test4@email.com", "positions": "admin"},
        {"id": 5, "type": 1, "name": "test45", "account": "account4", "isValid": 1, "gender": "male", "email": "testd4@email.com", "positions": "admin"},
        {"id": 6, "type": 1, "name": "21312", "account": "account2", "isValid": 1, "gender": "female", "email": "test4@email.com", "positions": "admin"},
        {"id": 7, "type": 1, "name": "21312", "account": "account2", "isValid": 1, "gender": "female", "email": "test4@email.com", "positions": "admin"},
        {"id": 9, "type": 1, "name": "21312", "account": "account2", "isValid": 1, "gender": "female", "email": "test4@email.com", "positions": "admin"},
        {"id": 10, "type": 1, "name": "21312", "account": "account2", "isValid": 1, "gender": "female", "email": "test4@email.com", "positions": "admin"},
        {"id": 11, "type": 1, "name": "21312", "account": "account2", "isValid": 1, "gender": "female", "email": "test4@email.com", "positions": "admin"},
        {"id": 12, "type": 1, "name": "21312", "account": "account2", "isValid": 1, "gender": "female", "email": "test4@email.com", "positions": "admin"},
        {"id": 13, "type": 1, "name": "21312", "account": "account2", "isValid": 1, "gender": "female", "email": "test4@email.com", "positions": "admin"},
        {"id": 14, "type": 1, "name": "21312", "account": "account2", "isValid": 1, "gender": "female", "email": "test4@email.com", "positions": "admin"},
        {"id": 15, "type": 1, "name": "21312", "account": "account2", "isValid": 1, "gender": "female", "email": "test4@email.com", "positions": "admin"},
        {"id": 16, "type": 1, "name": "21312", "account": "account2", "isValid": 1, "gender": "female", "email": "test4@email.com", "positions": "admin"},
        {"id": 17, "type": 1, "name": "21312", "account": "account2", "isValid": 1, "gender": "female", "email": "test4@email.com", "positions": "admin"},
        {"id": 18, "type": 1, "name": "21312", "account": "account2", "isValid": 1, "gender": "female", "email": "test4@email.com", "positions": "admin"},
        {"id": 19, "type": 1, "name": "21312", "account": "account2", "isValid": 1, "gender": "female", "email": "test4@email.com", "positions": "admin"},
        {"id": 20, "type": 1, "name": "21312", "account": "account2", "isValid": 1, "gender": "female", "email": "test4@email.com", "positions": "admin"},
        {"id": 21, "type": 1, "name": "21312", "account": "account2", "isValid": 1, "gender": "female", "email": "test4@email.com", "positions": "admin"}
    ]
}
JSON;

  header('Content-Type:text/json');
  header("Access-Control-Allow-Origin:*");
  header("Access-Control-Allow-Headers:Content-Type");
  // echo ($_POST["pagination"]["toPage"])
  // echo ($_POST["pagination"]["perPage"])
  echo $json;
?>