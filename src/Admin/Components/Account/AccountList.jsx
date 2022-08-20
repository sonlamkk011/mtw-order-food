import {

    PlusCircleOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Popconfirm, Table, Typography ,Space} from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import accountService from 'Admin/Service/AccountService';
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
    });

const AccountList = () => {
    const [accountList, setAccountList] = useState([]);
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
        console.log(accountList, 'accountList');
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


    // loc

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
            width: '5%',
            editable: true,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            width: '20%',
            editable: true,
            ...getColumnSearchProps('username'),
        },

        {
            title: 'Email',
            dataIndex: 'email',
            width: '30%',
            editable: true,
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            width: '20%',
            editable: true,
            ...getColumnSearchProps('phone'),
        },

        {
            title: 'Role',
            dataIndex: 'role',
            width: '10%',
            editable: true,
            ...getColumnSearchProps('role'),
            render:res =>(<>{res == "1" ? "ADMIN" : "USER"}</> )
            
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
            <Link to={"/admin/account/create"} >
            <div align="right" style={{padding :25}} >
          <Button type="primary"><PlusCircleOutlined /> Add New</Button>
        </div>
            </Link>

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

