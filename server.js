import express from  'express'
import ViteExpress from 'vite-express'

const app = express()

const todos = [
  { name:'buy groceries', completed:false }
]

app.use( express.json() )

app.get( '/read', ( req, res ) => res.json( todos ) )

app.post( '/add', ( req,res ) => {
  todos.push( req.body )
  res.json( todos )
})

app.post( '/change', function( req,res ) {
  const idx = todos.findIndex( v => v.name === req.body.name )
  todos[ idx ].completed = req.body.completed
  
  res.sendStatus( 200 )
})

ViteExpress.listen( app, 3000 )

const path = require('path');

const password = "Password";

const previous_attempts = [];

function Attempt(correct, password_entry, num_correct_letters, correct_length) {
  this.correct = correct;
  this.password_entry = password_entry;
  this.num_correct_letters = num_correct_letters;
  this.correct_length = correct_length;
}

 app.get('/submit', function(req, res) {
   
   
   res.sendFile(path.join(__dirname, 'public/index.html'));
 });



app.post('/submit',function(req,res){
    console.log('POST parameter received are: ',req.body)
    handlePost(req, res);
})




const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    const obj = JSON.parse(dataString);
    console.log(obj.password_entry);

    //... do something with the data here!!!
    if(obj.password_entry == password)
    { 
      
      //correct?, password_entry, num_correct_letters, correct_lenght
      const new_attempt = new Attempt("true", obj.password_entry, password.length, "yes");
      previous_attempts.push(new_attempt);
      
      //response.writeHead(200, "OK", { "Content-Type": "text/plain" });
      response.writeHead(200, "OK", { "Content-Type": "application/json" });
      
      response.end(JSON.stringify(previous_attempts));
    }
    else
    {
      let correct_length = "yes"
      let num_correct_letters = 0;
      
      if(obj.password_entry.length > password.length)
      {
        correct_length = "too_long";
      }
      else if(obj.password_entry.length < password.length)
      {
        correct_length = "too_short";
      }
      
      if(correct_length == "yes" || "too_short")
      {
        for(let i = 0; i < obj.password_entry.length; i++)
        {
          if(obj.password_entry.charAt(i) == password.charAt(i))
          {
            num_correct_letters++;
          }
        }
      }
      else
      {
        for(let i = 0; i < password.length; i++)
        {
          if(obj.password_entry.charAt(i) == password.charAt(i))
          {
            num_correct_letters++;
          }
        }
      }
      //correct?, password_entry, num_correct_letters, correct_length
      const new_attempt = new Attempt("false", obj.password_entry, num_correct_letters, correct_length);
      previous_attempts.push(new_attempt);
    
      response.writeHead(200, "OK", { "Content-Type": "application/json" });
      response.end(JSON.stringify(previous_attempts));
    }
  });
};