
import {Row, Col} from "antd"

// eslint-disable-next-line react/prop-types
function HomeGrid({ data = [] }) {

    return (

     <Row>
                {data?.map((item, index)=>(
                  <Col span={6} key={index}>
                      <div key={index} style={{
                                                                backgroundColor:'pink', 
                                                                padding:15, 
                                                                margin: 10, 
                                                                borderRadius: 10,
                                                                minHeight: 100
                       }}>

                            <div style={{fontSize: 26, fontWeight: "bold"}}>{item.title}</div>
                            <div>{item.obj?.total}</div>
                            
                      </div>
                  </Col>
                ))}        
     </Row>
    )
}

export default HomeGrid;
