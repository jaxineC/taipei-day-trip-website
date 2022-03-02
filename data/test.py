import mysql.connector
import json


cnx = mysql.connector.connect(
  host='localhost',
  user='root', 
  password='pw4mysql0000',
  database='website',
)
cursor_query = cnx.cursor()


src = "taipei-attractions.json"
with open(src, mode="r", encoding="UTF-8") as file:
  data = json.load(file)

#---------------------------------------------------------------
col_list=[]
for n in data['result']['results'][0]:
  col_list.append(n)

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
  {col_list[12]} VARCHAR(255), 
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
#---------------------------------------------------------------

for attractions in  range(len(data['result']['results'])):
  col_list_indivisual=[]
  for items in data['result']['results'][attractions]:
    col_list_indivisual.append(items)
  col_list_individual_str = ', '.join(col_list_indivisual)

  val_list_indivisual=[]
  for items in data['result']['results'][attractions]:   
    x = data['result']['results'][attractions][items]
    val_list_indivisual.append(x)
  val_list_individual_str = str(val_list_indivisual).replace("[","").replace("]","")

  sql =f"INSERT INTO attractions ({col_list_individual_str}) VALUES ({val_list_individual_str});"
  cursor_query.execute(sql)
  cnx.commit()


cursor_query.close()
cnx.close()

# for individuals in data['result']['results']:
  # col_list_individual_str = str(list(individuals.keys()))
  # val_list_individual_str = str(list(individuals.values()))
  # sql = "INSERT INTO %s (%s) VALUES(%s);"
  # val = ("attractions", col_list_individual_str, val_list_individual_str)
  # cursor_query.execute(sql)
  # cnx.commit()

# for n in range(len(data['result']['results'])):     #individual dict/ 總筆數/ =>index
  
#   col_list_individual_str =
#   val_list_individual_str =

#   col_list_indivisual=list(data['result']['results'][n].keys())
#   col_indivisual_string=', '.join(col_list_indivisual)
#   values_indivisual= str(data['result']['results'][n].values())

#   sql = 'INSERT INTO %s (%s) VALUES(%s);'
#   val = ("attractions", col_list_individual_str, val_list_individual_str)
#   cursor_query.execute(sql,val)
#   cnx.commit()







