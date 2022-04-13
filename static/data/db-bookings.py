

# import build-in module ------------------------------------
import mysql.connector
import json

# connect to db ------------------------------------
cnx = mysql.connector.connect(
  host='localhost',
  user='root', 
  password='pw4mysql0000',
  database='tpe',
) 
cursor_query = cnx.cursor()

#----------------------------------------------------------------------1) create table
sql= f'''CREATE TABLE `bookings` (
  `bookingID` BIGINT AUTO_INCREMENT NOT NULL, 
  `memberId`  BIGINT NOT NULL, 
  attractionId BIGINT NOT NULL,  
  `date` DATE NOT NULL, 
  `time` VARCHAR(255) NOT NULL,  
  `price` INT NOT NULL, 
  PRIMARY KEY (bookingID),
  FOREIGN KEY (`memberId`) REFERENCES member(`id`),
  UNIQUE (`bookingID`),
  INDEX `index_booking` (`memberId`)
  );'''
cursor_query.execute(sql)
cnx.commit()

#----------------------------------------------------------------------1) create index/alter table on  member
# sql= f'''CREATE INDEX index_userId
# ON member (email);
# '''
# cursor_query.execute(sql)
# cnx.commit()


#----------------------------------------------------------------------1) test
sql= f'''INSERT INTO `tpe`.`bookings` ( `memberId`, `attractionId`, `date`, `time`, `price`) 
VALUES ('1', '1', '2022/03/30', 'afternoon', '2500');'''
cursor_query.execute(sql)
cnx.commit()


#----------------------------------------------------------------------1) close connection
cursor_query.close()
cnx.close()
