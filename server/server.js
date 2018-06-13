const http = require("http");
const express = require("express");
const path = require("path");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const app = express();

const port = process.env.PORT || 3000;
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("New user connected");

  socket.emit("newEmail", {
    from: "stanley@example.com",
    text: "Hey. What is going on.",
    createdAt: new Date().toLocaleString()
  });

  socket.on("createEmail", newEmail => {
    console.log("createEmail", newEmail);
  });

  socket.on("disconnect", () => {
    console.log("User was disconnected.....");
  });
});

server.listen(port, socket => {
  console.log(`Server is up on port ${port}`);
});
