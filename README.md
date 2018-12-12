# reactjs-auth
This project has mainly two parts
1. Frontend 
  - Frontend is in reactJs 
  - More detail are present in the frontend folder 
  
2. Backend
  - Backend is in nodeJs 
  - Jwt authentication with mysql as a database
  - More detail are present in the jwtAuth folder 
  
3. Database Tables and details
  
    Database name- reactData

	  Tasks Table deescription
   
    +----------+--------------+------+-----+---------+-------+
    | Field    | Type         | Null | Key | Default | Extra |
    +----------+--------------+------+-----+---------+-------+
    | taskId   | int(11)      | YES  |     | NULL    |       |
    | taskName | varchar(255) | YES  |     | NULL    |       |
    | status   | varchar(255) | YES  |     | NULL    |       |
    +----------+--------------+------+-----+---------+-------+

      users Table description

    +------------+--------------+------+-----+---------+----------------+
    | Field      | Type         | Null | Key | Default | Extra          |
    +------------+--------------+------+-----+---------+----------------+
    | id         | int(11)      | NO   | PRI | NULL    | auto_increment |
    | first_name | varchar(100) | NO   |     | NULL    |                |
    | last_name  | varchar(100) | NO   |     | NULL    |                |
    | password   | varchar(255) | NO   |     | NULL    |                |
    | created    | datetime     | NO   |     | NULL    |                |
    | modified   | datetime     | NO   |     | NULL    |                |
    | role       | varchar(255) | YES  |     | NULL    |                |
    | email      | varchar(255) | YES  |     | NULL    |                |
    +------------+--------------+------+-----+---------+----------------+

