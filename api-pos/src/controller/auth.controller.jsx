const { logError, db } = require("../utils/Helper.jsx");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const config = require("../utils/config.jsx");

// Register
exports.register = async (req, res) =>{
    // res.json({
    //     body: req.body
    // })
    // return;
    try{
        // let param = { role_id,    name,   username,   password,  is_active,create_by }
        // hash password
        let password = req.body.password;
             password = bcrypt.hashSync(password, 10);  // 124352 = "dsdh89qwe86o6DFdj[FK"
        let sql =    " INSERT INTO " +
                         "user(role_id, name, username, password, is_active, create_by, create_at) VALUES "+
                         "(:role_id, :name, :username, :password, :is_active, :create_by, :create_at);  ";

                         let data = await db.query(sql, {
                                role_id : req.body.role_id ,
                                name : req.body.name,
                                username : req.body.username,
                                password : password,
                                is_active : req.body.is_active,
                                create_by : req.body.create_by,
                         });
                         res.json({
                            message : "Create New Account Success!!",
                            data : data,
                         })

    }catch(error){
        logError("auth.register", error, res);
    }
}


// Login 
exports.login = async (req, res) =>{
    try{
        let param = {
            password,
            username,
        } = req.body;

        let sql = "SELECT  * FROM user WHERE username = :username";
        let [data] = await db.query(sql, {
            username: username,
        })
        if(data.length == 0){
            res.json({
                error : {
                    username : "Username doesn`t exist !!"
                }
            });
        }else{
                let dbPass = data[0].password;
                let isCorrectPass = bcrypt.compareSync(password, dbPass); // true | false
                if(!isCorrectPass){
                    res.json({
                        error: {
                            password : "Password Incorrect !!",
                        }
                    })
                }else{
                    res.json({
                        // data : data,
                        message: "Login Success  !!!",
                        profile : data[0],
                        access_token: await getAccessToken(),
                    })
                }
        }

        // return;
    }catch(error){
        logError("auth.login", error, res);
    }
}

// Profile
exports.profile = async (req, res) =>{
    try{
        const data = await db.query("SELECT * FROM user WHERE id = :id", {
            id : req.body.id
        })
        res.json({
            profile : data.length >0 ? data[0] : null,
        })
    }catch(error){
        logError("auth.Profile", error, res);
    }
}


const getAccessToken = async () =>{
    const keyToken = "LGDuwruiwoiJ97@#@$(#@(8";
    const data = {
        id : 1,
        name : "Phanha",
    };
    const access_token = await jwt.sign(
         {data: data },
         keyToken,
         {expiresIn: "180s"});
    return access_token;
};

exports.validate_token = () => {
    //
    return (req, res, next) => {
        var authorization = req.headers.authorization; // token from client
        var token_from_client = null;
        if(authorization != null && authorization != "" ){
           token_from_client = authorization.split(" "); //
           token_from_client = token_from_client[1]; //
        }
        if(token_from_client == null) {
            res.status(401).send({
                message: "Unauthorized",
            });
        }else{
            const keyToken = "LGDuwruiwoiJ97@#@$(#@(8";
            jwt.verify(token_from_client, keyToken, (error, result)=> {
                if(error) {
                    res.status(401).send({
                        message: "Unauthorized",
                        error : error,
                    });
                }else{
                    // req.user = result.data; //
                    // req.user_id = result.data.Id; //
                    req.current_id = result.data.id; // write user property
                    next(); // continue controller
                }
            })
        }
    }
}