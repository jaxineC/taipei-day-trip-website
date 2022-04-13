
# import modules-------------------------------------------------------------
from flask import *
import mysql.connector
import mysql.connector.pooling as mypl
import json
import jwt


# settings -------------------------------------------------------------------
thankyou = Blueprint(
  'thankyou', 
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


@thankyou.route("/thankyou", methods=['GET'])
def get_order():
  try:
    access_token = request.cookies.get('access_token')
    if access_token:
      payload = jwt.decode(access_token, key, algorithms="HS256")
      memberId = payload["id"]
      sql = '''
      SELECT orders.order_number, attractions.name, attractions.address, orders.date, orders.time, orders.contactName, orders.contactEmail, orders.contactNumber
      FROM orders 
      JOIN orders ON orders.attractionId = attractions.id
      WHERE orders.memberId =%s AND orders.order_number = %s''' 
      injection = (memberId,order_number)
      result = dbQuery(sql, injection)

      return jsonify({
        "data": {
          "orderNumber": result['order_number'],
          "price": result['price'],
          "attractionName": result['name'],
          "address": result['address'],
          "date": result['date'],
          "time": result['time'],
          "contactName": result['contactName'],
          "contactEmail": result['contactEmail'],
          "contactNumber": result['contactNumber']
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
      "message": result
    })