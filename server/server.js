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

  socket.emit("newMessage", {
    from: "Paul",
    text: "Hey. What is going on.",
    createdAt: new Date().toLocaleString()
  });

  socket.on("createMessage", message => {
    console.log("Message", message);
  });

  socket.on("disconnect", () => {
    console.log("User was disconnected.....");
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
