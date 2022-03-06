
from flask import *
import mysql.connector
import mysql.connector.pooling as mypl

app=Flask(__name__)
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
cnx = cnxpool.get_connection()
cur = cnx.cursor(dictionary=True)
#----------------------------------------


# def divide(x, y):
#     # print ('entering divide')
#     # result = 0
#     try:
#       result = x/y
#       return f'no error, result = {result}'
#     except:
#       # return 'error'
#       return test

#     # finally:
#     #     print ('exit')

    

# # print (divide(1, 1))
# print (divide(1, 0))

# from flask import *
# import mysql.connector
# import mysql.connector.pooling as mypl
# import math

# app=Flask(__name__)
# app.config["JSON_AS_ASCII"]=False
# app.config["TEMPLATES_AUTO_RELOAD"]=True

# cnxpool = mypl.MySQLConnectionPool(
# 	host = "localhost",
# 	user = "root",
# 	password = "pw4mysql0000",
# 	database = "tpe",
# 	pool_name = "mypool",
# 	pool_size = 5,
# )
# cnx1 = cnxpool.get_connection()
# cur = cnx1.cursor(dictionary=True)
# nextpage = 0
# sql = "SELECT COUNT(name) FROM attractions WHERE id = 1 LIMIT %s,12"
# val = (0,)
# cur.execute(sql,val)
# count = cur.fetchone()
# # if count['COUNT(name)'] != None: nextpage =+1
# nextpage =+1

# try:
#   print(hello)
# except:
#   print("something is wrong")
# # # print(count['COUNT(name)'])
# # print(nextpage)
# # # print(type(count))
# # print(type(nextpage))
# cur.close()
# cnx1.close() 


#----------------------------------------
input_page= 1
input_keyword= '溫泉'
if int(input_page)==0:
  number = 0
  number2 = 0
  currentPage = 1
else:
  number = (int(input_page) -1)*12
  number2 = int(input_page)*12
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
	elif (count['COUNT(name)'] - int(input_page)*12) >0 : nextpage=currentPage+1
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
	if count == None: nextpage= None
	elif (count['COUNT(name)'] - currentPage*12) >0 : nextpage=currentPage+1
	else: nextpage=None
cur.close()
cnx1.close() 

print(result[0])
print(type(result[0]) )




# a = None
# nextpage = 0
# if a != None: b = +1
# print(b)

# a = 1
# nextpage = 0
# if a != None: b = +1
# print(b)

#--------------------------------------------------------
cur.close()
cnx.close() 
# print(b)
# print(type(a))
# print(type(b))