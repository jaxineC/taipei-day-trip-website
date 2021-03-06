# import modules-------------------------------------------------------------
from flask import *
import mysql.connector
import mysql.connector.pooling as mypl
import json
import jwt
import requests
from urllib.error import HTTPError
from datetime import datetime, date, time

# settings -------------------------------------------------------------------
orders = Blueprint(
  'orders', 
  __name__,
  url_prefix = '/api'
)

# PyJWT
key = "secret"

# functions -------------------------------------------------------------------
cnxpool = mypl.MySQLConnectionPool(
	host = "localhost",
	user = "root",
	password = "pw4mysql0000",
	database = "tpe",
	pool_name = "mypool",
	pool_size = 5,
)

def dbQuery(sql,injection) :
	cnx = cnxpool.get_connection()
	cursor = cnx.cursor(dictionary=True)
	cursor.execute(sql, injection)
	result = cursor.fetchone()
	cursor.close()
	cnx.commit()
	cnx.close()
	return result


# APIs------------------------------------------------------------------------
@orders.route("/orders", methods=['POST'])
def post_order():
  try:
    #generate order_number
    access_token = request.cookies.get('access_token')
    payload = jwt.decode(access_token, key, algorithms="HS256")
    memberId = payload["id"]
    date_time = datetime.now().strftime("%Y"+"%m"+"%d"+"%H"+"%M"+"%S")
    order_number = str(date_time)+"-MEM-"+str(memberId).rjust(4,"0")

    #get info from frontend request payload
    input_data = json.loads(request.get_json())
    prime = input_data["prime"]
    price = input_data["order"]["price"]
    attractionId = input_data["order"]["trip"]["attraction"]["id"]
    date = input_data["order"]["trip"]["date"]
    date_short = datetime.strptime(date, "%a, %d %b %Y %X %Z")
    time = input_data["order"]["trip"]["time"]
    contact_name =input_data["order"]["contact"]["name"]
    contact_email =input_data["order"]["contact"]["email"]
    contact_number =input_data["order"]["contact"]["phone"]
    
    #prep for tappay requirement (url, headers, data)
    timeout = 30
    url = "https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime"
    header= {
      "Content-Type": "application/json",
      "x-api-key": "partner_ULrh1fwxO9Uq5YvYy9A1WxF52oG4LJMIwArPfnB749TeIUxvztGt0IUc"
    }
    data = {
      "prime": prime,
      "partner_key": "partner_ULrh1fwxO9Uq5YvYy9A1WxF52oG4LJMIwArPfnB749TeIUxvztGt0IUc",
      "merchant_id": "jaxine_CTBC",
      "amount": int(price),
      "order_number":order_number,
      "details":"TapPay Test",
      "cardholder": {
          "name": contact_name,
          "email": contact_email,
          "phone_number": contact_number
      },
      "three_domain_secure": False
    }
    
    #send to tappay
    req= requests.post(url, json.dumps(data), headers = header)
    # response = json.loads(req)
    response = req.json()
    

    # ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
    if response["status"] == 0:
      sql = 'INSERT INTO orders (order_number, memberId, attractionId, date, time, price, payment) VALUES (%s, %s, %s, %s, %s, %s, %s);'
      injection = (order_number, memberId, attractionId, date_short, time, price, "?????????")
      dbQuery(sql, injection)
      sql = 'DELETE FROM bookings WHERE memberId = %s ;'
      injection = ( memberId, )
      dbQuery(sql, injection)
      message_payment = "????????????"

    # ???????????????????????????????????????????????????????????????????????????????????????????????????
    else:
      message_payment = "????????????"
    return jsonify({
      "data": {
        "number": order_number,
        "payment": {
          "status": response["status"],
          "message": message_payment
        }
      }
    })


  except HTTPError as err:
    if err.code == 400:
      message = "???????????????????????????????????????????????????"
    elif err.code == 403:
      message = "??????????????????????????????"
    else:
      message = "?????????????????????"
    # message = "400, 403, 500 ?????????????????????"
    return jsonify({
      "error": True,
      "message": message
    })
#   return e
