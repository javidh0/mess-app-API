const express = require("express");
const mongoose = require("mongoose");
const {logIn, newUser, authenticate} = require("./src/database/actions");
const {getFoodDetials, getFoodOnDO} = require("./src/api/utils")
const cors = require('cors');

mongoose.connect("mongodb://127.0.0.1:27017/mess_mate");

const app = express()
app.use(cors())
app.use(express.json());
app.listen(1729, ()=>{
    console.log("On 1729")
});

async function authenticateBearer(req, res){
    let token = req.headers.authorization;
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
    var day = req.query['day'];
    var tr;
    if(id) tr = await getFoodDetials(id);
    if(day) tr = await getFoodOnDO(day);

    res.send(tr);
});
