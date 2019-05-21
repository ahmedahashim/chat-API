const express = require("express");

const app = express();
const cors = require('cors');
const texts = require("./messages.json");

app.use(express.urlencoded({ extended: false }))
app.use(cors())

const welcomeMessage = {
  id:0,
  from: "Bart",
  text: "Welcome to CYF chat system!"
},
      
      {
        id:2,
  from: "Ahmed",
  text: "Welcome to CYF chat system!" 
      }

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
 const messages = [welcomeMessage]

// app.post('/messages', function(request, response) {
//   const message =request.body
//   console.log(message)
//   message.id =messages.length+1
//   messages.push(message)
//   response.status(201).json(message) 
  
  app.get("/messages", function(request, response){
  response.json(messages);
});
  
// });
app.listen(process.env.PORT);
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});








