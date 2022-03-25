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

# from model.api import app2
# app.register_blueprint(app2)


# settings-------------------------------------------------------------------
app=Flask(
	__name__,
	static_folder = 'static',
	static_url_path = '/'
)

app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True

# Flask blueprint
bp = Blueprint('auth', __name__, url_prefix='/auth')

# Connect to MySQL
cnxpool = mypl.MySQLConnectionPool(
	host = "localhost",
	user = "root",
	password = "pw4mysql0000",
	database = "tpe",
	pool_name = "mypool",
	pool_size = 5,
)
# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "key-to-use-jwt"
app.config["JWT_TOKEN_LOCATION"] = ["headers", "cookies"]
jwt = JWTManager(app)

# functions----------------------------------------------------------------------

# mysql
def dbQuery(sql,injection) :
	cnx = cnxpool.get_connection()
	cursor = cnx.cursor(dictionary=True)
	cursor.execute(sql, injection)
	result = cursor.fetchone()
	cnx.close()
	return result


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
		cnx = cnxpool.get_connection()
		cur = cnx.cursor(dictionary=True)
		
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
		cnx.close() 
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
		cnx = cnxpool.get_connection()
		cur = cnx.cursor(dictionary=True)
		sql =	"SELECT id,  name, category, description, address, transport, mrt, latitude, images FROM attractions WHERE id = %s"
		val = (id_str,)
		cur.execute(sql, val)
		result = cur.fetchall()
		cur.close()
		cnx.close()
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
		return jsonify({"error": True,"message": message}) , 500
		# return e


@app.route("/api/user", methods=['GET'])
#verify tocken
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

    


@app.route("/api/user", methods=['POST'])
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

#requests.delete(url, params={key: value}, args)
@app.route("/api/user", methods=['DELETE'])
def logout():
	#clear tocken
	resp = jsonify({'logout': True})
	return jsonify({"ok": True}) 


# run--------------------------------------------------------------------------
if __name__ == '__main__':
	app.debug = True
	app.run(host='0.0.0.0',port=3000)