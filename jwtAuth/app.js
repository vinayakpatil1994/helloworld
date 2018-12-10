/**
 * To get started install
 * express bodyparser jsonwebtoken express-jwt
 * via npm
 * command :-
 * npm install express bodyparser jsonwebtoken express-jwt --save
 */

// Bringing all the dependencies in
var mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");

// Instantiating the express app
const app = express();

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "reactData",
  insecureAuth: false
});

// See the react auth blog in which cors is required for access
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// INstantiating the express-jwt middleware
const jwtMW = exjwt({
  secret: "heapTrace"
});

// LOGIN ROUTE
app.post("/api/login", (req, res) => {
  //const { username, password } = req.body;
  var email = req.body.emailid;
  var password = req.body.password;
  console.log(email, password);
  // Use your DB ORM logic here to find user and compare password
  connection.query("SELECT * FROM users WHERE email = ?", [email], function(
    error,
    results,
    fields
  ) {
    if (error) {
      console.log("error ocurred", error);
      res.send({
        code: 400,
        failed: "error ocurred"
      });
    } else {
      console.log("The solution is: ", results);
      if (results.length > 0) {
        if (results[0].password == password) {
          let token = jwt.sign({ username: email }, "heapTrace", {
            expiresIn: 300
          }); // Sigining the token
          res.json({
            code: 200,
            sucess: true,
            err: null,
            token
          });
        } else {
          res.send({
            code: 204,
            success: "Email and password does not match"
          });
        }
      } else {
        res.send({
          code: 204,
          success: "Email does not exits"
        });
      }
    }
  });
});

app.post("/register", (req, res) => {
  var today = new Date();
  var users = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.userid,
    password: req.body.password,
    created: today,
    modified: today,
    role: req.body.role
  };
  connection.query("INSERT INTO users SET ?", users, function(
    error,
    results,
    fields
  ) {
    if (error) {
      console.log("error ocurred", error);
      res.send({
        code: 400,
        failed: "error ocurred"
      });
    } else {
      //console.log('The solution is: ', results);
      res.send({
        code: 200,
        success: "user registered sucessfully"
      });
    }
  });
});

app.get("/users", jwtMW /* Using the express jwt MW here */, (req, res) => {
  console.log(jwtMW);

  connection.query("SELECT * FROM users ", function(error, results, fields) {
    if (error) {
      console.log("error ocurred", error);
      res.send({
        code: 400,
        failed: "error ocurred"
      });
    } else {
      //console.log('The solution is: ', results);
      res.status(200).send(results);
    }
  });
});

app.post("/addTask", jwtMW, (req, res) => {
  //var today = new Date();
  debugger;
  var task = {
    taskId: req.body.taskId,
    taskName: req.body.taskName,
    status: req.body.status
  };
  connection.query("INSERT INTO Tasks SET ?", task, function(
    error,
    result,
    fields
  ) {
    if (error) {
      console.log("error ocurred", error);
      res.send({
        code: 400,
        failed: "error ocurred"
      });
    } else {
      console.log("The solution is: ", result);
      res.send({
        code: 200,
        success: "task Added sucessfully"
      });
    }
  });
});

app.get("/tasks", jwtMW /* Using the express jwt MW here */, (req, res) => {
  connection.query("SELECT * FROM Tasks ", function(error, results, fields) {
    if (error) {
      console.log("error ocurred", error);
      res.send({
        code: 400,
        failed: "error ocurred"
      });
    } else {
      //console.log('The solution is: ', results);
      res.status(200).send(results);
    }
  });
});

app.delete(
  "/delete/:id",
  jwtMW /* Using the express jwt MW here */,
  (req, res) => {
    var id = req.params.id;
    console.log("inside delete method ........");
    connection.query("DELETE FROM Tasks WHERE taskId = ?", [id], function(
      error,
      results,
      fields
    ) {
      if (error) {
        console.log("error ocurred", error);
        res.send({
          code: 400,
          failed: "error ocurred"
        });
      } else {
        console.log("The solution is: ", results);
        res.send({
          code: 200,
          success: "task deleted sucessfully"
        });
      }
    });
  }
);

app.put("/updateTask/:id", jwtMW, (req, res) => {
  console.log("into the update row finction ...............");
  var query = "UPDATE Tasks SET taskName = ? , status = ? WHERE taskId =?";
  connection.query(
    query,
    [req.body.taskName, req.body.status, req.params.id],
    function(error, result, fields) {
      if (error) {
        console.log("error ocurred", error);
        res.send({
          code: 400,
          failed: "error ocurred"
        });
      } else {
        console.log("The solution is: ", result);
        res.send({
          code: 200,
          success: "task updated sucessfully"
        });
      }
    }
  );
});

app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    // Send the error rather than to show it on the console
    res.status(401).send(err);
  } else {
    next(err);
  }
});

// Starting the app on PORT 3000
const PORT = 8080;
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Magic happens on port ${PORT}`);
});
