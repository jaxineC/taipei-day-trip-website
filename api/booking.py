# import modules-------------------------------------------------------------
from flask import *
import mysql.connector
import mysql.connector.pooling as mypl
import json
from flask_jwt_extended import (
	create_access_token,
	get_jwt,
	jwt_required,
	JWTManager,
	verify_jwt_in_request
)
import jwt


# settings -------------------------------------------------------------------
booking = Blueprint(
  'booking', 
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
	cnx.commit()
	cnx.close()
	return result


# APIs------------------------------------------------------------------------
@booking.route("/booking", methods=['POST'])
def post_booking():
  try:
    access_token = request.cookies.get('access_token')
    if access_token:
      payload = jwt.decode(access_token, key, algorithms="HS256")
      memberId = payload["id"]
      input_data = json.loads(request.get_json())
      attractionId = input_data["attractionId"]
      input_date = input_data["date"]
      input_time = input_data["time"]
      price = str(input_data["price"])
      if input_date == "":
        return {
        "error": True,
        "message": "請先輸入想要的行程日期" 
      } 
      sql = 'INSERT INTO orders (memberId, attractionId, date, time, price) VALUES (%s, %s, %s, %s, %s);'
      injection = (memberId, attractionId, input_date, input_time, price)
      dbQuery(sql, injection)
      return jsonify({"ok": True})
    else:
      return jsonify({
        "error": True,
        "message": "未登入系統，拒絕存取。請登入預定行程" 
      })
  except Exception as e:
    message = "500 伺服器內部錯誤"
    return jsonify({
      "error": True,
      "message": message
    })
    # return e

@booking.route("/booking", methods=['GET'])
def get_booking():
  try:
    access_token = request.cookies.get('access_token')
    if access_token:
      payload = jwt.decode(access_token, key, algorithms="HS256")
      memberId = payload["id"]
      sql = '''
      SELECT orders.orderId, attractions.id, attractions.name, attractions.address, attractions.images, orders.date, orders.time, orders.price
      FROM attractions 
      JOIN orders ON orders.attractionId = attractions.id
      WHERE orders.memberId =%s AND orders.orderID = (SELECT MAX(orders.orderID) FROM orders)''' 
      injection = (memberId,)
      result = dbQuery(sql, injection)

      image_str = result['images'].replace('""','"')
      result['images']=eval(image_str)

      return jsonify({
        "data": {
          "attraction": {
            "id": result['id'],
            "name": result['name'],
            "address": result['address'],
            "image": result['images'][0]
          },
          "date": result['date'],
          "time": result['time'],
          "price": result['price'],
          "address": result['address']
        }
      }) 
    else:
      message = "請登入查看預定行程"
      return jsonify({
        "error": True,
        "message": message 
      })
  except:
    message = "伺服器內部錯誤"
    return jsonify({
      "error": True,
      "message": message
    })


@booking.route("/booking", methods=['DELETE'])
# @jwt_required(optional=True)
def delete_booking():
  try:
    access_token = request.cookies.get('access_token')
    if access_token:
      memberId = data["id"]
      sql = 'DELETE FROM orders WHERE memberId= %s;'
      injection = (memberId,)
      dbQuery(sql, injection)
      return jsonify({
        "ok": True
      })
    else:
      return jsonify({
        "error": True,
        "message": "未登入系統，拒絕存取" 
      })
  except:
    message = "伺服器內部錯誤"
    return jsonify({
      "error": True,
      "message": message
    })