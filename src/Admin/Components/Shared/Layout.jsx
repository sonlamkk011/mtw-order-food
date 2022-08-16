import { Layout } from 'antd';
import { PageHeader, Descriptions, Button } from 'antd';
import 'antd/dist/antd.css';
// import { Outlet } from 'react-router-dom';
import ManagerSidebar from './ManagerSidebar';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';



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
                            <Descriptions size="small" column={3}>
                                <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
                                <Descriptions.Item label="Association">
                                    <a>421421</a>
                                </Descriptions.Item>
                                <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
                                <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
                                <Descriptions.Item label="Remarks">
                                    Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
                                </Descriptions.Item>
                            </Descriptions>
                        </PageHeader>
                    </div>
                    <Content style={{ margin: '0 16px' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            {/* <Outlet /> */}
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