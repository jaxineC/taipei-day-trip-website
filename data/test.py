
import mysql.connector
import json

cnx = mysql.connector.connect(
  host='localhost',
  user='root', 
  password='pw4mysql0000',
  database='tpe',
) 
cursor_query = cnx.cursor()


src = "taipei-attractions.json"
with open(src, mode="r", encoding="UTF-8") as file:
  data = json.load(file)

print(type(data))
# for n in  range(len(data['result']['results'])):
#   file_ls_0 = data['result']['results'][n]['file'].lower().replace("ghttps","g+https").split("+")
#   file_ls_1 = [x for x in file_ls_0 if (".jpg" or ".png") in x]
#   data['result']['results'][n]['file'] = '['+', '.join(file_ls_1)+']'

# print (data['result']['results'][2]['file'])
# print (type(data['result']['results'][2]['file']))

# file_list= data['result']['results'][1]['file'].lower().replace("ghttps","g+https").split("+")
# result = [x for x in file_list if ".jpg" or ".png" in x]
# print(result)

# for x in range(len(data['result']['results'])):
#   data['result']['results'][x]['file'].replace("https://","+https://").split("+")
#   print(data['result']['results'][x]['file'])





