import mysql from 'mysql' 
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'

import UserLoginHandler from "./controllers/user/userLoginHandler.js";
import UserRegisterHandler from './controllers/user/UserRegisterHandler.js';
import RequestClassHandler from './controllers/bloodbank/RequestClassHandler.js';

import EmployeeLoginHandler from './controllers/employee/EmployeeLoginHandler.js';
import EmployeeRegisterHandler from './controllers/employee/EmployeeRegisterHandler.js';
import UpdateBlood from './controllers/bloodbank/UpdateStockHandler.js'
import UpdateHealthHandler from './controllers/bloodbank/UpdateHealthHandler.js';
import HandleRequestHandler from './controllers/bloodbank/HandleRequestHandler.js';

import DashboardHandler from './controllers/dashboard/DashboardHandler.js';
import SearchHandler from './controllers/bloodbank/SearchHandler.js';

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "bbms",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//user functionalities
UserRegisterHandler(app, db);
UserLoginHandler(app, db);
RequestClassHandler(app, db);

//employee functionalities
EmployeeRegisterHandler(app, db);
EmployeeLoginHandler(app, db);
UpdateHealthHandler(app, db);
HandleRequestHandler(app, db);

//bloodbank functionalities
DashboardHandler(app, db);
UpdateBlood(app, db);
SearchHandler(app, db);

app.listen(3001, (err) => {
  if (err) throw err;
  else console.log("listening to port : 3001");
});
