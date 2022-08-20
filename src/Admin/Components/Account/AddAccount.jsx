import {
  Button,
  Form,
  Input,
  Select,

} from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import accountService from 'Admin/Service/AccountService';
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

// const REGEX_TEL = "^0\\d{9,11}$";
const AddAccount = () => {
  const [form] = Form.useForm();
  const history = useHistory ();




  const onFinish = async (values) => {
    let dataConverted = {

      category: { id: values.category },

      "username": values.username,
      "email": values.email,
      "password": values.password,
      "phone": values.phone,
    };
    console.log(dataConverted)

    axios.post(`https://order-foods.herokuapp.com/api/v1/accounts/register`, dataConverted)
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

  // const prefixSelector = (
  //   <Form.Item name="prefix" noStyle>
  //     <Select
  //       style={{
  //         width: 70,
  //       }}
  //     >
  //       <Option value="84">+84</Option>
  //       <Option value="87">+87</Option>
  //     </Select>
  //   </Form.Item>
  // );

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
      >
        <Input
          placeholder="Type your email"
        />
      </Form.Item>
      <Form.Item
        id="phone"
        name="phone"
        label="Phone Number"
        // pattern={REGEX_TEL}
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',

          },
        ]}
      >
        <Input
          placeholder="Type your phone"
          // addonBefore={prefixSelector}
        />
      </Form.Item>
      <Form.Item
        id="password"
        name="password"
        label="Password"

        rules={[
          {
            required: true,
          },
          {
            validator: (_, value) =>
              value && value.includes("")
                ? Promise.resolve()
                : Promise.reject("Password does not match criteria."),
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Type your password" />
      </Form.Item>

      <Form.Item
        id="confirmPassword"
        name="confirmPassword"
        label="ConfirmPassword"
        dependencies={["password"]}
        rules={[
          {
            required: true,
          },
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

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Add New
        </Button>
      </Form.Item>
    </Form>
  );
};


export default AddAccount;
