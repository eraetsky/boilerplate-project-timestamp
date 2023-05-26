import express from "express"
import cors from "cors"
import DateFormat from "./types"
import UnixTimestamp from "./types"
require('dotenv').config();

const server = express()
server.use(cors({optionsSuccessStatus: 200}));

server.use(express.static('public'));

server.get("/", function (req, res) {
    res.sendFile('index.html', { root: "views" });
});


server.get("/api/:date", function (req, res) {
  const dateString = req.params.date;
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateFormatRegex.test(dateString)){
    const date = { date: dateString } as DateFormat;
    const unix = new Date(date.date).getTime();
    const utc = new Date(date.date).toUTCString();
    res.json({"unix": unix, "utc": utc});
  }
  else if (parseInt(dateString)){
    const unix = {timestamp: parseInt(dateString)} as UnixTimestamp;
    const utc = new Date(unix.timestamp).toUTCString();
    res.json({"unix": unix.timestamp, "utc": utc});
  }
  else {
    res.json({"Error": "Invalid date format"});
  }
});


const listener = server.listen(process.env.PORT, function () {
  console.log(`Your app is listening on port ${process.env.PORT}`);
});

console.log("Typescript app")