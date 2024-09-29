// server.js
import express from 'express';
import path from 'path'; // Import path module
import ViteExpress from 'vite-express';

const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // To handle JSON requests

const appdata = [
    { name: "John Doe", foodName: "Burger", foodPrice: 10, quantity: 2 },
    { name: "Jane Smith", foodName: "Fries", foodPrice: 5, quantity: 1 },
];

const foodOptions = {
    10: "Burger",
    5: "Fries",
    3: "Milkshake",
};

let cumulativeTotalPrice = 0;

/*app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', "index.html")); // Send the index.html file
});*/

app.get("/orders", (req, res) => {
    console.log("Hello World!")
    res.json({ appdata: appdata });
});

app.post("/orders", (req, res) => {
    const orderData = req.body; // Parse the received data

    const foodPrice = parseInt(orderData.food);
    const quantity = parseInt(orderData.quantity);
    const orderTotalPrice = foodPrice * quantity;
    cumulativeTotalPrice += orderTotalPrice;

    const newOrder = {
        name: orderData.name,
        foodName: foodOptions[foodPrice],
        foodPrice: foodPrice,
        quantity: quantity,
    };

    appdata.push(newOrder);

    res.json({
        message: `Order received. ${orderData.name} ordered ${quantity} x ${foodOptions[foodPrice]} ($${foodPrice} each)`,
        appdata: appdata,
    });
});

app.put("/orders/:index", (req, res) => {
    const index = parseInt(req.params.index);
    const orderData = req.body;

    if (index < 0 || index >= appdata.length) {
        return res.status(400).json({ message: "Invalid index" });
    }

    appdata[index] = {
        name: orderData.name,
        foodName: orderData.foodName,
        foodPrice: orderData.foodPrice,
        quantity: orderData.quantity,
    };

    res.json({ message: "Order updated", appdata: appdata });
});

app.delete("/orders/:index", (req, res) => {
    const index = parseInt(req.params.index);

    if (index < 0 || index >= appdata.length) {
        return res.status(400).json({ message: "Invalid index" });
    }

    appdata.splice(index, 1);

    res.json({ message: "Order deleted", appdata: appdata });
});

// Start the server
ViteExpress.listen(app, port, () => console.log("Server is listening..."));
