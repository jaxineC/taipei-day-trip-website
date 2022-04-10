

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
sql= f'''CREATE TABLE `orders` (
  `orderID` BIGINT AUTO_INCREMENT NOT NULL, 
  `order_number` VARCHAR(255) NOT NULL, 
  `memberId`  BIGINT NOT NULL, 
  attractionId BIGINT NOT NULL,  
  `date` DATE NOT NULL, 
  `time` VARCHAR(255) NOT NULL,  
  `price` INT NOT NULL, 
  `payment_date` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `payment` VARCHAR(255) NOT NULL,  
  PRIMARY KEY (orderID),
  FOREIGN KEY (`memberId`) REFERENCES member(`id`),
  UNIQUE INDEX `index_orders` (`order_number` )
  );'''
cursor_query.execute(sql)
cnx.commit()

#----------------------------------------------------------------------1) test
sql= f'''INSERT INTO `tpe`.`orders` ( `order_number`, `memberId`, `attractionId`, `date`, `time`, `price`, `payment`) 
VALUES ('202204102107-MEM-0001', '1', '1', '2022/03/30', 'afternoon', '2500', "未付款");'''
cursor_query.execute(sql)
cnx.commit()


#----------------------------------------------------------------------1) close connection
cursor_query.close()
cnx.close()
