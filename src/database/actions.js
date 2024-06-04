const mongoose = require("mongoose");
const {users, tokens} = require('./dbs');
mongoose.connect("mongodb://127.0.0.1:27017/mess_mate");


// {
    //     'user_id' : 'mm1632',
    //     'email' : 'mm1632@srmist.edu.in',
    //     'user_name' : 'Javidh',
    //     'password' : 'Javidh'
    // }

async function newUser(data){
    try{
        data['user_id'][0];
        data['email'][0];
        data['password'][0];
        data['user_name'][0];
    }catch{
        return {'error':'requred missing'};
    }
    let x = await users.findOne({'user_id': data['user_id']});
    if(x != null) return {'error': 'user_id exist'};

    x = await users.findOne({'email': data['email']})
    if(x != null) return {'error': 'email exist'};

    x = await users.create(data);
    return x;
}

async function logIn(user_id, password){
    let x = await users.findOne({'user_id': user_id})
    if(x['password'] != password) return '-1';

    x = await tokens.findOne({'user_id': user_id})
    if(x != null){
        console.log("NO new login");
        let min = (Date.now() - x['time'])/60000;     
        console.log(min);
        if(min < 1) {
            await tokens.updateOne(
                {'user_id': user_id},
                {$set: {"time":Date.now()}}
            )
            return x['token'];
        }
        await tokens.deleteOne({'user_id': user_id});
    }

    console.log("new login")

    let token = generateToken()
    console.log(user_id, Date.now());
    await tokens.create({
        'token' : token,
        'user_id' : user_id,
        'time' : Date.now()
    })
    return token;
}

function generateToken() {
    let n = 20;
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var token = '';
    for(var i = 0; i < n; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}

// console.log(logIn('ss0905', 'Faizaan'))

(async () => {
    console.log(
        await logIn('mm1632', 'Javidh')
    )
})()

// (async () => {
//     console.log(await newUser(
//         {
//                 'user_id' : 'ss0905',
//                 'email' : 'ss0905@srmist.edu.in',
//                 'user_name' : 'Faizaan',
//                 'password' : 'Faizaan'
//         }
//     ))
// })()