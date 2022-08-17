

import { Button, Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import categoryService from '../../Service/CategoryService';
import { PlusCircleFilled } from '@ant-design/icons';

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
        window.location.reload("/list");
    });

const CategoryList = () => {
    const [categoryList, setCategoryList] = useState([]);
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            id: '',
            name: '',
            status: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    useEffect(() => {
        getCategoryList();
    }, [])

    useEffect(() => {
        console.log(categoryList, 'foodList');
    }, [categoryList])

    const getCategoryList = async () => {
        await categoryService
            .getCategoryList()
            .then((res) => {
                setCategoryList(res.data);
                console.log("999999999999999", res.data)
            })
            .catch((err) => {
                console.log(err);
            });

    }
    const DeleteCategory = async (id) => {
        fetch(`https://order-foods.herokuapp.com/api/v1/categories/delete/${id}`, {
            method: "PUT",
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json()).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })


    }


    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...categoryList];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setCategoryList(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setCategoryList(newData);
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
            width: '2%',
            editable: true,
        },
        {
            title: 'name',
            dataIndex: 'name',
            width: '30%',
            editable: true,
        },
        {
            title: 'Category Status',
            dataIndex: 'categoryStatus',
            width: '30%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'id',
            render: (id, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                    </span>
                ) : (
                    <Typography.Link>
                        <Link to={`/admin/category/details/${id}`}>
                            <button >Details</button>
                        </Link>
                        <Popconfirm
                            title="Title"
                            onConfirm={confirm}
                            onClick={() => { DeleteCategory(id) }}
                            onVisibleChange={() => console.log('visible change')}
                        >
                            <Button type="primary" >Delete</Button>
                        </Popconfirm>

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
    console.log(categoryList);


    return (
        <Form form={form} component={false}>
            <Link to={"/admin/category/create"} >
            <div align="right" style={{padding :25}} >
          <Button type="primary"><PlusCircleFilled /> Add New</Button>
        </div>
            </Link>


            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={categoryList}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};


export default CategoryList;