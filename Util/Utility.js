var crypto = require('crypto');

module.exports.generateHashKey = async (req, res, next) => {
    let publicKey = process.env.PUBLICKEY;
    let privateKey = process.env.PRIVATEKEY;
    let timeStamp = Date.now();

    var combineStr = `${timeStamp}${privateKey}${publicKey}`;
    const hashKey = crypto.createHash('md5').update(combineStr).digest("hex");
    return {timeStamp,hashKey};

}

module.exports.asyncMiddleware = (handler) => {
    return async (req,res,next)=>{
        try
        { 
          await handler(req,res) 
        }
        catch(error){
            //here 200 status code means our backend is responding  
            return res.status(200).send({
                "status": "Failed",
                "message": "Third-Party api error",
                "apiresponse" : error
            });
        }
    }
}