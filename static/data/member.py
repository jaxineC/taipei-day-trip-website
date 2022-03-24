import mysql.connector
import json

cnx = mysql.connector.connect(
  host='localhost',
  user='root', 
  password='pw4mysql0000',
  database='tpe',
) 
cursor_query = cnx.cursor()

#----------------------------------------------------------------------2)
sql= f'''CREATE TABLE member (
  id BIGINT AUTO_INCREMENT NOT NULL, 
  name VARCHAR(255) NOT NULL, 
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,   
  PRIMARY KEY (id),
  UNIQUE (email)
  );'''
cursor_query.execute(sql)
cnx.commit()

#----------------------------------------------------------------------3)
sql= f'''INSERT INTO member (name, email, password)
VALUES ('test', 'test', '0000');'''
cursor_query.execute(sql)
cnx.commit()
