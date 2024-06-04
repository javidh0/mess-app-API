const mongoose = require('mongoose');


const users = mongoose.model(
    "users", 
    {
        'user_id' : {
            type: String,
            required: true,
            unique: true,
        },
        'email' : {
            type: String,
            require: true,
            unique : true
        },
        'user_name' : {
            type: String,
            require: true
        },
        'password' : {
            type: String,
            require: true
        }
    }
);

const tokens = mongoose.model(
    "tokens",
    {
        "token" : {
            type: String,
            require: true
        },
        "user_id" : {
            type: String,
            require: true
        },
        "time" : {
            type: Number,
            require: true
        }
    }
);

// users.create({
//     'user_id' : 'mm1632',
//     'email' : 'mm1632@srmist.edu.in',
//     'user_name' : 'Javidh',
//     'password' : 'Javidh'
// })

module.exports = {
    users, tokens
};