const {asyncMiddleware} = require("../Middleware/Trycatch");
const {paginate,get} = require("../Service/ExternalService");

const {REDISLIFETIME} = process.env;

//Get Marvel Charecters 
module.exports.getAllCharecters = asyncMiddleware(async (req, res, next) => {
    var offset = req.offset;
    var limit = req.limit; 
    let response = null;
    let idsList = [];
    let responseData = await paginate("characters",offset,limit);
    responseData.map(single=>{ idsList.push(single["id"]) })
    response = idsList
    redisClient.setex("PUBLIC_DATA",REDISLIFETIME,JSON.stringify(response));
    res.status(200).send({
        "status": "success",
        "message": "Getting all Marvel Charecters List.",
        "apiresponse" : response
    });
});

//Get Indivisual Marvel Chareter's details
module.exports.getCharecterDetails = asyncMiddleware(async (req, res, next) => {
    //Getting this value from Redis middileware
    var charecterId = req.charecterId;
    var rediskey = req.rediskey;    
    let response  = await get(`characters/${charecterId}`);
    response = {
        "id" : response["id"],
        "name" : response["name"],
        "description" : response["description"]
    }
    redisClient.setex(rediskey,REDISLIFETIME,JSON.stringify(response))
    
    res.status(200).send({
        "status": "success",
        "message": "Getting charecter Details",
        "apiresponse" : response
    });
})