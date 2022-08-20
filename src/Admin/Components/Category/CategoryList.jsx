

import { Button, Form, Input, InputNumber, Popconfirm, Table, Typography, Space } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import categoryService from '../../Service/CategoryService';
import { PlusCircleFilled, SearchOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import Highlighter from 'react-highlight-words';

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
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);


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
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
    
      const handleReset = (clearFilters,selectedKeys, confirm, dataIndex) => {
        clearFilters();
        setSearchText('');
        confirm({
          closeDropdown: false,
        });
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
        
      };
      const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div
            style={{
              padding: 8,
            }}
          >
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters,selectedKeys, confirm, dataIndex)}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({
                    closeDropdown: false,
                  });
                  setSearchText(selectedKeys[0]);
                  setSearchedColumn(dataIndex);
                }}
              >
                Filter
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? '#1890ff' : undefined,
            }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        render: (text) =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{
                backgroundColor: '#ffc069',
                padding: 0,
              }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });

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
            ...getColumnSearchProps('name'),
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
