const DashboardHandler = (app, db) => {
  app.get("/home", (req, res) => {
    const sqlSelect = "SELECT * from blood_stocks;";

    db.query(sqlSelect, (err, result) => {
      res.send(result);
      //console.log("blood from server", result);
    });
  });
};

export default DashboardHandler;
