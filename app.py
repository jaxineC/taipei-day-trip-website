# import modules-------------------------------------------------------------
from flask import *
import mysql.connector
import mysql.connector.pooling as mypl
import json
	# pyjwt
	# import jwt
from flask_jwt_extended import (
	create_access_token,
	get_jwt,
	get_jwt_identity,
	jwt_required,
	JWTManager,
	set_access_cookies,
  unset_jwt_cookies
)


# settings-------------------------------------------------------------------
app=Flask(
	__name__,
	static_folder = 'static',
	static_url_path = '/'
)

app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True

cnxpool = mypl.MySQLConnectionPool(
	host = "localhost",
	user = "root",
	password = "pw4mysql0000",
	database = "tpe",
	pool_name = "mypool",
	pool_size = 5,
)
	# pyjwt
	# key = "pw_for_jwt"
	# algorithm = "HS256"


# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "key-to-use-jwt"
app.config["JWT_TOKEN_LOCATION"] = ["headers", "cookies"]
# app.config["JWT_COOKIE_SECURE"] = True
jwt = JWTManager(app)

# jwt.init_app(app) ...not in Flask doc


# templates----------------------------------------------------------------------
@app.route("/")
def index():
	return render_template("index.html")
@app.route("/attraction/<id>")
def attraction(id):
	return render_template("attraction.html")
@app.route("/booking")
def booking():
	return render_template("booking.html")
@app.route("/thankyou")
def thankyou():
	return render_template("thankyou.html")


# APIs------------------------------------------------------------------------
@app.route("/api/attractions", methods=['GET'])
def attractions():
	try:
		input_page= request.args.get('page',0)
		input_keyword= request.args.get('keyword')
		# if int(input_page)<1 or int(input_page)>6: 
		# 	raise ValueError
		if int(input_page)==0:
			number = 0
			number2 = 0
			currentPage = 0
		else:
			number = (int(input_page))*12
			number2 = (int(input_page)+1)*12
			currentPage = int(input_page)
		keyword = str(input_keyword)
		cnx1 = cnxpool.get_connection()
		cur = cnx1.cursor(dictionary=True)
		
		if input_keyword == None:
			sql = "SELECT id,  name, category, description, address, transport, mrt, latitude, images FROM attractions WHERE name IS NOT NULL LIMIT %s,12"
			val = (number,)
			cur.execute(sql,val)
			result = cur.fetchall()
			sql = "SELECT COUNT(name) FROM attractions WHERE name IS NOT NULL"
			cur.execute(sql)
			count = cur.fetchone()
			if count['COUNT(name)'] == None: nextpage= None
			elif (count['COUNT(name)'] - (int(input_page)+1)*12) >0 : nextpage=currentPage+1
			else: nextpage=None

		else:
			sql = "SELECT id,  name, category, description, address, transport, mrt, latitude, images FROM attractions WHERE name REGEXP %s LIMIT %s,12" 
			val = (keyword,number)
			cur.execute(sql,val)
			result = cur.fetchall()
			sql = "SELECT COUNT(name) FROM attractions WHERE name REGEXP %s LIMIT %s,12"
			val = (keyword,number2)
			cur.execute(sql,val)
			count = cur.fetchone()
			# if count['COUNT(name)'] == None: nextpage= None
			if count == None: nextpage= None
			elif (count['COUNT(name)'] - (currentPage+1)*12) >0 : nextpage=currentPage+1
			# elif (count - currentPage*12) >0 : nextpage=currentPage+1
			else: nextpage=None
		cur.close()
		cnx1.close() 
		# if result == []:
		if int(input_page)>58//12:
			raise ValueError
			# return "error"
		else:
			for image in range(len(result)):
				image_str = result[image]['images'].replace('""','"')
				result[image]['images']=eval(image_str)
			return jsonify({"nextPage": nextpage, "data": result})
	except ValueError as e:
		input_msg= request.args.get('message','輸入錯誤')
		return jsonify({"error":True, "message": input_msg})
		# return (str(e))
	except Exception as e:
		input_msg= request.args.get('message','程式錯誤')
		return jsonify({"error":True, "message": input_msg})
		# return (str(e))

@app.route("/api/attraction/<attractionId>")
def attractionId(attractionId):
	try:
		id_str= str(int(attractionId))
		if int(attractionId)<0 or int(attractionId)>58: 
			raise ValueError
		cnx2 = cnxpool.get_connection()
		cur = cnx2.cursor(dictionary=True)
		sql =	"SELECT id,  name, category, description, address, transport, mrt, latitude, images FROM attractions WHERE id = %s"
		val = (id_str,)
		cur.execute(sql, val)
		result = cur.fetchall()
		cur.close()
		cnx2.close()
		if result == []:
			raise ValueError
		else:
			for image in range(len(result)):
				image_str = result[image]['images'].replace('""','"')
				result[image]['images']=eval(image_str)
			return jsonify({"data":result[0]})
	except ValueError:
		input_msg= request.args.get('message','景點編號不正確')
		return jsonify({"error":True, "message": input_msg})
	except Exception as e:
		input_msg= request.args.get('message','程式錯誤')
		return jsonify({"error":True, "message": input_msg})
		# return (str(e))

#requests.patch(url, params={key:value}, args)
@app.route("/api/user", methods=['PATCH'])
def login():
	try:
		#get values from request body
		input_data = json.loads(request.get_json())
		input_email = input_data["email"]
		input_pw = input_data["password"]
		#run mysql to authenticate user
		cnx = cnxpool.get_connection()
		cursor = cnx.cursor(dictionary=True)
		sql = 'SELECT id, name, email FROM member WHERE email = %s AND password = %s'
		injection = (input_email, input_pw)
		cursor.execute(sql, injection)
		result = cursor.fetchone()
		cnx.close()
		if result != None:
			#generate json web token????????????????????????????????????????
				# pyjwt
				# encoded_jwt = jwt.encode({"data": result}, key, algorithm)
				# jwt.decode(encoded_jwt, key, algorithms)
				#Flask-JWT-Extended
				# access_token = create_access_token(identity=username, additional_claims=claims) ...官方
			access_token = create_access_token(input_email, additional_claims=result)

			# resp = jsonify({'login': True})
			# set_access_cookies(resp, access_token)
			data = result
			#return login success msg + tocken
			return jsonify({"ok": True, "access_token":access_token})
		else:
			message = "帳號密碼輸入錯誤"
			return jsonify({"error": True,"message":message})
	except Exception as e:
		message = "伺服器內部錯誤"
		return jsonify({"error": True,"message": message}) , 500
		# return e

#requests.get(url, params={key:value}, args) ...python requests
#request.args.get(‘name’)....flask request
#request.values.get(‘name’)
# def index_id(id)
#render_template(‘abc.html’, name_template=name)------>傳回
@app.route("/api/user", methods=['GET'])
#verify tocken
@jwt_required(optional=False, fresh=False, refresh=False, locations=None)
def authentication():
	try:
		# Access the identity of the current user with get_jwt_identity
		# identity = get_jwt_identity()
		# claims = get_jwt() ...Flask doc
		claim = get_jwt()
		data = {key:claim[key] for key in["id","name", "email"]}
		# wanted_keys = ("id","name", "email")
		# v=verify_jwt_in_request(optional=False, fresh=False, refresh=False, locations=None)
		# return jsonify(logged_in_as=current_user), 200 ...官方
		return jsonify({"data":data})
		#return jsonify(foo=claims["foo"]) ...官方
	#fail message
	except:
		return jsonify({"data":None, "message":"請確認正確登入"})
		    
    
    

#requests.post(url, data={key: value}, json={key: value}, args) ...python requests
#request.form.get(‘username’)....flask request
#request.values.get(‘username’)
#
@app.route("/api/user", methods=['POST'])
def signup():
	try:
		#get values from request body
		input_name = request.form.get("name", None)
		input_email = request.form.get("email", None)
		input_pw = request.json.get("password", None)
		#run mysql to authenticate  user
		cnx = cnxpool.get_connection()
		cursor = cnx.cursor(dictionary=True)
		sql = 'SELECT name, email FROM member WHERE email = %s'
		injection = (input_email,)
		cursor.execute(sql, injection)
		result = cursor.fetchone()
		#run mysql check if username is taken
		if result != None:
			cnx.close()
			message = "自訂的錯誤訊息"
			return jsonify({"error":true, "message":message})
		else:
			sql = 'INSERT INTO member (name, email, password) VALUES (%s, %s, %s)'
			injection = (input_name, input_email, input_pw)
			cursor.execute(sql, injection)
			cnx.commit()
			cnx.close()
			return jsonify({"ok":true})
	#error handling
	except:
		message = "自訂的錯誤訊息"
		return jsonify({"error":true, "message":message}), 500

#requests.delete(url, params={key: value}, args)
@app.route("/api/user", methods=['DELETE'])
def logout():
	#clear tocken
	# data = None;
	# access_token = None;
	resp = jsonify({'logout': True})
	unset_jwt_cookies(resp)
	#return logged out successfully
	return jsonify({"ok": True}) 


# run--------------------------------------------------------------------------
if __name__ == '__main__':
	app.debug = True
	app.run(host='0.0.0.0',port=3000)