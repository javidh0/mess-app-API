const express = require("express");
const mongoose = require("mongoose");
const {logIn, newUser, authenticate} = require("./src/database/actions");
const {getFoodDetials, getFoodOnDO, getFoodOnDObyMeal, updateRating} = require("./src/api/utils")
const cors = require('cors');
const {time, food} = require('./src/database/models');

mongoose.connect("mongodb://127.0.0.1:27017/mess_mate");

const app = express()
app.use(cors())
app.use(express.json());
app.listen(1729, ()=>{
    console.log("On 1729")
});

async function authenticateBearer(req, res){
    
    let token = req.headers.authorization;
    console.log(token);
    if(token == null || token.split(" ")[0] != "Bearer") {
        res.sendStatus(401);
        return -1;
    }
    let auth_res = await authenticate(token.split(" ")[1]); 
    if(auth_res == null) {res.sendStatus(401); return -1;}

    return 1;
}

app.get("/", (req, res) => {
    res.send("Mess Mate"); 
})

app.post("/login", async (req, res) => {
    let auth = req.body['auth'];
    let x = await logIn(auth['user_id'], auth['password']);
    if(x == null) res.sendStatus(401);
    else res.send(x);
})

app.post("/new_user", async (req, res) => {
    let data = req.body['data'];
    let x = await newUser(data);
    if(x['error'] != null) res.status(422);
    res.send(x);
})

app.get("/food", async (req, res) => {
    if(await authenticateBearer(req, res) != 1) return ; 
    var id = req.query['id'];
    var user_id = req.query['user_id'];
    var tr;
    if(id) tr = await getFoodDetials(id, user_id);

    res.send(tr);
});

app.get("/food_meal", async (req, res) => {
    if(await authenticateBearer(req, res) != 1) return ; 
    var day = req.query['day'];
    var meal = req.query['meal'];
    var tr;
    if(day) tr = await getFoodOnDObyMeal(day, meal);

    res.send(tr);
});

app.post("/update_rating", async (req, res) => {
    var body = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    };
    console.log(req.headers);

    if(await authenticateBearer(req, res) != 1) return ;
    let food_id = req.query['food_id'];
    let user_id = req.query['user_id'];
    let rating = req.query['rating'];

    let resp = await updateRating(food_id, user_id, rating);
    res.send(resp);
})

async function execute(){
    for(var i=1000; i<1051; i++) console.log(await food.create({
        "id" : i,
        "name" : `Name_${i}`
    }));
}

// execute();