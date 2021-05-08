var crypto = require('crypto');

module.exports.generateHashKey = async (req, res, next) => {
    let publicKey = process.env.PUBLICKEY;
    let privateKey = process.env.PRIVATEKEY;
    let timeStamp = Date.now();

    var combineStr = `${timeStamp}${privateKey}${publicKey}`;
    const hashKey = crypto.createHash('md5').update(combineStr).digest("hex");
    return {timeStamp,hashKey};

}

