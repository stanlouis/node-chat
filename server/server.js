const http = require("http");
const express = require("express");
const path = require("path");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const app = express();

const port = process.env.PORT || 4000;

let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("New user connected");

  socket.on("createMessage", message => {
    console.log("Message", message);
    io.emit("newMessage", {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on("disconnect", () => {
    console.log("User was disconnected.....");
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
