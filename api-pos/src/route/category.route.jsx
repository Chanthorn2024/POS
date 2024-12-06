// const { create } = require("../controller/auth.controller");

const {getList,create,update,remove} = require("../controller/category.controller.jsx")


module.exports = (app) =>{
    app.get("/api/category", getList);
    app.post("/api/category", create);
    app.put("/api/category", update);
    app.delete("/api/category", remove);
}