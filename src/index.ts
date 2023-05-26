import express from "express"
import cors from "cors"

const server = express()
server.use(cors({optionsSuccessStatus: 200}));

server.use(express.static('public'));

server.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


server.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


const listener = server.listen(process.env.PORT, function () {
  console.log(`Your app is listening on port ${process.env.PORT}`);
});

console.log("Typescript app")