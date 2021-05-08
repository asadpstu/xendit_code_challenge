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