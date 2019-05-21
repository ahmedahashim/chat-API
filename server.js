const express = require("express");

const app = express();
const cors = require('cors');
const chats = require("./chats.json");

app.use(express.urlencoded({ extended: false }))
app.use(cors())

const welcomeMessage = {
  "id":0,
  "from": "Bart",
  "text": "Welcome to CYF chat system!"
}

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
 const messages = [welcomeMessage]
app.get("/chats", function(request, response){
  response.json(chats);
});
app.post('/chats', function(request, response) {
  const chat =request.body
  console.log(chat)
  chat.id =chats.length+1
  chats.push(chat)
  response.status(201).json(chat)
  
  
});
app.listen(process.env.PORT);
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});








