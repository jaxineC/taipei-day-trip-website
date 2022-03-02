import mysql.connector
import json

src = "taipei-attractions.json"
with open(src, mode="r", encoding="UTF-8") as file:
  data = json.load(file)

# col_list_indivisual=list(data['result']['results'][0].keys())
# result=  ', '.join(col_list_indivisual)

# col_list_indivisual=[]
# for items in data['result']['results'][0]:
#   col_list_indivisual.append(items)
# col_indivisual_string=', '.join(col_list_indivisual)
# print(col_indivisual_string)
# print(type(col_indivisual_string))




# x=data['result']['results'][0]
# test=list(x.keys())
# result=', '.join(test)
# print(result)

# values_indivisual=data['result']['results'][0].values()
# print(values_indivisual)



# for n in data['result']['results'][0]:   #all keys
#   print(n)  

  
for x in data['result']['results']:
  print(x["MRT"])

# for indivisual_attractions in data['result']['results']:
#   value_list=[]
#   for items in indivisual_attractions:
#     value_list.append(indivisual_attractions[items])
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

# column_name= 'id'
# sql= f'CREATE TABLE attractions ({column_name} INT NOT NULL AUTO_INCREMENT, PRIMARY KEY ({column_name}));'
# cursor_query.execute(sql)
# result = cursor_query.fetchall()