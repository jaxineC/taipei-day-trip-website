#import modules
#... json			X
#... requests   X
#... mysql connector+pooling
from flask import *
import mysql.connector
import mysql.connector.pooling as mypl
from dotenv import load_dotenv
import os

#settings
#... config
#... connections
#... connection pool
#NOTE:https://flask.palletsprojects.com/en/2.0.x/config/

app=Flask(__name__)
app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True

# load_dotenv()
# user = os.environ.get('USER')
# password = os.environ.get('password')

cnxpool = mypl.MySQLConnectionPool(
	host = "localhost",
	user = "root",
	password = "pw4mysql0000",
	database = "tpe",
	pool_name = "mypool",
	pool_size = 5,
)

# Pages
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


#APIs
#... 取得景點資料列表 fetch get
#... 分頁 每頁12筆 select 0-12 ------------->required@@....page 4 shows nothing???
#... 可 篩選景點名稱的關鍵字 無給定則不做篩選query string=>get
@app.route("/api/attractions", methods=['GET'])
def attractions():
	input_page= request.args.get('page',1)
	input_keyword= request.args.get('keyword')
	count = (int(input_page) -1)*12
	keyword = str(input_keyword)
	cnx1 = cnxpool.get_connection()
	cur = cnx1.cursor(dictionary=True)
	if input_keyword == None:
		sql = "SELECT * FROM attractions WHERE stitle IS NOT NULL LIMIT %s,12"
		val = (count,)
		cur.execute(sql,val)
	else:
		sql = "SELECT * FROM attractions WHERE stitle REGEXP %s LIMIT %s,12" 
		val = (keyword,count)
		cur.execute(sql,val)
	result = cur.fetchall()
	cur.close()
	cnx1.close() 
	return jsonify(
		{"nextPage": int(input_page)+1, "data": result})

@app.route("/api/attraction/<int:attractionId>")
def attractionId(attractionId):
	try:
		#https://docs.python.org/zh-tw/3/tutorial/errors.html
		id_str= str(attractionId)
		cnx2 = cnxpool.get_connection()
		cur = cnx2.cursor(dictionary=True)
		# sql = "SELECT _id WHERE _id = %s"
		# val = (id_str,)
		# cur.excute(sql,val)

		sql =	"SELECT _id, stitle, CAT1, xbody, address, info, MRT, latitude, longitude, file FROM attractions WHERE _id = %s"
		val = (id_str,)
		cur.execute(sql, val)
		result = cur.fetchall()
		cur.close()
		cnx2.close()
		return jsonify({"data":result})
	except:
		return jsonify({"error":True, "message": "自訂的錯誤訊息except"})


@app.route('/api/test/<name>')
def test(name):
  # return "The product is " + str(name)
	return "The product is " + str(name)

if __name__ == '__main__':
	app.debug = True
	app.run(host='0.0.0.0',port=3000)