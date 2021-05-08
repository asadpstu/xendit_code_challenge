const {generateHashKey,asyncMiddleware} = require("../Util/Utility");
const axios = require("axios");
const {PUBLICKEY,APIGATEWAY,REDISLIFETIME} = process.env;

//Get Marvel Charecters 
module.exports.getAllCharecters = asyncMiddleware(async (req, res, next) => {
    let response = null;
    let hashKeySet = await generateHashKey();
    let ts = hashKeySet.timeStamp;
    let hashKey = hashKeySet.hashKey;
    let url = `${APIGATEWAY}?ts=${ts}&apikey=${PUBLICKEY}&hash=${hashKey}&limit=100`;
    let idsList = [];
    response = await axios.get(url);
    let results = response.data.data.results;
    results.map(single=>{
        idsList.push(single["id"]); 
    })
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
    let hashKeySet = await generateHashKey();
    let ts = hashKeySet.timeStamp;
    let hashKey = hashKeySet.hashKey;
    
    //Getting this value from Redis middileware
    var charecterId = req.charecterId;
    var rediskey = req.rediskey;

    let url = `${APIGATEWAY}/${charecterId}?ts=${ts}&apikey=${PUBLICKEY}&hash=${hashKey}`;
    let response = null;
    
    let responseData  = await axios.get(url);
    response = responseData.data.data.results;
    redisClient.setex(rediskey,REDISLIFETIME,JSON.stringify(response))
    
    res.status(200).send({
        "status": "success",
        "message": "Getting charecter Details",
        "apiresponse" : response
    });
})