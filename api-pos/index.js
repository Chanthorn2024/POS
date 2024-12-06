
const express = require('express')
const app = express()
const cors = require("cors")

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cors({origin: "*"}))

app.get("/",(req,res) => {
    const list = [
        {id:1,name:"a"},
        {id:2,name:"b"},
    ]
    res.json({
        list,
    });
});

app.get("/api/home", (req,res)=>{
    const data = [
        {
            title : "Customer",
            obj: {
                total : 100,
                total_n : 50,
                total_m : 50,
            }
        },
        {
            title : "Sale",
            obj: {
                total : 100,
            }
        },
        {
            title : "Expense",
            obj: {
                total : 100,
            }
        },
        {
            title : "Employee",
            obj: {
                total : 100,
            }
        },
        {
            title : "purchase",
            obj: {
                total : 100,
            }
        }
    ]
    res.json({
       list : data,
    })
})

require("./src/route/category.route.jsx")(app);
require("./src/route/auth.route.jsx")(app);


const port = 8191;
app.listen(port, () =>{
    console.log("http://localhost:"+port);
})