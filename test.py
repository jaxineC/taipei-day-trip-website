def divide(x, y):
    # print ('entering divide')
    # result = 0
    try:
      result = x/y
      return f'no error, result = {result}'
    except:
      # return 'error'
      return test

    # finally:
    #     print ('exit')

    

# print (divide(1, 1))
print (divide(1, 0))

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


# import math
# a = None
# b = 0
# if a != None: b = +1

# print(b)
# print(type(a))
# print(type(b))