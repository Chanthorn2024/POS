
import { useEffect, useState } from "react"
import { request } from  "../../utils/Heper.jsx"
import {Button, Form, Input, message, Modal, Select, Space, Table, Tag} from "antd"
import {MdAdd, MdDelete, MdEdit} from "react-icons/md"
//import Item from "antd/es/list/Item.js";




function CategoryPage() {
  const [formRef] = Form.useForm();
  const [list,setList] = useState([]);
  const [state, setState] = useState({
          visibleModal : false,
          id : null,
          name : "",
          description : "",
          status : "",
          parentId : null,
  });
  useEffect(() => {
          getList();
  }, []);


  const getList = async () => {
    const res = await request("category", "get");
    if( res ){
      setList(res.list);
    }
  };

 
  // eslint-disable-next-line no-unused-vars
  const onClickDelete = async (data, index) => {
    Modal.confirm({
       title: "Remove",
       okText: "OK",
       content: "Are you sure to remove?",
       onOk: async ()=>{
                const res = await request("category", "delete", {
                  Id: data.Id,
                });
                if (res && !res.error) {
                    //  getList();  // requst to api resspone 
                    // remove in local
                    message.success(res.message);
                    const newList = list.filter((Item)=>Item.Id != data.Id);
                    setList(newList);
                } 
      }

    })
    return;

     // alert(JSON.stringify(res));
  }

  // eslint-disable-next-line no-unused-vars
  const onClickEdit = (data, index) => {

    setState({
      ...state,
      visibleModal: true,
    })

    formRef.setFieldsValue ({
       Id: data.Id, // hidden Id (save? | update)
       Name: data.Name,
       Description: data.Description,
       Status: data.Status,
    });
    //
    //  formRef.getFieldValue("Id")
    };

  const onClickAddBtn = () =>{
     setState ({
      ...state,
      visibleModal : true
    })
  };
  const onCloseModal = () => {
    formRef.resetFields();
    setState ({
      ...state,
      visibleModal : false,
      id : null,
    })
  }

 
  //   var data = {
  //     Id : state.id,
  //     Name : state.name,
  //     Description : state.description,
  //     Status : state.status,
  //     ParentId : state.parentId
  //   }
  //     if(state.id == null){
  //       const res = await request ("category", "post", data);
  //     }else{
  //       const res = await request ("category", "put", data);
  //     }
  // };

   const onFinish = async (items) =>{
      // alert(JSON.stringify(items))
      var data = {
        Id : formRef.getFieldValue("Id"),
            Name : items.Name,
            Description : items.Description,
            Status : items.Status,
            ParentId : 1,
      };
      var method = "post";
      if(formRef.getFieldValue("Id")) {
        // case Update
        method = "put";
      }
        const res = await request("category", method, data);
        if(res && !res.error) {
          message.success(res.message);
          getList();
          onCloseModal();
        } 
   }

  return (
    <div>
          {/* <h1>{ formRef.getFieldValue("Id") + "" }</h1> */}
          <Button type="primary" icon={<MdAdd/>} onClick={onClickAddBtn} >
             New 
          </Button>
          {/* Start Modal */}
          <Modal  
              open={state.visibleModal}
              title = {formRef.getFieldValue("Id") ? "Edit Category" : "Add New"}
              footer = {null}
              onCancel={onCloseModal} 
          >

                  {/* <Input 
                      placeholder="name" 
                      value={state.name}
                      onChange={ (e) =>{
                            setState({
                              ...state,
                              name : e.target.value,
                            })
                       }}
                  />
                  <Input 
                       placeholder="description" 
                       value={state.description}
                       onChange={ (e) =>{
                        setState({
                          ...state,
                          description : e.target.value,
                        })
                   }}
                  />
                  <Input 
                         placeholder="status" 
                         value={state.status}
                         onChange={ (e) =>{
                          setState({
                            ...state,
                            status : e.target.value,
                          })
                     }}
                  /> */}
                  <Form layout="vertical" onFinish={onFinish} form={formRef}  >
                     <Form.Item name={"Name"} label = "Name" >
                          <Input placeholder="category name"/>
                     </Form.Item>
                     <Form.Item name={"Description"} label = "Description" >
                          <Input.TextArea placeholder="Description"/>
                     </Form.Item>
                     <Form.Item name={"Status"} label = "Status" >
                          <Select 
                                placeholder = "select status"
                                options={[
                                      {
                                        label : "Active",
                                        value: 1,
                                      },
                                      {
                                         label : "InActive",
                                         value : "0"  
                                      }
                                ]} />
                     </Form.Item>

                     <Space>
                        <Button  onClick={onCloseModal}>Cancel</Button>
                        <Button type ="primary" htmlType="submit">
                              {formRef.getFieldValue("Id") ? "Update" : "Save"}
                        </Button>
                      
                    </Space>

                  </Form>

          </Modal>
            {/* <h1>Category Page {list?.length}</h1> */}
             <Table 
                  bordered
                  dataSource={list}
                  columns={[
                    {
                      key : "No",
                      title : "No",
                      render : (Item, data, index) => index + 1,
                    },
                    {
                      key : "Name",
                      title : "Name",
                      dataIndex : "Name"
                    },
                    {
                      key : "Description",
                      title : "Description",
                      dataIndex : "Description"
                    },
                    {
                      key : "Status",
                      title : "Status",
                      dataIndex : "Status",
                      render : (status) => (status == 1 ? <Tag color="green">Active</Tag> : <Tag  color="red">InActive</Tag>), 
                    },
                    {
                      key: "Action",
                      title: "Action",
                      align : "center",
                      render : (Item, data, index) => (
                        <Space>
                             <Button 
                                    type="primary"
                                    icon={<MdEdit />}  
                                    onClick={ ()=>onClickEdit(data, index)}
                                />
                             <Button 
                                    danger  type="primary"
                                    icon={<MdDelete  />}  
                                    onClick={ ()=>onClickDelete(data, index)}
                              />
                        </Space>
                      )
                    },
                  ]}
             />
    </div>
  )
}

export default CategoryPage
 