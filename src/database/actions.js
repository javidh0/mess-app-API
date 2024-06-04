const mongoose = require("mongoose");
const {users, tokens} = require('./dbs');

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
    if(x == null || x['password'] != password) return '-1';

    x = await tokens.findOne({'user_id': user_id})
    if(x != null){
        let min = (Date.now() - x['time'])/60000;
        if(min < 1) {
            await tokens.updateOne(
                {'user_id': user_id},
                {$set: {"time":Date.now()}}
            )
            return x;
        }
        await tokens.deleteOne({'user_id': user_id});
    }

    let token = generateToken()
    return await tokens.create({
        'token' : token,
        'user_id' : user_id,
        'time' : Date.now()
    });
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

async function authenticate(token) {
    let x = await tokens.findOne({'token': token})
    
    if(x == null) return x;
    let min = (Date.now() - x['time'])/60000;
    if(min > 1){
        await tokens.deleteOne({'token': token})
        return null;
    }
    return x;
}

// console.log(logIn('ss0905', 'Faizaan'))

// (async () => {
//     console.log(
//         await logIn('mm1632', 'Javidh')
//     )
// })()

// (async () => {
//     console.log(
//         await authenticate("0Vd93O5TyVojbU6Yp06G")
//     )
// })()

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

module.exports = {
    logIn, newUser
};