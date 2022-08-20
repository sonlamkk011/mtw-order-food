import {
    FormOutlined,
    UserOutlined,
    HomeFilled,
    IdcardOutlined,
    FileSearchOutlined,
    TeamOutlined,
    UnorderedListOutlined,
    UserAddOutlined,
    PlusCircleOutlined
} from '@ant-design/icons';
import { Image } from 'antd';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { Link, NavLink, useLocation } from "react-router-dom";

const { Sider } = Layout;

const ManagerSidebar = () => {

    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const items = [
        {
            key: "home",
            icon: <HomeFilled />,
            title: "Trang chủ",
            link: "/"
        },
        {
            key: "food",
            title: "Food",
            children: [
                {
                    key: "addFood",
                    icon: <PlusCircleOutlined />,
                    title: "Add New Food",
                    link: "/admin/food/create"
                },
                {
                    key: "foodList",
                    icon: <UnorderedListOutlined />,
                    title: " Food List",
                    link: "/admin/food/list"
                },
            ]
        },
        {
            key: "category",
            title: "Category",
            children: [
                {
                    key: "addCategory",
                    icon: <PlusCircleOutlined />,
                    title: "Add New Category",
                    link: "/admin/category/create"
                },
                {
                    key: "categoryList",
                    icon: <UnorderedListOutlined/>,
                    title: "Category List",
                    link: "/admin/category/list"
                },

            ]
        },
        {
            key: "user",
            title: "User",
            children: [
                {
                    key: "addnewAccount",
                    icon: <UserAddOutlined />,
                    title: "Add New Account",
                    link: "/admin/account/create"
                },
                {
                    key: "AccountList",
                    icon: <UnorderedListOutlined />,
                    title: "Account List",
                    link: "/admin/account/list"
                },

            ]
        },
        {
            key: "order",
            title: "Order",
            children: [
                {
                    key: "order-list",
                    icon: <UnorderedListOutlined />,
                    title: "Order List",
                    link: "/admin/order/list"
                },

            ]
        },
    ];

    return (
        <>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline">
                <Image style={{ width: "100%", padding:"15px", borderRadius:"999px" }} src='https://www.decolore.net/wp-content/uploads/2019/09/food-logo-templates-cover.png' />
                    {items.map((item) =>
                        !item.children ? (
                            <Menu.Item key={item.key}>
                                <NavLink className="d-flex align-items-center" to={item.link}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </NavLink>
                            </Menu.Item>
                        ) : (
                            <Menu.SubMenu key={item.key} title={item.title}>
                                {item.children.map((child) =>
                                    <Menu.Item key={child.key}>
                                        <Link className="d-flex align-items-center" to={child.link}>
                                            {child.icon}
                                            <span>{child.title}</span>
                                        </Link>
                                    </Menu.Item>
                                )}
                            </Menu.SubMenu>
                        )
                    )}
                </Menu>
            </Sider>
        </>
    )
}

export default ManagerSidebar