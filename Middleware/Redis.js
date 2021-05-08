const macAddress = require('macaddress');
module.exports.getRedisRecord = async (req, res, next) => { 
    redisClient.get("PUBLIC_DATA",function(error,data){
        if(error) next();
        else
        {
            if(data == null) next();
            else
            {
                return res.status(200).send({
                    "status": "success",
                    "message": "Getting all Marvel Charecters List.",
                    "apiresponse" : JSON.parse(data)
                });
            }
        }
    });
}


module.exports.getRedisRecordSingle = async (req, res, next) => {
    let macaddress = await macAddress.one();
    let charecterId = req.params.charecterId;
    let rediskey = `${macaddress}_${charecterId}`;
    req.rediskey = rediskey;
    req.charecterId = charecterId;

    redisClient.get(rediskey ,function(error,data){
        if(error) next();
        else
        {
            if(data == null) next();
            else
            {
                return res.status(200).send({
                    "status": "success",
                    "message": "Getting charecter Details",
                    "apiresponse" : JSON.parse(data)
                });
            }
        }
    });

}

