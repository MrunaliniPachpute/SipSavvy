const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))


app.get("/", (req, res)=>{
    res.send("Server working well!");
});

let drinks = [
  { id: uuidv4(), drinkName: "Coffee", rating: 5, price: 4500 },
  { id: uuidv4(), drinkName: "OreoShake", rating: 4, price: 5200 },
  { id: uuidv4(), drinkName: "Smoothie", rating: 5, price: 6999 },
  { id: uuidv4(), drinkName: "Mocktail", rating: 3, price: 4999 },
  { id: uuidv4(), drinkName: "SoftDrink", rating: 4, price: 4000 }
];


let cart = [];

app.get("/drinks", (req,res)=>{
    res.render("index.ejs", {drinks,cart});
});

app.post("/drinks", (req,res)=>{
    let selectedDrink = req.body.drinkName;
    let drink = drinks.find((d)=> d.drinkName === selectedDrink);
    cart.push(drink);
    res.redirect("/drinks");
});

app.get("/drinks/:id", (req,res)=>{
    let {id} = req.params;
    let drink = drinks.find((d) => d.id === id);
    res.render("show.ejs", {drink});
});

app.delete("/drinks/:id", (req,res)=>{
    let {id} = req.params;
    cart = cart.filter((d)=> d.id !== id);
    res.redirect("/drinks");
})



app.listen(port, ()=>{
    console.log("We are listening at port 3000");
});