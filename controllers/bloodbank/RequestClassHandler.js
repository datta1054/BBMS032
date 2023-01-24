var req_id = 0;
const RequestClassHandler = (app, db) => {
  app.post("/request", (req, res) => {
    const blood_group = req.body.blood_group;
    const unit = req.body.unit;
    const user_id = 8;
    const num = (Math.ceil(Math.random() * 1000) % 50) + 15;
    req_id = num;
    console.log(num);
    console.log("bloodgroup : " + blood_group, unit);

    const sqlSelect = "SELECT * FROM blood_stocks WHERE blood_group=?";
    const sqlInsert =
      "INSERT INTO  user_request(user_id,req_id,blood_group,unit) VALUES (?,?,?,?)";
    db.query(sqlSelect, [blood_group], (err, result) => {
      if (err) {
        console.log("no unit");
        console.log("**ERROR**" + err);
      } else {
        result = JSON.parse(JSON.stringify(result));
        console.log(result[0].unit);
        if (unit <= result[0].unit) {
          db.query(
            sqlInsert,
            [user_id, req_id, blood_group, unit],
            (err, result) => {
              if (err) {
                console.log(blood_group, unit);
                console.log("**ERROR ACCEPTING REQUEST!" + err);
                res.send({
                  message: "ERROR ACCEPTING REQUEST!",
                });
              } else {
                const change =
                  "update bs.unit=bs.unit-rq.unit from blood_stocks bs ,user_request rq where rq.blood_group=?";
                res.send({
                  message: "REQUEST ACCEPETED COLLECT IT FROM THE BLOOD BANK",
                });
              }
            }
          );
        } else {
          res.send({ message: "INSUFFICIENT STOCKS!" });
        }
      }
    });
  });
};

export default RequestClassHandler;
