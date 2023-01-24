import bodyParser from "body-parser";
var urlencodedParser = bodyParser.urlencoded({ extended: false }); //middileware

const EmployeeLoginHandler = (app, db) => {
  app.post("/login/emp", (req, res) => {
    const userName = req.body.empUserName;
    const password = req.body.empPassword;

    const sqlSelect =
      "SELECT * FROM emp_login WHERE userName= ? AND password=?";

    db.query(sqlSelect, [userName, password], (err, result) => {
      console.log(result);

      if (err) {
        res.send({ err: err });
        console.log("**ERROR**");
      } else if (result.length > 0) {
        res.send(result);
        console.log("**RESULT SENT TO FRONT END**");
      } else {
        res.send({ message: "wrong username/password combination!" });
        console.log("**INVALID COMBINATION**");
      }
    });
  });
};

export default EmployeeLoginHandler;
