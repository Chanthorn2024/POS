import { useEffect, useState } from "react"
import { request } from "../../utils/Heper";
import HomeGrid from "../../components/home/HomeGrid";


function HomePage() {

const [home,setHome] = useState([])

useEffect(()=>{
  getList();
}, []);

  const getList = async () =>{
    const res = await request("home", "get");
    if(res){
      setHome(res.list)
    }
  }

    return (
      <div >  
             <HomeGrid data={home} />
     </div>
    );
}

export default HomePage;
