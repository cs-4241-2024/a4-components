import express from "express";
import ViteExpress from "vite-express";

let loanTable = 
[
  {"id": -1, "firstname": "placeholder", "lastname": "placeholder", "dup":false},
]

const app = express();
app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

app.post("/submit", (req, res) =>
{
  // Parse user data
  const userData = req.body;

  // Check if input ID is a positive integer (rounds decimals down)
  const laptopID = parseInt(userData.id);
  if (isNaN(laptopID) || laptopID < 0)
  {
    res.status(422).send("Invalid ID");
  }

  // Check for duplicate ID
  else if (loanTable.some(laptop => laptop.id === laptopID))
  {
    res.status(422).send("Duplicate ID");
  }

  // Data is good!
  else
  {
    // Add data to active loans table
    loanTable.push({"id": parseInt(userData.id), "firstname": userData.firstname, "lastname": userData.lastname, "dup": false});
    
    // Sort data by ID
    loanTable.sort(function(a, b)
    {
      return (a.id > b.id) ? 1 : -1;
    });

    // Check for duplicate names (allowed, but flagged)
    duplicatesCheck();
    // console.log("TODO: Check for duplicates!");

    // Send response
    res.end("OK");
  }
});

app.get("/table", async (req, res) =>
{
  res.send(loanTable);
});

app.post("/remove", async (req, res) =>
{
  const laptopData = req.body;

  // Remove requested entry
  loanTable = loanTable.filter(laptop => laptop.id !== laptopData.id);

  // Sort remaining entries
  loanTable.sort(function(a, b)
  {
    return (a.id > b.id) ? 1 : -1;
  });
  
  // Check for duplicate names (allowed, but flagged)
  duplicatesCheck();
  // console.log("TODO: Check for duplicates!");

  // Send response
  res.end("OK");
});

/**
 * Modifies table, flagging all duplicate names (first AND last must match).
 */
function duplicatesCheck()
{
  // For each row...
  for (let baseRow = 1; baseRow < loanTable.length; baseRow++)
  {
    // Check all other rows...
    let result = false;
    for (let checkRow = 1; checkRow < loanTable.length; checkRow++)
    {
      if (baseRow !== checkRow)
      {
        // And mark true if a name is a perfect match
        result |= (loanTable[baseRow].firstname.toLowerCase() === loanTable[checkRow].firstname.toLowerCase() &&
                   loanTable[baseRow].lastname.toLowerCase() === loanTable[checkRow].lastname.toLowerCase());
      }
    }

    // Save result in base row
    loanTable[baseRow].dup = (result === 1) ? true : false;
  }
}

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
