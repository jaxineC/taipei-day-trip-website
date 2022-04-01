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
member = Blueprint(
  'member', 
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
@member.route("/member", methods=['PATCH'])
def change_name():
  try:
    input_data = json.loads(request.get_json())
    new_name = input_data["name"]
    access_token = request.cookies.get('access_token')
    if access_token:
      payload = jwt.decode(access_token, key, algorithms="HS256")
      memberId = payload["id"]
      sql = '''
        UPDATE member
        SET name = "%s"
        WHERE id = "%s" ;'''
      injection = (new_name, memberId)
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