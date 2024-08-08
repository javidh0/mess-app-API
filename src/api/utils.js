const {food, time} = require("../database/models");

async function getFoodDetials(food_id){
    let x = await food.findOne({"id": food_id})
    return x;
}

async function getFoodOnDObyMeal(day, meal){
    let fIds = await time.find(
        {"day" : day, "meals" : meal},
        ['id'],
        {
            sort:{
                order:1
            }
        }
    );
    var tr = [];
    fIds.forEach(x => {
        tr.push(x['id']);
    })
    return {"ids": tr};
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
    var tr = [];
    fIds.forEach(x => {
        tr.push(x['id']);
    })
    return {"ids": tr};
}

module.exports = {
    getFoodDetials, getFoodOnDO, getFoodOnDObyMeal
};