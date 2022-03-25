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
# ------------- from blueprint 
from api.user import user


# settings-------------------------------------------------------------------
app=Flask(
	__name__,
	static_folder = 'static',
	static_url_path = '/'
)

app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True

# Flask blueprint
bp = Blueprint(
	'api', 
	__name__, 
	url_prefix='/api'
)
app.register_blueprint(user)
app.register_blueprint(user, url_prefix='/user')

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "key-to-use-jwt"
app.config["JWT_TOKEN_LOCATION"] = ["headers", "cookies"]
jwt = JWTManager(app)

# function----------------------------------------------------------------------
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


# run--------------------------------------------------------------------------
if __name__ == '__main__':
	app.debug = True
	app.run(host='0.0.0.0',port=3000)