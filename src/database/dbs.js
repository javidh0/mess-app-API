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

const food = mongoose.model(
    "food", 
    {
        "id" : {
            type: Number,
            require : true,
            unique: true
        },
        "name" : {
            type: String,
            require : true
        },
        "img" : {
            type : String
        }
    }
);

const time = mongoose.model(
    "times",
    {
        "order": {
            type: Number,
            require: true
        },
        "day" : {
            type: Number,
            require: true,
        },
        "id" : {
            type: Number,
            require: true
        }
    }
)

// users.create({
//     'user_id' : 'mm1632',
//     'email' : 'mm1632@srmist.edu.in',
//     'user_name' : 'Javidh',
//     'password' : 'Javidh'
// })

module.exports = {
    users, tokens, time, food
};