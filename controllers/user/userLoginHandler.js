const UserLoginHandler = (app, db) => {
  app.post("/login/usr", (req, res) => {
    const userUserName = req.body.userUserName;
    const userPassword = req.body.userPassword;

    const sqlSelect =
      "SELECT * FROM user_login WHERE userUserName = ? AND userPassword = ?";

    db.query(sqlSelect, [userUserName, userPassword], (err, result) => {
      console.log(result);
      if (err) {
        res.send({ err: err });
        console.log("**ERROR**");
      }

      if (result.length > 0) {
        res.send("nextpage");
        console.log("**RESULT SENT TO FRONT END**");
      } else {
        res.send({ message: "wrong username/password combination!" });
        console.log("**INVALID COMBINATION**");
      }
    });
  });
};

export default UserLoginHandler;
