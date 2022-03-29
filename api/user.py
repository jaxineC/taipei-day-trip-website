# import modules-------------------------------------------------------------
from flask import *
import mysql.connector
import mysql.connector.pooling as mypl
import json
import jwt


# settings -------------------------------------------------------------------
user = Blueprint(
  'user', 
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
	# @simple_page.route('/', defaults={'page': 'index'})
	# @simple_page.route('/<page>')
@user.route("/user", methods=['PATCH'])
def user_login():
	try:
		#get values from request body
		input_data = json.loads(request.get_json())
		input_email = input_data["email"]
		input_pw = input_data["password"]
		#run mysql to authenticate user
		sql = 'SELECT id, name, email FROM member WHERE email = %s AND password = %s'
		injection = (input_email, input_pw)
		result = dbQuery(sql,injection)
		payload = result
		if result:
			#generate json web token
			access_token = jwt.encode(payload, key, algorithm="HS256")
			response = make_response(jsonify({"ok": True, "access_token":access_token}))
			response.set_cookie(key='access_token', value=access_token, expires=None, path='/', domain=None, secure=False)
			return response
		else:
			message = "帳號密碼輸入錯誤"
			return jsonify({"error": True,"message":message})
	except Exception as e:
		message = "伺服器內部錯誤"
		return jsonify({"error": True,"message": message}) 
		# return e
@user.route("/user", methods=['GET'])
def user_authentication():
	try:
		access_token = request.cookies.get('access_token')
		payload = jwt.decode(access_token, key, algorithms="HS256")
		if payload:
			return jsonify({"data":payload})
		else:
			return jsonify({"data":None})
	except Exception as e:
		message = "伺服器內部錯誤"
		return jsonify({"error": True,"message": message}) 


@user.route("/user", methods=['POST'])
def user_signup():
	try:
		#get values from request body
		input_data = json.loads(request.get_json())
		input_name = input_data["name"]
		input_email = input_data["email"]
		input_pw = input_data["password"]
		#run mysql to authenticate  user
		# cnx = cnxpool.get_connection()
		# cursor = cnx.cursor(dictionary=True)
		sql = 'SELECT name, email FROM member WHERE email = %s'
		injection = (input_email,)
		result = dbQuery(sql,injection)
		# cursor.execute(sql, injection)
		# result = cursor.fetchone()
		#run mysql check if username is taken
		if result != None:
			# cnx.close()
			message = "使用的email已註冊過,請登入"
			return jsonify({"error":True, "message":message})
		else:
			cnx = cnxpool.get_connection()
			cursor = cnx.cursor(dictionary=True)
			sql = 'INSERT INTO member (name, email, password) VALUES (%s, %s, %s)'
			injection = (input_name, input_email, input_pw)
			cursor.execute(sql, injection)
			cnx.commit()
			cnx.close()
			return jsonify({"ok":True})
	except:
		message = "自訂的錯誤訊息"
		return jsonify({"error":True, "message":message}), 500


@user.route("/user", methods=['DELETE'])
def user_logout():
	#clear tocken
	response = make_response(jsonify({"ok": True}) )
	response.set_cookie(key='access_token', value='', expires=0)
	return response
