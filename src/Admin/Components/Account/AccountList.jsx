
import { Button, Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import accountService from '../../Service/AccountService';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const confirm = () =>
    new Promise((resolve) => {
        setTimeout(() => resolve(null), 3000);
    });

const AccountList = () => {
    const [accountList, setAccountList] = useState([]);
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            id: '',
            name: '',
            image: '',
            price: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    useEffect(() => {
        getAccountList();
    }, [])

    useEffect(() => {
        console.log(accountList, 'foodList');
    }, [accountList])

    const getAccountList = async () => {
        await accountService
            .getAccountList()
            .then((res) => {
                setAccountList(res.data);
                console.log("999999999999999", res.data)
            })
            .catch((err) => {
                console.log(err);
            });

    }
    const DeleteAccount = async (id) => {
        fetch(`https://order-foods.herokuapp.com/api/v1/accounts/delete/${id}`, {
            method: "PUT",
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(res => res.json()).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
        // await foodService
        //   .deleteFood(id).then((res) => {
        //     console.log("success", res.data);
        //     getFoodList();
        //   })
        // window.location.reload("/list");
    }


    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...accountList];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setAccountList(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setAccountList(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            width: '5%',
            editable: true,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            width: '20%',
            editable: true,
        },

        {
            title: 'Email',
            dataIndex: 'email',
            width: '30%',
            editable: true,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            width: '20%',
            editable: true,
        },

        {
            title: 'Role',
            dataIndex: 'role',
            width: '10%',
            editable: true,
            
        },
        {
            title: 'Operation',
            dataIndex: 'id',
            render: (id, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        
                    </span>
                ) : (
                    <Typography.Link>
                        <Link to={`/admin/account/details/${id}`}>
                            <button >Details</button>
                        </Link>
                        
                    </Typography.Link>
                )

            },

        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    console.log(accountList);


    return (
        <Form form={form} component={false}>

            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={accountList}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};


export default AccountList;