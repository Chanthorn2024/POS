const {register, profile, login } = require("../controller/auth.controller.jsx");



module.exports = (app) =>{
    app.post("/api/auth/register", register);
    app.post("/api/auth/profile", profile);
    app.post("/api/auth/login", login);

}