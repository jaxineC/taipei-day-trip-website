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
#過濾資料中，不是 JPG 或 PNG 的檔案，
#... use data from json file for column names to 
#... 2) CREATE TABLE
#... 3) INSERT INTO data 

#----------------------------------------------------------------------1)
src = "taipei-attractions.json"
with open(src, mode="r", encoding="UTF-8") as file:
  data = json.load(file)

# for n in  range(len(data['result']['results'])):
#   file_ls_0 = data['result']['results'][n]['file'].lower().replace("ghttps","g+https").split("+")
#   file_ls_1 = [x for x in file_ls_0 if (".jpg" or ".png") in x]
#   data['result']['results'][n]['file'] = '['+', '.join(file_ls_1)+']'

col_list=[]
for n in data['result']['results'][0]:
  col_list.append(n)


for attractions in  range(len(data['result']['results'])):
 
  file_ls_0 = data['result']['results'][attractions]['file'].lower().replace("ghttps","g+https").split("+")
  file_ls_1 = [x for x in file_ls_0 if (".jpg" or ".png") in x]
  data['result']['results'][attractions]['file'] = '['+', '.join(file_ls_1)+']'
  
  sql ="UPDATE attractions SET file= %s WHERE _id = %s;"
  val =(data['result']['results'][attractions]['file'],data['result']['results'][attractions]['_id'])
  cursor_query.execute(sql,val)
  cnx.commit()

#... 4) 換名字
#----------------------------------------------------------------------ˋ)
sql ='''ALTER TABLE attractions 
  RENAME COLUMN _id TO id,
  RENAME COLUMN stitle TO name,
  RENAME COLUMN CAT1 TO category,
  RENAME COLUMN xbody TO description,
  RENAME COLUMN MRT TO mrt,
  RENAME COLUMN file TO images;'''
cursor_query.execute(sql)
cnx.commit()

cursor_query.close()
cnx.close()



#run apps: NOPE
