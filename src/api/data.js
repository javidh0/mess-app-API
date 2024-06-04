const mongoose = require("mongoose");
const {food, time} = require("../database/dbs");

async function getFoodDetials(food_id){
    let x = await food.findOne({"id": food_id})
    return x;
}

async function getFoodOnDO(day){
    let fIds = await time.find(
        {"day": day},
        ['id'],
        {
            sort:{
                order: 1
            }
        }
    )
    console.log(fIds);
}

async function temp(){
    await getFoodOnDO(3);
}

temp()