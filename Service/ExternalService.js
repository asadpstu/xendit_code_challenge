const axios = require("axios");
const {generateHashKey} = require("../Util/Utility");
const {PUBLICKEY,APIGATEWAY} = process.env;

module.exports.paginate = async (route,offset,limit) =>{
    let hashKeySet = await generateHashKey();
    let ts = hashKeySet.timeStamp;
    let hashKey = hashKeySet.hashKey;
    let url = `${APIGATEWAY}/${route}?ts=${ts}&apikey=${PUBLICKEY}&hash=${hashKey}&limit=${limit}&offset=${offset}`;
    response = await axios.get(url);
    return response.data.data.results;
}


module.exports.get = async (route) =>{
    let hashKeySet = await generateHashKey();
    let ts = hashKeySet.timeStamp;
    let hashKey = hashKeySet.hashKey;
    let url = `${APIGATEWAY}/${route}?ts=${ts}&apikey=${PUBLICKEY}&hash=${hashKey}`;
    response = await axios.get(url);
    return response.data.data.results[0];   

}