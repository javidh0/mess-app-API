const express = require("express");
const mongoose = require("mongoose");
const {logIn, newUser} = require("./database/actions");

mongoose.connect("mongodb://127.0.0.1:27017/mess_mate");

const app = express()
app.use(express.json());
app.listen(1729, ()=>{
    console.log("On 1729")
});

app.get("/", (req, res) => {
    res.send("Mess Mate");
})

app.post("/login", async (req, res) => {
    let auth = req.body['auth'];
    let x = await logIn(auth['user_id'], auth['password']);
    res.send(x);
})

app.post("/new_user", async (req, res) => {
    let data = req.body['data'];
    let x = await newUser(data);
    res.send(x);
})