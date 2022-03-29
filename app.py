# import modules-------------------------------------------------------------
from flask import *
import mysql.connector
import mysql.connector.pooling as mypl
import json
import jwt
# <<<<<<<<<<<<<<<<< module/blueprint/package? >>>>>>>>>>>>>>>>>>>> 
from api.user import user
from api.attractions import attractions
from api.attraction import attraction
from api.booking import booking


# settings -------------------------------------------------------------------
app = Flask(
	__name__,
	static_folder = 'static',
	static_url_path = '/'
)

app.config["JSON_AS_ASCII"] = False
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Flask blueprint
app.register_blueprint(user)
app.register_blueprint(attractions)
app.register_blueprint(attraction)
app.register_blueprint(booking)


# PyJWT
key = "secret"



# function ----------------------------------------------------------------------
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


# run--------------------------------------------------------------------------
if __name__ == '__main__':
	app.debug = True
	app.run(host='0.0.0.0',port=3000)