const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/db.json');
});

app.get('/add', (req, res) => {
  res.sendFile(__dirname+'/views/add.html')
});

app.post('/add', (req, res) => {
  fs.readFile("./db.json", "utf8", (err, data) => {
    if (err) return console.log("File read failed:", err);

    jsonData = JSON.parse(data);
    const burger = {
      id: jsonData.burgers.length + 1,
      name: req.body.name || "no name"
    };
    jsonData.burgers.push(burger);

    fs.writeFileSync("./db.json", JSON.stringify(jsonData), err => {
      if (err) return console.log("File write failed:", err);
    });
  });  

  res.redirect('/');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));