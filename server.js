const express = require("express");

const app = express();
const cors = require('cors');
const lodash = require('lodash');
 app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(express.json())
const welcomeMessage = {
  id:0,
  from: "Bart",
  text: "Welcome to CYF chat system!"
}
      
     

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
 const messages = [welcomeMessage]
 
//Post messages   

app.post('/messages', function(request, response) {
  const message = request.body;
  if(message.text.length > 0 && message.from.length >0 ){
    message.id = messages.length;
    message.timeSent = new Date();
    messages.push(message);
    response.sendStatus(201)
  } else {
    response.status(400).json("enter valid data");
  }
});

//Read all messages
  app.get("/messages", function(request, response){
  response.json(messages);
 });
//search massagesByWordOrFrom
app.get("/messages/search", function(request, response) {
  
  let word = request.query.term;  
  response.send(findMessagesByWordOrFrom(messages,word));
});
//Read only the most recent 10 messages
app.get("/messages/latest", function(request, response) {
  response.json(pickFromArray(messages));
});
//Read one message specified by an ID
// app.get("/messages/:id",function(request, response){
//   const inputId= request.params.id
// const message =messages.filter(r=>r.id==inputId)
//        response.json(message)
// });

app.get("/messages/:id", (req, res)=>{
  const message = messages.find(b => b.id === parseInt(req.params.id));
  if (!message) return res.status(404).send('No message with this Id');
   return res.status(200).send(message)
})
//function to find messagesByWord
function findMessagesByWordOrFrom(messages,word){
  return messages.filter(message=>{
    return message.text.toLowerCase().includes(word.toLowerCase())|| message.from.toLowerCase().includes(word.toLowerCase());;
  })
}  
//Delete a message, by ID
app.delete("/messages/:id", function(request, response){
  const inputId= request.params.id
  console.log(inputId)
const message =messages.filter(r=>r.id !=inputId)
       response.status(204)
});
function pickFromArray(arr) {
  return arr.slice(Math.max(arr.length - 11, 1))
}
app.listen(process.env.PORT);
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});








