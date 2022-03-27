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


# settings-------------------------------------------------------------------
user = Blueprint(
  'user', 
  __name__,
)


# functions----------------------------------------------------------------------
# Connect to MySQL
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
	cnx.close()
	return result


# APIs------------------------------------------------------------------------
@user.route("/api/user", methods=['PATCH'])
def login():
	try:
		#get values from request body
		input_data = json.loads(request.get_json())
		input_email = input_data["email"]
		input_pw = input_data["password"]
		#run mysql to authenticate user

		# cnx = cnxpool.get_connection()
		# cursor = cnx.cursor(dictionary=True)
		sql = 'SELECT id, name, email FROM member WHERE email = %s AND password = %s'
		injection = (input_email, input_pw)
		result = dbQuery(sql,injection)
		# cursor.execute(sql, injection)
		# result = cursor.fetchone()
		# cnx.close()
		if result != None:
			#generate json web token
			access_token = create_access_token(input_email, additional_claims=result)
			#---------------------------------------cookies
			resp = make_response('Setting cookie?')
			resp.set_cookie(key='Token', value=access_token)
			#---------------------------------------cookies
			data = result
			return jsonify({"ok": True, "access_token":access_token})
		else:
			message = "帳號密碼輸入錯誤"
			return jsonify({"error": True,"message":message})
	except Exception as e:
		message = "伺服器內部錯誤"
		return jsonify({"error": True,"message": e}) , 500
		# return e


@user.route("/api/user", methods=['GET'])
def authentication():
	try:
		# Access the identity of the current user with get_jwt_identity
		verify_jwt_in_request(optional=True)
		claim = get_jwt()
		data = {key:claim[key] for key in["id","name", "email"]}
		#---------------------------------------cookie
		# token = request.cookies.get("Token")
		# if token == True:
		# 	return jsonify({"data":data})
		# else:
		# 	return jsonify({"data":"有跑完try"})
		#---------------------------------------cookies
		return jsonify({"data":data})
	#fail message
	except Exception as e:
		return jsonify({"data":None})
		# return e


@user.route("/api/user", methods=['POST'])
def signup():
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


@user.route("/api/user", methods=['DELETE'])
def logout():
	#clear tocken
	resp = jsonify({'logout': True})
	return jsonify({"ok": True}) 
