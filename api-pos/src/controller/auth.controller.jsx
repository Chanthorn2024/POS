const { logError, db } = require("../utils/Helper.jsx");
const bcrypt = require("bcrypt");

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
                    })
                }
        }

        // return;
    }catch(error){
        logError("auth.login", error, res);
    }
}

// Profile
exports.profile = (req, res) =>{
    try{
        
    }catch(error){
        logError("auth.register", error, res);
    }
}

