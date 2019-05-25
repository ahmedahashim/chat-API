const express = require("express");

const app = express();
const cors = require('cors');
 app.use(express.urlencoded({ extended: false }))
app.use(cors())

const welcomeMessage = {
  id:0,
  from: "Bart",
  text: "Welcome to CYF chat system!"
}
      
     

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
 const messages = [welcomeMessage]
 
//Create a new message
 app.post('/messages', function(request, response) {
  const message =request.body
 
  message.id =messages.length+1
  messages.push(message)
  response.status(201).json(message)
   
   });
   
app.post('/messages', function(request, response) {
  
  const message =request.body
  message.text!= ""
  response.sendStatus(400)
   
   
   });



//Read all messages
  app.get("/messages", function(request, response){
  response.json(messages);
 });
//Read one message specified by an ID
app.get("/messages/:id",function(request, response){
  const inputId= request.params.id
const message =messages.filter(r=>r.id==inputId)
       response.json(message)
});
//Delete a message, by ID
app.delete("/messages/:id", function(request, response){
  const inputId= request.params.id
  console.log(inputId)
const message =messages.filter(r=>r.id !=inputId)
       response.sendStatus(204)
});
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
app.listen(process.env.PORT);
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});








