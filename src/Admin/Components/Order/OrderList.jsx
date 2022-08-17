import { DownOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import { Badge, Button, Dropdown, Menu, Space, Table, Popconfirm } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import orderService from '../../Service/OrderService';


const OrderList = () => {
    const [orderList, setOderList] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const confirm = (id) =>
        new Promise((resolve) => { 
            setLoading(true)
            setTimeout(() => resolve(null), 3000);
            UpdateOrder(id);
        }
        );

    const columns1 = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',


        },
        {
            title: "quantity",
            dataIndex: "quantity",
            key: "quantity"
        },
        {
            title: "unitPrice",
            dataIndex: "unitPrice",
            key: "unitPrice"
        },
    ];

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
        },
        {
            title: "totalPrice",
            dataIndex: "totalPrice",
            key: "totalPrice"
        },
        {
            title: "Status",
            dataIndex: "orderStatus",
            key: "orderStatus"
        },
        {
            title: "Meal Time",
            dataIndex: "mealTime",
            key: "mealTime"
        },
        {
            title: "createdAt",
            dataIndex: "createdAt",
            key: "createdAt"
        },
        {
            title: "Action",
            key: "operation",
            render: (id) => 
            <Popconfirm
                title="Title"
                onConfirm={()=>confirm(id)}
                // onVisibleChange={() => {
                //     getData();
                //     console.log('visible change')}}
            >
                <Button type="primary" >Update</Button>
            </Popconfirm>
        }
    ];

    const getData = () =>{
        setLoading(false)
        const data = []
        for (let i = 0; i < orderList.length; ++i) {
        data.push({
            id: orderList[i].id,
            fullName: orderList[i].fullName,
            phone: orderList[i].phone,
            note: orderList[i].note,
            totalPrice: orderList[i].totalPrice,
            orderStatus: orderList[i].orderStatus,
            mealTime: orderList[i].mealTime,
            createdAt: orderList[i].createdAt,
            orderDetails: orderList[i].orderDetails,
        });
    }

    data.map(item => {
        item.key = item.id;
        item.orderDetails.map(item2 => {
            item2["name"] = item2.food.name;
            item2["image"] = <img src={item2.food.image} style={{ width: '300px' }} />;
        })
    })
    setData(data);
    }

    useEffect(()=>{
        getData();
    },[orderList])

    useEffect(() => {
        getOrderList();
    }, [])

    const UpdateOrder = async (id) => {
        fetch(`https://order-foods.herokuapp.com/api/v1/orders/${id.id}`, {
            method: "PUT",
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => {
            console.log("hellllllllllll", res);
            getOrderList();
        })
        .catch(err => {
            console.log(err);
        })
    }

    const getOrderList = async () => {
        await orderService
            .getOrderList()
            .then((res) => {
                console.log('get order list');
                setOderList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <Table
                loading={loading}
                columns={columns}
                expandable={{
                    expandedRowRender: record => (
                        <Table 
                            columns={columns1} 
                            dataSource={record.orderDetails} 
                            pagination={false} 
                        />
                    ),
                    defaultExpandedRowKeys: ["0"]
                }}
                dataSource={data}
            />
        </>
    );
};

export default OrderList;