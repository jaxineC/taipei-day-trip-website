
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

input_page= 1
input_keyword= 溫泉
if int(input_page)==0:
  number = 0
  number2 = 0
  currentPage = 1
else:
  number = (int(input_page) -1)*12
  number2 = int(input_page)*12
  currentPage = int(input_page)
print(int(input_page) )
print(type(int(input_page)) )





# for n in  range(len(data['result']['results'])):
#   file_ls_0 = data['result']['results'][n]['file'].lower().replace("ghttps","g+https").split("+")
#   data['result']['results'][n]['file'] = [x for x in file_ls_0 if (".jpg" or ".png") in x]
#   # data['result']['results'][n]['file'] = '['+', '.join(file_ls_1)+']'
# print(data['result']['results'][0]['file'][0])


  # for x in range(len(data['result']['results'][n]['file'])):
  #   print(data['result']['results'][n]['file'][x])

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





