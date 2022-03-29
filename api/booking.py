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


# settings -------------------------------------------------------------------
booking = Blueprint(
  'booking', 
  __name__,
  url_prefix = '/api'
)


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
@booking.route("/booking", methods=['GET'])
# @jwt_required(optional=True)
def get_booking():
  try:
    verify_jwt_in_request(optional=True)
    claim = get_jwt()
    if claim:
      memberId = data["id"]

      input_date = request.args.get("date")
      input_time = request.args.get("time")
      attractionId = request.path()
      sql = '''
      SELECT id, name, address, image 
      FROM attractions 
      JOIN orders ON orders.attractionID = attractions.id
      WHERE orders.memberId = %s ''' 
      injection = (memberId,)
      result = dbQuery(sql, injection)
      # --------------lines to put in function module--------------
      image_str = result['images'].replace('""','"')
      result['images']=eval(image_str)
      # --------------lines to put in function module--------------

      return jsonify({
        "data": {
          "attraction": {
            "id": result['id'],
            "name": result['name'],
            "address": result['address'],
            "image": result['image'][0]
          },
          "date": input_date,
          "time": input_time,
          "price": price
        }
      }) 
    else:
      return jsonify({
        "error": True,
        "message": "自訂的錯誤訊息"
      })
  except:
    return jsonify({
      "error": True,
      "message": "自訂的錯誤訊息"
    }
)
@booking.route("/booking", methods=['POST'])
@jwt_required(optional=True)
def post_booking():
  try:
    claim = get_jwt()
    if claim:
      memberId = claim["id"]
      input_data = json.loads(request.get_json())
      attractionId = input_data["attractionId"]
      input_date = input_data["date"]
      input_time = input_data["time"]
      price = input_data["price"]

      sql = 'INSERT INTO orders (memberId, attractionId, input_date, input_time, price) VALUES (%s, %s, %s, %s, %s);'
      injection = (memberId, attractionId, input_date, input_time, price)
      result = dbQuery(sql, injection)
      
      if input_date == "":
        return {
        "error": True,
        "message": "建立失敗，輸入不正確或其他原因" 
      } 
      else:
        # return jsonify({"ok": True})
        return "ok"
    else:
      return jsonify({
        "error": True,
        "message": "未登入系統，拒絕存取。請登入預定行程" 
      })
  except 422:
    return jsonify({
      "error": True,
      "message": "未登入系統，拒絕存取。請登入預定行程" 
    })
  except Exception as e:
    return jsonify({
      "error": True,
      # "message": "500 伺服器內部錯誤"
      "message" : claim
    })
    # return e

@booking.route("/booking", methods=['DELETE'])
# @jwt_required(optional=True)
def delete_booking():
  verify_jwt_in_request(optional=True)
  claim = get_jwt()
  if claim:
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