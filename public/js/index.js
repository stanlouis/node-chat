let socket = io();

socket.on("connect", () => {
  console.log("Connected to server");

  socket.emit("createEmail", {
    to: "dean@example.com",
    text: "Hey. This is Stanley"
  });
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("newEmail", email => {
  console.log("New email", email);
});
