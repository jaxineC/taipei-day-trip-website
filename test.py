
from flask import *
import mysql.connector
import mysql.connector.pooling as mypl
from dotenv import load_dotenv
import os

app=Flask(__name__)
app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True

load_dotenv()
user = os.environ.get('USER')
password = os.environ.get('password')

print(user, password)


# print(type(obj))
# if type(obj) != int:
#   print("not okay")
# else:
#   print("okay")