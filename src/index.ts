import express from "express"
import cors from "cors"

require('dotenv').config();

const server = express()
server.use(cors({optionsSuccessStatus: 200}));

server.use(express.static('public'));

server.get("/", function (req, res) {
    res.sendFile('index.html', { root: "views" });
});


server.get("/api/:date", function (req, res) {
  const dateString = req.params.date;
  const timestamp = Date.parse(dateString);
  if (timestamp){
    const date = new Date(timestamp);
    const unix = date.getTime();
    const utc = date.toUTCString();
    res.json({"unix": unix, "utc": utc});
  }
  else {
    res.json({"Error": "Invalid date format"});
  }
});


const listener = server.listen(process.env.PORT, function () {
  console.log(`Your app is listening on port ${process.env.PORT}`);
});

console.log("Typescript app")