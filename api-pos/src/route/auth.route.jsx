const {register, profile, login, validate_token } = require("../controller/auth.controller.jsx");



module.exports = (app) =>{
    app.post("/api/auth/register", register);
    app.post("/api/auth/profile",validate_token(), profile);
    app.post("/api/auth/login", login);

}