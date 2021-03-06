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
attractions = Blueprint(
  'attractions', 
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
	cnx.close()
	return result


# APIs------------------------------------------------------------------------
@attractions.route("/attractions", methods=['GET'])
def get_attractions():
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
		input_msg= request.args.get('message','????????????')
		return jsonify({"error":True, "message": input_msg})
		# return (str(e))
	except Exception as e:
		input_msg= request.args.get('message','????????????')
		return jsonify({"error":True, "message": input_msg})
		# return (str(e))


		


