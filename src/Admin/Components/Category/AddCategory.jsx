import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Radio,
  Rate,
  Slider,
  Switch,
  Upload,
} from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { useEffect } from 'react';
import axios, { Axios } from 'axios';
import { Link, useHistory } from 'react-router-dom';
const { Option } = Select;
const normFile = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e?.fileList;
};
const formItemLayout = {
  labelCol: {
    xs: {
      span: 16,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 16,
    },
    sm: {
      span: 8,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const AddCategory = () => {
  const [form] = Form.useForm();
  let navigate = useHistory();
  const [isRedirectSuccess, setisRedirectSuccess] = useState(false);
  const [isLoading, serisLoading] = useState(false);
  // const [content, setcontent] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false)


  const [categoryStatus] = useState([
    {
      key: 1,
      type: "SALE"
    },
    {
      key: 2,
      type: "UNSALE"
    },
    {
      key: -1,
      type: "DELETED"
    },

    {
      key: -2,
      type: "STOP"
    },
  ])
  const handleChangeStatus = (ev) => {
    setStatus(ev.target.value)

  }
  const onFinish = async (values) => {
    let dataConverted = {

      "name": values.name,
      "categoryStatus": values.status,

    };
    console.log(dataConverted)

    axios.post(`https://order-foods.herokuapp.com/api/v1/categories/create`, dataConverted)
      .then(res => {
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      })
    navigate("/admin/category/list")
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (

    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      scrollToFirstError
    >
      
      <Form.Item
        id="name"
        label="name"
        name="name"
        value={name.value}
        onChange={(ev) => this._setValue(ev, 'name')}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        id="status"
        name="status"
        label="Status"
        value={status}
        onChange={handleChangeStatus}
      >
        <Select placeholder="select status">
          {categoryStatus.map((item, index) => (
            <Option key={index} value={item.id}>{item.type}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};


export default AddCategory;