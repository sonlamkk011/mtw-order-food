
import { Button, Form, Input, InputNumber, Popconfirm, Table, Typography, message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useHistory, useParams, withRouter } from 'react-router-dom';
import foodService from '../../Service/FoodService';
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

    message.success('This is a prompt message for success, and it will disappear in 10 seconds', 1);
  }
  );



const FoodList = () => {
  const [foodList, setFoodList] = useState([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const history = useHistory();
  const id = useParams();

  const isEditing = (record) => record.key === editingKey;



  // const handleDetails = () => {
  //   history.push(`/admin/food/details/${id}`);

  // }
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
    getFoodList();
  }, [])

  useEffect(() => {
    console.log(foodList, 'foodList');
  }, [foodList])

  const getFoodList = async () => {
    await foodService
      .getFoodList()
      .then((res) => {
        setFoodList(res.data);
        console.log("999999999999999", res.data)
      })
      .catch((err) => {
        console.log(err);
      });

  }
  const DeleteFood = async (id) => {
    fetch(`https://order-foods.herokuapp.com/api/v1/foods/delete/${id}`, {
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
  }

  

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...foodList];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setFoodList(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setFoodList(newData);
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
      width: '10%',
      editable: true,
    },
    {
      title: 'image',
      dataIndex: 'image',
      width: '15%',
      editable: true,
      render: (image) => <img src={image} style={{ width: '300px' }} />
    },
    {
      title: 'description',
      dataIndex: 'description',
      width: '10%',
      editable: true,
    },
    {
      title: 'price',
      dataIndex: 'price',
      width: '10%',
      editable: true,
    },
    {
      title: 'category',
      dataIndex: 'category',
      width: '20%',
      editable: true,
      render: (category) => (<>{category?.name}</>)
    },
    {
      title: 'status',
      dataIndex: 'status',
      width: '10%',
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
            <Link to={`/admin/food/details/${id}`}>
              <button>Details</button>
            </Link>
            <Popconfirm
              title="Title"
              onConfirm={confirm}
              onClick={() => { DeleteFood(id) }}
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
  console.log(foodList);


  return (
    <Form form={form} component={false}>
      <Link to={"/admin/food/create"} >
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
        dataSource={foodList.Pageable?.content}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};


export default withRouter(FoodList);