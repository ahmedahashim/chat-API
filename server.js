const express = require("express");

const app = express();
const cors = require('cors');
const lodash = require('lodash');
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
   


//Read all messages
  app.get("/messages", function(request, response){
  response.json(messages);
 });
app.get("/messages/search", function(request, response) {
  
  let word = request.query.term;  
  response.send(findMessagesByWord(messages,word));
});
app.get("/messages/latest", function(request, response) {
  response.json(lodash.sample(messages));
});
//Read one message specified by an ID
app.get("/messages/:id",function(request, response){
  const inputId= request.params.id
const message =messages.filter(r=>r.id==inputId)
       response.json(message)
});


function findMessagesByWord(messages,word){
  return messages.filter(message=>{
    return message.text.toLowerCase().includes(word.toLowerCase())|| message.from.toLowerCase().includes(word.toLowerCase());;
  })
}  




//Delete a message, by ID
app.delete("/messages/:id", function(request, response){
  const inputId= request.params.id
  console.log(inputId)
const message =messages.filter(r=>r.id !=inputId)
       response.sendStatus(204)
});
function pickFromArray(arr) {
  return arr.slice(Math.max(arr.length - 11, 1))
}
app.listen(process.env.PORT);
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});








