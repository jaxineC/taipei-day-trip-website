import mysql.connector
import json

src = "taipei-attractions.json"
with open(src, mode="r", encoding="UTF-8") as file:
  data = json.load(file)

# for n in data['result']['results'][0]:   #all keys
#   print(n)  

# for n in data['result']['results'][0]:   #all values
#   result = data['result']['results'][0][n]
#   print(result)  

# for indivisual_attractions in data['result']['results']:
#   value_list=[]
#   for items in indivisual_attractions:
#     value_info = indivisual_attractions[items]
#     value_list.append(value_info)
# print(value_list)

# col_name= data['result']['results'][0]
# col_list=[]
# for n in col_name:
#   col_list.append(n)
# print(col_list)
# print(col_list[0])

# for n in data['result']['results']:
#   print(n['_id'])
# for n in data['result']['results'][0]:
#   i=0
#   i+=i
#   print(n[i])


cnx = mysql.connector.connect(
  host='localhost',
  user='root', 
  password='pw4mysql0000',
  database='website',
)
cursor_query = cnx.cursor()

# column_name= 'id'
# sql= f'CREATE TABLE attractions ({column_name} INT NOT NULL AUTO_INCREMENT, PRIMARY KEY ({column_name}));'
# cursor_query.execute(sql)
# result = cursor_query.fetchall()

col_list=[]
for n in data['result']['results'][0]:
  col_list.append(n)

# sql = f'''CREATE TABLE test (
#   {col_list[0]} VARCHAR(255) NOT NULL, 
#   {col_list[1]} VARCHAR(255) NOT NULL, 
#   {col_list[2]} DATE NOT NULL, 
#   {col_list[3]} DECIMAL(9,6) NOT NULL DEFAULT "0", 
#   {col_list[4]} VARCHAR(255) NOT NULL, 
#   {col_list[5]} DATE NOT NULL,
#   {col_list[6]} INT NOT NULL,
#   PRIMARY KEY ({col_list[6]})) CHARACTER SET utf8;'''
# cursor_query.execute(sql)

for indivisual_attractions in data['result']['results']:
  value_list=[]
  for items in indivisual_attractions:
    value_info = indivisual_attractions[items]
    value_list.append(value_info)
  sql = f'INSERT INTO attractions ({col_list}) VALUES({value_list});'
  cursor_query.execute(sql)

cnx.commit()
cursor_query.close()
cnx.close()

