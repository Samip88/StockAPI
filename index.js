const express = require('express');
const sqlite3 = require('sqlite3').verbose();


const app = express();

let db = new sqlite3.Database('D:/Project/Intern/Stock/stocktrade.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    else{
    console.log('Connected to the stocktrade.db SQLite database.');}
});


app.get('/', (req, res) => {
    res.json("Welcome");
});

app.get('/stock/:startdate/:enddate', (req, res) => {
    const startdate = req.params.startdate;
    const enddate = req.params.enddate;
  
    db.all(`SELECT * FROM Stock WHERE last_updated BETWEEN ? AND ?`, [startdate, enddate], (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      res.send(rows);
    });
});

app.get('/stock/:symbol/:startdate/:enddate', (req, res) => {
    const symbol = req.params.symbol;
    const startdate = req.params.startdate;
    const enddate = req.params.enddate;
  
    db.all(`SELECT * FROM Stock WHERE symbol = ? AND last_updated BETWEEN ? AND ?`, [symbol, startdate, enddate], (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      res.send(rows);
    });
});


const port = 8000

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

