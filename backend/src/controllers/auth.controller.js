const db = require('../configs/database');
const {QueryTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authen, security } = require('../configs/auth.config');

exports.signup = async (req, res, next) => {
    try{
        let checkUsername = await db.query("select * from users where `username`=:username",{
            type: QueryTypes.SELECT,
            replacements: req.body
        });
        console.log(checkUsername);
        if(checkUsername.length != 0){
            res.json({message:'user_signup.failed', errors:'username has already existed', token: null});
            return;
        }
        let salt = await bcrypt.genSalt(10);
        let pw = await bcrypt.hashSync(req.body.password, salt);
        let createUser = await db.query("insert into users(`username`, `password`) values(:username, :password);",
        {
            replacements: {username: req.body.username, password: pw},
            type: QueryTypes.INSERT
        });
        console.log("create user: ", createUser);
        if(createUser.length === 0){
            res.json({message: 'user_signup.failed', errors:'internal server error', token: null});
            return;
        }else{
            let token = jwt.sign({username: req.body.username, password: pw}, security);
            res.json({message:"user_signup.success", errors: null, token: token});
        }
    }catch(err){
        console.log(err);
    }
}

exports.login = async (req, res, next) => {
    try{
        let checkUsername = await db.query("select * from users where `username`=:username",{
            type: QueryTypes.SELECT,
            replacements: req.body
        });
        if(checkUsername.length == 0){
            res.json({message:'user_signup.failed', errors:'username is not exists!', token: null});
            return;
        }
        let checkPassword = await db.query("select password from users where `username`=:username", {
            replacements: req.body,
            type: QueryTypes.SELECT
        });
        console.log(checkPassword);
        let isPassword = await bcrypt.compareSync(req.body.password, checkPassword[0].password);
        if(isPassword == false){
            res.json({message: "user_login.failed", errors:"password is incorect!", token:null});
            return;
        }
        let token = jwt.sign({username: req.body.username, password: checkPassword[0].password}, security);
        res.json({message: "user_login.success", erorrs:null, token: token})
    }catch(err){
        console.log(err);
    }
    
    

}