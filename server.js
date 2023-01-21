const express = require("express");
const path = require("path");
const http = require("http");
const app = express();
const socketio = require("socket.io");
const server = http.createServer(app);
const port = process.env.PORT;

const io = socketio(server);

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

//RUN WHEN AN CLIENT CONNECTS
io.on("connection", (socket) => {
  console.log("New WS Connection");

  //Welcome current user
  socket.emit("message", "Welcome to ChatRoom");

  //Braodcast when a user connects
  socket.broadcast.emit('message', 'A user has joined the chat');
  //Braodcast when a user disconnects
  socket.on('disconnect', ()=>{
    io.emit('message', 'A user has left the chat')
  })
  
});

// Listen for chatMessage
socket.on('chatMessage', msg =>{
  io.emit('message', msg)
})

server.listen(port || 3000, () => {
  console.log(`App is running on Port ${port || 3000}`);
});
