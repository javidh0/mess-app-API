const {users} = require('./models');
const {tokens} = require('./tokens');


async function newUser(data){
    try{
        data['user_id'][0];
        data['password'][0];
        data['user_name'][0];
    }catch{
        return {'error':'Required field missing'};
    }
    let x = await users.findOne({'user_id': data['user_id']});
    if(x != null) return {'error': 'User-Id already exist'};

    x = await users.create(data);
    return x;
}

async function logIn(user_id, password){

    function findIndex(){
        for(var i=0; i<tokens.length; i++) 
            if(tokens[i]['user_id'] == user_id) return i;
        return -1;
    }

    let x = await users.findOne({'user_id': user_id})
    if(x == null || x['password'] != password) return null;

    const idx = findIndex();

    // console.log(idx);
    if(idx != -1){
        let x = tokens[idx];
        let min = (Date.now() - x['time'])/60000;
        if(min < 1) {
            // console.log("update");
            tokens[idx]['time'] = Date.now();
            return x;
        }
        // console.log("delete");
        tokens.splice(idx, 1);
    }

    const token = generateToken()
    const authp = {
        'token' : token,
        'user_id' : user_id,
        'time' : Date.now()
    };
    tokens.push(authp);
    // console.log("push");
    return authp;
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
    function findIndex(){
        for(let i=0; i<tokens.length; i++){
            if(tokens[i]['token'] == token) return i;
        }
        return -1;
    }
    const idx = findIndex();
    
    if(idx == -1) return null;
    const x = tokens[idx];
    let min = (Date.now() - x['time'])/60000;
    if(min > 10){
        // await tokens.deleteOne({'token': token})
        tokens.splice(idx, 1);
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
    logIn, newUser, authenticate
};