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
  password='pw4mysql0000',
  database='tpe',
)
cursor_query = cnx.cursor()


#create table:
#... 1) open/read json file
#... use data from json file for column names to 
#... 2) CREATE TABLE
#... 3) INSERT INTO data 

src = "taipei-attractions.json"
with open(src, mode="r", encoding="UTF-8") as file:
  data = json.load(file)

col_list=[]
for n in data['result']['results'][0]:
  col_list.append(n)




sql= f'''CREATE TABLE attractions (
  {col_list[0]} VARCHAR(255) NOT NULL, 
  {col_list[1]} VARCHAR(255) NOT NULL, 
  {col_list[2]} DATE NOT NULL, 
  {col_list[3]} DECIMAL(9,6) NOT NULL DEFAULT "0", 
  {col_list[4]} VARCHAR(255) NOT NULL, 
  {col_list[5]} DATE NOT NULL,
  {col_list[6]} INT NOT NULL, 
  {col_list[7]} VARCHAR(255) NOT NULL, 
  {col_list[8]} INT NOT NULL, 
  {col_list[9]} INT NOT NULL, 
  {col_list[10]} VARCHAR(255) NOT NULL, 
  {col_list[11]} VARCHAR(255) NOT NULL, 
  {col_list[12]} VARCHAR(255) NOT NULL, 
  {col_list[13]} VARCHAR(255) NOT NULL,
  {col_list[14]} VARCHAR(512) NOT NULL, 
  {col_list[15]} VARCHAR(255) NOT NULL, 
  {col_list[16]} DECIMAL(9,6) NOT NULL DEFAULT "0", 
  {col_list[17]} VARCHAR(255) NOT NULL, 
  {col_list[18]} BIGINT NOT NULL AUTO_INCREMENT, 
  {col_list[19]} DATE NOT NULL, 
  {col_list[20]} VARCHAR(255) NOT NULL, 
  PRIMARY KEY ({col_list[18]}))CHARACTER SET utf8;'''

cursor_query.execute(sql, value)
cnx.commit()

for n in data['result']['results']:
  col_list_indivisual=[]
  for items in data['result']['results'][0]:
    col_list_indivisual.append(items)
  col_indivisual_string=', '.join(col_list_indivisual)
  values_indivisual=data['result']['results'][0][n]
  sql = f'INSERT INTO attractions ({col_indivisual_string}) VALUES({values_indivisual});'
  cursor_query.execute(sql)
  cnx.commit()

cursor_query.close()
cnx.close()



#run apps: NOPE




