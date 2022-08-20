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
import accountService from '../../Service/AccountService';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { useEffect } from 'react';
import axios, { Axios } from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';
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


const AccountDetail = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { id } = useParams()

  const [roleStatus] = useState([
    {
      key: 1,
      type: "ADMIN"
    },
    {
      key: 2,
      type: "USER"
    },
  ]);



  useEffect(() => {
    getDetails();

  }, [])



  const getDetails = async () => {
    await accountService.getDetails(id).then((res) => {
      form.setFieldsValue({ id: res.data.id });
      form.setFieldsValue({ username: res.data.username });
      form.setFieldsValue({ email: res.data.email });
      form.setFieldsValue({ phone: res.data.phone });
      form.setFieldsValue({ role: res.data.role });
    });
  };

  const onFinish = async (values) => {
    let dataConverted = {
      "id": values.id,
      "username": values.username,
      "email": values.email,
      "password": values.password,
      "confirmPassword": values.confirmPassword,
      "phone": values.phone,
      'role': values.role
    };
    console.log(dataConverted)

    axios.put(`https://order-foods.herokuapp.com/api/v1/accounts/${values.id}`, dataConverted)
      .then(res => {
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      })
    history.push("/admin/account/list")
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
        label="Id"
        name="id"
      >
        <Input />
      </Form.Item>
      <Form.Item
        id="username"
        label="username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please enter your Username",
          },
        ]}
        hasFeedback
      >
        <Input placeholder="Type your name" />
      </Form.Item>

      <Form.Item
        id="email"
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: "Please enter your Email",
          },
          { type: "email", message: "Please enter a valid email" },
        ]}
        hasFeedback
      >
        <Input
          placeholder="Type your email"
        />
      </Form.Item>
      <Form.Item
        id="phone"
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',

          },
        ]}
        hasFeedback
      >
        <Input
          placeholder="Type your number"
        />
      </Form.Item>
      <Form.Item
        id="password"
        name="password"
        label="New Password"
        hasFeedback
      >
        <Input.Password placeholder="Type your password" />
      </Form.Item>

      <Form.Item
        id="confirmPassword"
        name="confirmPassword"
        label=" ConfirmPassword"
        dependencies={["password"]}
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                "The two passwords that you entered does not match."
              );
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Confirm your password" />
      </Form.Item>
      <Form.Item
        name="role"
        label="Role"
      >
        <Select placeholder="select role">
          {roleStatus.map((item, index) => (
            <Option key={index} value={item.key}>{item.key} - {item.type}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
        
      </Form.Item>
    </Form>
  );
};


export default AccountDetail;














  
