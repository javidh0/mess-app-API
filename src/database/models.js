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

const ratings = mongoose.model(
    "ratings", 
    {
        "user_id" : {
            type : String,
            require : true
        },
        "food_id" : {
            type : String,
            require : true
        },
        "rating" : Number
    }
)

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
        "image" : {
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
        },
        "meals" : {
            type : Number,
            require: true,
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
    users, time, food, ratings
};