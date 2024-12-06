const {db, isArray, isEmpty, logError} = require("../utils/Helper.jsx");

exports.getList = async (req, res) =>{
   try{
    const [list] = await db.query("SELECT * FROM category ORDER BY Id ASC;")
    res.json({
        list : list,
    });
   }catch(error){
     logError("category.getList", error, res);
   }
};

exports.create = async (req, res) =>{
    try{
          var sql = "INSERT INTO category  (Name, Description, Status, ParentId) VALUES (:Name, :Description, :Status, :ParentId) ";
          var [data] = await db.query(sql ,{
              Name : req.body.Name ,
              Description : req.body.Description,
              Status : req.body.Status,
              ParentId : req.body.ParentId
          });
          res.json({
                data : data,
                message: "Insert Success",
          });
       }catch(error){
         logError("category.create", error, res);
       }
}


exports.update = async (req, res) =>{
    try{
        var [data] = await db.query("UPDATE category SET Name = :Name, Description = :Description, Status = :Status, ParentId = :ParentId WHERE Id = :Id " ,
            {
                Id : req.body.Id,
                Name : req.body.Name ,
                Description : req.body.Description,
                Status : req.body.Status,
                ParentId : req.body.ParentId,
            }
        );
        res.json({
              data : data,
              message : "Data Updated Success...!!",
        });
     }catch(error){
       logError("category.update", error, res);
     }
}

exports.remove = async (req, res) =>{
    try{
        var [data] = await db.query("DELETE FROM category WHERE  Id = :Id" ,{
             Id: req.body.Id, 
        });
        res.json({
              data : data,
              message : "Data Deleted Success...!!",
        });
     }catch(error){
       logError("remove.delete", error, res);
     }
}