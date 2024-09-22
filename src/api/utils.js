const {food, time, ratings} = require("../database/models");

async function updateRating(food_id, user_id, rating) {

    if((await ratings.findOne({"user_id" : user_id, "food_id" : food_id})) == null) {
        return await ratings.create({
            "user_id" : user_id,
            "food_id" : food_id,
            "rating" : rating
        });
    } else {
        return await ratings.updateOne(
            {"user_id" : user_id, "food_id" : food_id},
            {"rating" : rating},
        )
    } 
}

async function getFoodDetials(food_id, user_id){
    let data = await food.findOne({"id": food_id});
    if(data == null) return {};

    let food_data = data.toJSON();
    let user_rating_data = await ratings.findOne({"user_id" : user_id, "food_id": food_id});
    let total_rating_lst = await ratings.find({"food_id" : food_id});

    let total_rating = 0;
    total_rating_lst.forEach(x => {
        total_rating += x['rating'];
    });

    if(user_rating_data == null) user_rating_data = {"rating" : 0};

    let n = total_rating_lst.length;
    n = (n == 0) ? 1 : n;

    food_data.user_rating = user_rating_data['rating'];
    food_data['total_rating'] = {
        "users_count" : total_rating_lst.length,
        "users_ratings" : total_rating / n, 
    };

    return food_data;
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
    getFoodDetials, getFoodOnDO, getFoodOnDObyMeal, updateRating
};