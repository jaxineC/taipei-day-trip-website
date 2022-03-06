x = '["https://www.travel.taipei/d_upload_ttn/sceneadmin/pic/11000340.jpg", "https://www.travel.taipei/d_upload_ttn/sceneadmin/image/a0/b0/c0/d906/e6/f186/809f30db-7079-421f-a625-7baa8ec21874.jpg", "https://www.travel.taipei/d_upload_ttn/sceneadmin/pic/11000341.jpg", "https://www.travel.taipei/d_upload_ttn/sceneadmin/image/a0/b0/c0/d878/e420/f173/04765739-d40f-4d13-b271-8d5f9e5f44bd.jpg", "https://www.travel.taipei/d_upload_ttn/sceneadmin/pic/11000342.jpg", "https://www.travel.taipei/d_upload_ttn/sceneadmin/image/a0/b0/c0/d20/e983/f199/866b5059-8fd7-4719-964c-51d2f78675d5.jpg", "https://www.travel.taipei/d_upload_ttn/sceneadmin/image/a0/b0/c0/d546/e538/f353/ed2464d1-bc28-4790-96cd-5216db2c14f5.jpg", "https://www.travel.taipei/d_upload_ttn/sceneadmin/image/a0/b0/c1/d814/e111/f733/aed9d34d-890c-49fd-83ca-f76f38e4b94b.jpg"]'
y=eval(x)

print(y)
print(type(y))

# import mysql.connector
# import json

# cnx = mysql.connector.connect(
#   host='localhost',
#   user='root', 
#   password='pw4mysql0000',
#   database='tpe',
# ) 
# cursor_query = cnx.cursor()



# #----------------------------------------------------------------------1)
# src = "taipei-attractions.json"
# with open(src, mode="r", encoding="UTF-8") as file:
#   data = json.load(file)


# col_list=[]
# for n in data['result']['results'][0]:
#   col_list.append(n)

# #----------------------------------------------------------------------2)
# sql= f'''CREATE TABLE attractions (
#   {col_list[0]} VARCHAR(1024) NOT NULL, 
#   {col_list[1]} VARCHAR(255) NOT NULL, 
#   {col_list[2]} DATE NOT NULL, 
#   {col_list[3]} DECIMAL(9,6) NOT NULL DEFAULT "0", 
#   {col_list[4]} VARCHAR(255) NOT NULL, 
#   {col_list[5]} DATE NOT NULL,
#   {col_list[6]} INT NOT NULL, 
#   {col_list[7]} VARCHAR(255), 
#   {col_list[8]} BIGINT NOT NULL, 
#   {col_list[9]} INT NOT NULL, 
#   {col_list[10]} VARCHAR(255) NOT NULL, 
#   {col_list[11]} VARCHAR(255) NOT NULL, 
#   {col_list[12]} VARCHAR(1024), 
#   {col_list[13]} VARCHAR(255) NOT NULL,
#   {col_list[14]} TEXT NOT NULL, 
#   {col_list[15]} VARCHAR(255) NOT NULL, 
#   {col_list[16]} DECIMAL(9,6) NOT NULL DEFAULT "0", 
#   {col_list[17]} TEXT NOT NULL, 
#   {col_list[18]} BIGINT NOT NULL AUTO_INCREMENT, 
#   {col_list[19]} DATE NOT NULL, 
#   {col_list[20]} VARCHAR(255) NOT NULL, 
#   PRIMARY KEY ({col_list[18]}));'''
# cursor_query.execute(sql)
# cnx.commit()

# #----------------------------------------------------------------------3)
# for attractions in  range(len(data['result']['results'])):
#   col_list_indivisual=[]
#   for items in data['result']['results'][attractions]:
#     col_list_indivisual.append(items)
#   col_list_individual_str = ', '.join(col_list_indivisual)

#   val_list_indivisual=[]
#   for items in data['result']['results'][attractions]:   
#     x = data['result']['results'][attractions][items]
#     val_list_indivisual.append(x)
#   val_list_individual_str = str(val_list_indivisual).replace("[","").replace("]","").replace("None","null")

#   sql =f"INSERT INTO attractions ({col_list_individual_str}) VALUES ({val_list_individual_str});"
#   cursor_query.execute(sql)
#   cnx.commit()

#   file_ls_0 = data['result']['results'][attractions]['file'].lower().replace("ghttps","g+https").split("+")
#   file_ls_1 = [x for x in file_ls_0 if (".jpg" or ".png") in x]
#   data['result']['results'][attractions]['file'] = '['+', '.join(file_ls_1)+']'
  
#   sql ="UPDATE attractions SET file= %s WHERE (_id = %s);"
#   val =(data['result']['results'][attractions]['file'],data['result']['results'][attractions]['_id'])
#   cursor_query.execute(sql,val)
#   cnx.commit()

# #... 4) 換名字
# #----------------------------------------------------------------------ˋ)
# sql ='''ALTER TABLE attractions 
#   RENAME COLUMN _id TO id,
#   RENAME COLUMN stitle TO name,
#   RENAME COLUMN CAT1 TO category,
#   RENAME COLUMN xbody TO description,
#   RENAME COLUMN MRT TO mrt,
#   RENAME COLUMN info TO transport,
#   RENAME COLUMN file TO images;'''
# cursor_query.execute(sql)
# cnx.commit()

# cursor_query.close()
# cnx.close()