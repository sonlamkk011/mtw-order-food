import { Layout } from 'antd';
import { PageHeader, Descriptions, Button } from 'antd';
import 'antd/dist/antd.css';
// import { Outlet } from 'react-router-dom';
import ManagerSidebar from './ManagerSidebar';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import AddFood from '../Food/AddFood';
import FoodList from '../Food/FoodList';
import FoodDetail from '../Food/FoodDetail';
import AddCategory from '../Category/AddCategory';
import CategoryList from '../Category/CategoryList';
import CategoryDetail from '../Category/CategoryDetail';
import AddAccount from '../Account/AddAccount';
import AccountList from '../Account/AccountList';
import AccountDetail from '../Account/AccountDetail';
import OrderList from '../Order/OrderList';
import { Route, Switch } from 'react-router-dom';



const { Content, Footer, Header } = Layout;

const Manager = () => {
    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <ManagerSidebar />
                <Layout className="site-layout">
                    <div className="site-page-header-ghost-wrapper">
                        <PageHeader
                            ghost={false}
                            onBack={() => window.history.back()}
                            title="Order Food"
                            subTitle="This is a subtitle"
                        extra={[
                              <Avatar size="large" icon={<UserOutlined />} />
                        ]}
                        >
                            {/* <Descriptions size="small" column={3}>
                                <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
                                <Descriptions.Item label="Association">
                                    <a>421421</a>
                                </Descriptions.Item>
                                <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
                                <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
                                <Descriptions.Item label="Remarks">
                                    Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
                                </Descriptions.Item>
                            </Descriptions> */}
                        </PageHeader>
                    </div>
                    <Content style={{ margin: '0 16px' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            
                            <Switch>
                      <Route path="/admin/food/create" component={AddFood}/>
                      <Route path="/admin/food/list" component={FoodList}/>
                      <Route path="/admin/food/details/:id" component={FoodDetail}/>
                      <Route path="/admin/category/create" component={AddCategory}/>
                      <Route path="/admin/category/list" component={CategoryList}/>
                      <Route path="/admin/category/details/:id" component={CategoryDetail}/>
                      <Route path="/admin/account/create" component={AddAccount}/>
                      <Route path="/admin/account/list" component={AccountList}/>
                      <Route path="/admin/account/details/:id" component={AccountDetail}/>
                      <Route path="/admin/order/list" component={OrderList}/>
                    </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Metaway Hoding ©2022 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        </div>
    )
}

export default Manager;