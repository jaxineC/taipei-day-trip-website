#----for loop + sql----
#----JSON_TABLE----

#import modules:
#... mysql connector
#... json parse?
import mysql.connector
import json


#basic settings:
#... config for connection
#... connect to db
cnx = mysql.connector.connect(
  host='localhost',
  user='root', 
  password='5F1F3E6AA62AAA4D6B9853AF94111B4C62B04A4F',
  database='tpe',
)
cursor_query = cnx.cursor()


#create table:
#... 1) open/read json file
#... use data from json file for column names to 
#... 2) CREATE TABLE
#... 3) INSERT INTO data 

#----------------------------------------------------------------------1)
src = "taipei-attractions.json"
with open(src, mode="r", encoding="UTF-8") as file:
  data = json.load(file)

col_list=[]
for n in data['result']['results'][0]:
  col_list.append(n)

#----------------------------------------------------------------------2)
sql= f'''CREATE TABLE attractions (
  {col_list[0]} VARCHAR(1024) NOT NULL, 
  {col_list[1]} VARCHAR(255) NOT NULL, 
  {col_list[2]} DATE NOT NULL, 
  {col_list[3]} DECIMAL(9,6) NOT NULL DEFAULT "0", 
  {col_list[4]} VARCHAR(255) NOT NULL, 
  {col_list[5]} DATE NOT NULL,
  {col_list[6]} INT NOT NULL, 
  {col_list[7]} VARCHAR(255), 
  {col_list[8]} BIGINT NOT NULL, 
  {col_list[9]} INT NOT NULL, 
  {col_list[10]} VARCHAR(255) NOT NULL, 
  {col_list[11]} VARCHAR(255) NOT NULL, 
  {col_list[12]} VARCHAR(1024), 
  {col_list[13]} VARCHAR(255) NOT NULL,
  {col_list[14]} TEXT NOT NULL, 
  {col_list[15]} VARCHAR(255) NOT NULL, 
  {col_list[16]} DECIMAL(9,6) NOT NULL DEFAULT "0", 
  {col_list[17]} TEXT NOT NULL, 
  {col_list[18]} BIGINT NOT NULL AUTO_INCREMENT, 
  {col_list[19]} DATE NOT NULL, 
  {col_list[20]} VARCHAR(255) NOT NULL, 
  PRIMARY KEY ({col_list[18]}))CHARACTER SET utf8;'''
cursor_query.execute(sql)
cnx.commit()

#----------------------------------------------------------------------3)
for attractions in  range(len(data['result']['results'])):
  col_list_indivisual=[]
  for items in data['result']['results'][attractions]:
    col_list_indivisual.append(items)
  col_list_individual_str = ', '.join(col_list_indivisual)

  val_list_indivisual=[]
  for items in data['result']['results'][attractions]:   
    x = data['result']['results'][attractions][items]
    val_list_indivisual.append(x)
  val_list_individual_str = str(val_list_indivisual).replace("[","").replace("]","").replace("None","null")

  sql =f"INSERT INTO attractions ({col_list_individual_str}) VALUES ({val_list_individual_str});"
  cursor_query.execute(sql)
  cnx.commit()

#update table
#過濾資料中，不是 JPG 或 PNG 的檔案，
#file:[url, url, url,...]
#----------------------------------------------------------------------4)
# for attractions in  range(len(data['result']['results'])):
#   data['result']['results'][attractions]['file'].split("https")

cursor_query.close()
cnx.close()



#run apps: NOPE




