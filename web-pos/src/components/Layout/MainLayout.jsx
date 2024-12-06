
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  //DesktopOutlined,
  //FileOutlined,
  PieChartOutlined,
 // TeamOutlined,
  //UserOutlined,
} from '@ant-design/icons';
import {Layout, Menu, theme, Input } from 'antd';
import "./MainLayout.css"
import Logo from "../../assets/pos.png"
import Profile from "../../assets/pro-4.jpg"
import { IoIosNotifications } from 'react-icons/io';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';

const { Content, Footer, Sider } = Layout;

const items = [
    {
      key: "dashbaord", 
      label: "Dashbaord",
      icon: <PieChartOutlined />,
      children: null,
  },
  {
    key: "employee", 
    label: "Employee",
    icon: <PieChartOutlined />,
    children: null,
  },
  {
    key: "customer", 
    label: "Customer",
    icon: <PieChartOutlined />,
    children: null,
  },
  {
    key: "product", 
    label: "Product",
    icon: <PieChartOutlined />,
    children: [
      {
        key: "product/category", 
        label: "Category",
        icon: <PieChartOutlined />,
        children: null,
      },
      {
        key: "product/smartPhone", 
        label: "Smart Phones",
        icon: <PieChartOutlined />,
        children: null,
      },
      {
        key: "product/smartWatch", 
        label: "Smart Watchs",
        icon: <PieChartOutlined />,
        children: null,
      },
    ],
  },
 ];


const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const onClickMenu = (items) =>{
          navigate(items.key)
  }


  return (
    <Layout
        style={{
          minHeight: '100vh',
        }}
     >
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <Menu 
                  theme="dark" 
                  defaultSelectedKeys={['1']}
                   mode="inline" 
                   items={items} 
                   onClick={onClickMenu}
             />
          </Sider> {/* End of Sider */}
            <Layout>
                  <div className='admin-header'>
                        <div className="admin-header-g1">
                                <div>
                                  <img  className='admin-logo' src={Logo} alt="Logo" />
                                </div>
                                <div>
                                    <div className='txt-brand-name'>MY-POS</div>
                                    <div>Computer and PhoneShop</div>
                                </div>
                                <div>
                                    <Input.Search 
                                            style={{width: 200, marginLeft: 15, marginTop: 5}}
                                            size='large'
                                            placeholder='Search'
                                    />
                                </div>
                        </div>
                          <div className="admin-header-g2">
                              <IoIosNotifications className='icon-notify' />
                              <MdOutlineMarkEmailUnread  className='icon-email' />
                             <div>
                                  <div className='txt-username'>Sok Dara</div>
                                  <div>Admin</div>
                             </div>
                              <div>
                                   <img width={90} height={68} style={{borderRadius:"50%"}} className='img-user' src={Profile} alt="user" />
                              </div>
                          </div>
                  </div> {/*End of Header*/}

                  <Content
                    style={{
                      margin: '16px',
                    }}
                  >
                    <div
                      className='admin-body'
                      style={{
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                      }}
                    >
                      <Outlet />
                    </div>
                  </Content> {/*End of Content*/}
                  <Footer
                    style={{
                      textAlign: 'center',
                      color: 'red',
                    }}
                   >
                    POS SYSTEM©{new Date().getFullYear()} Devolop by Student years 3 RUPP computer Sciecnce & Engineering 
                  </Footer> {/*End of Footer*/}
            </Layout>
    </Layout> // End of Layout 
    
  );
};
export default MainLayout;