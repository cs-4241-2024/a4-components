import express from  'express'
import ViteExpress from 'vite-express'

const app = express()

const books =[
  { 'title': 'cat in the hat', 'author': 'mary', 'year': 2023, 'genre':'fantasy','ranking':5,'authorStars':1},
  { 'title': 'rhymes', 'author': 'jane', 'year': 2030, 'genre':'non-fiction','ranking':2, 'authorStars':2},
  { 'title': 'love story', 'author': 'lisa', 'year': 2014, 'genre':'romance','ranking':2, 'authorStars':2} 
]


app.use( express.json() )

app.get( '/read', ( req, res ) => res.json( books ) )


app.post( '/add', ( req,res ) => {
  console.log(req.body);
  let add = 1;
  if (req.body.title===""|req.body.author===""|req.body.genre===""|req.body.year==0|req.body.ranking==0) {
    add=0;
  } else if (req.body.ranking >5 |req.body.ranking<0|req.body.year<1000|req.body.year>2024){
    add=0;
  }
  for (let i=0;i<books.length;i++) {
    if (books[i].title === req.body.title) {
      add = 0;
    }
  }
  if (add==1) {
    books.push( req.body )
  calculateAuthorStars();
  console.log(books);
  res.json( books )
  } else {
    //error
  }
})


function calculateAuthorStars() {
  //derivived part
  let arrayStars = [];
      for (let i=0;i<books.length;i++) {
        //row
        let rowAuthor = books[i].author;
        let rowStar = Number(books[i].ranking);
  
        for (let j=0;j<books.length;j++) {
          if (!(i==j) && rowAuthor===books[j].author) {
            rowStar = Number(rowStar) + Number(books[j].ranking);
          }
        }
        arrayStars.push(rowStar);
      }
      //let arrayStar = [];
      for (let i=0;i<arrayStars.length;i++) {
        let num = 1;
        let arrayAbove = []
        for (let j=0;j<arrayStars.length;j++) {
          
          //compare with the others in the list and making sure the ones with the same amount of stars in not counted twice
          if (!(i==j) &&arrayStars[j]>arrayStars[i] && !(arrayAbove.includes(arrayStars[j]))) {
            arrayAbove.push(arrayStars[j]);
            num = num + 1;
          }
        }
        books[i].authorStars = num;//correctly placing the right number
      }
      //gotta do derivied part
}

app.post( '/deleter', ( req,res ) => {
  let del = 0;
      let row = 0;
    for (let i=0;i<books.length;i++) {
      //console.log('Found matching item:', books[i]);
      console.log(req.body.title);
      console.log(books[i].title);
      if (books[i].title === req.body.title) {
        del = 1;
        row = i;
      }
    }
    if (del==1) {
      books.splice(row, 1);
      calculateAuthorStars();
      res.json( books )
    } else {
      //error
      console.log("did not delete");
    }
})


app.post( '/change', function( req,res ) {
  //const idx = todos.findIndex( v => v.name === req.body.title )
  //todos[ idx ].completed = req.body.completed
  let change = 0;
  if (req.body.col<5 && req.body.col>-1 && Number(req.body.newVal)>0) {
    if (req.body.col==2) {
      books[req.body.row].year = Number(req.body.newVal);
      change = 1;

    } else if (req.body.col==4) {
      books[req.body.row].ranking = Number(req.body.newVal);
      change = 1;
      calculateAuthorStars();
    }
  } else if (req.body.col<5 && req.body.col>=0 && req.body.newVal != "") {
    console.log("here");
    if (req.body.col==0) {
      books[req.body.row].title = req.body.newVal;
      change = 1;

    } else if (req.body.col==1) {
      books[req.body.row].author = req.body.newVal;
      change = 1;
      calculateAuthorStars();

    } else if (req.body.col==3) {
      books[req.body.row].genre = req.body.newVal;
      change = 1;

    }
  }
  if (change==1) {
    //did change
    console.log("changed value");
    //response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    res.json( books )
  } else if (change==0) {
    //error
    console.log("couldn't change");
    res.writeHead( 400, "Bad Request", {'Content-Type': 'text/plain' })
    res.json( books )
  } 

})

ViteExpress.listen( app, 3000 )