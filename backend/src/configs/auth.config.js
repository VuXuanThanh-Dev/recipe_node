
const jwt = require('jsonwebtoken');
exports.security = 'THANH_DEP_TRAI_NHAT_QUA_DAT';

exports.authen = async (req, res, next) => {

    try{
    let token = req.headers['authorization'];
        jwt.verify(token, this.security,(err, token)=>{
            if(!err){
                next();
                console.log(token);
            }else{
                res.json({message:"authtication.failed", errors:'token is not true', data:null});
            }
        });
        
    }catch(err){
        console.log(err);
    }
};