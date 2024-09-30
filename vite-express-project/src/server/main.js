import express from  'express'
import ViteExpress from 'vite-express'

const app = express()

const todos = [
  { 'ToDo': 'MQP prototype', 'type': 'work', 'date': "9-11-2024", 'priority': '1'},
  { 'ToDo': 'Webware HW', 'type': 'school', 'date': "9-9-2024", 'priority': '2'},
  { 'ToDo': 'Ask WICS Chord question', 'type': 'personal', 'date': "9-20-2024", 'priority': '3'}
]

app.use( express.json() )

app.get( '/read', ( req, res ) => res.json( todos ) )

app.post( '/add', ( req,res ) => {
  if (req.body.type === 'work') {
    req.body.priority = 1;
} else if (req.body.type === 'school') {
  req.body.priority = 2;
} else if (req.body.type === 'personal') {
  req.body.priority = 3;
}
  todos.push( req.body )

  todos.sort((a, b) => {
    // First sort by type (work -> school -> personal)
    const typeOrder = ['work', 'school', 'personal'];
    if (a.type !== b.type) {
        return typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type);
    }
    // If types are the same, sort by date
    return new Date(a.date) - new Date(b.date);
});

// Update priority to reflect the order starting from 1
todos.forEach((task, index) => {
    task.priority = index + 1;
});


res.json( todos )
})

app.post('/delete', function(req,res){
  todos.splice(req.body.priority - 1, 1);

  // Update priorities after deletion
  todos.forEach((task, index) => {
    task.priority = index + 1;
  });

  res.json( todos )

})

app.post( '/change', function( req,res ) {
  const idx = todos.findIndex( v => v.name === req.body.name )
  todos[ idx ].completed = req.body.completed
  
  res.sendStatus( 200 )
})

ViteExpress.listen( app, 3000 )