const dotenv=require("dotenv")
const StatusCode = require("../common/StatusCode.js");

const auth = async(req,res,next) => {

    const aut = req.header("authtoken")

    if(!aut){
        return res.status(StatusCode.NotAuthentication).json({msg:"No code found"})
    }
    if(aut == "hanhatlinhuit2000@")
    {
        req.access = true
        next()
    }
    else
    {
        req.access = false
        res.status(StatusCode.PayloadIsInvalid).json({msg:"Code is invalid"})
    }    
}

module.exports=auth