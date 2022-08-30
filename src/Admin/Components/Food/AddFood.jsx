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
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { useEffect } from 'react';
import axios, { Axios } from 'axios';
import { Link, useHistory } from 'react-router-dom';
import categoryService from '../../Service/CategoryService';
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

const AddFood = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [categoryList, setCategoryList] = useState([]);
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false)

  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'vuuqobal')
    setLoading(true)
    const res = await fetch("https://api.cloudinary.com/v1_1/smiley-face/image/upload",
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()
    console.log(file)
    setImage(file.secure_url)
    setLoading(false)
  }
  const [foodStatus] = useState([
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

  useEffect(() => {
    getCategoryList();

  }, [])

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

  const handleChangeStatus = (ev) => {
    setStatus(ev.target.value)

  }
  const handleChangeCategory = (ev) => {
    setCategory(ev.target.value)

  }

  const onFinish = async (values) => {
    let dataConverted = {

      category: { id: values.category },
      "name": values.name,
      "image": image,
      "price": values.price,
      "description": values.description,
      "status": values.status,
    };
    console.log(dataConverted)
    axios.post(`https://order-foods.herokuapp.com/api/v1/foods/create`, dataConverted)
      .then(res => {
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      })
      history.push("/admin/food/list")
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
      <h1><b>Add New Food</b></h1>
      <Form.Item
        id="name"
        label="name"
        name="name"
        
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        id="price"
        name="price"
        label="Price"
        rules={[
          {
            required: true,
            message: 'Please input donation amount!',
          },
        ]}
      >
        <InputNumber
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        id="description"
        name="description"
        label="description"
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>
      <Form.Item
        id="category"
        name="category"
        label="Category"
        value={category}
        onChange={handleChangeCategory}
        rules={[
          {
            required: true,
            message: 'Please select category',
          },
        ]}
      >
        <Select placeholder="select category">
          {categoryList.map((item) => (
            <Option key={item.id} value={item.id}>{item.name}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        id="status"
        name="status"
        label="Status"
        value={status}
        onChange={handleChangeStatus}
        rules={[
          {
            required: true,
            message: 'Please select status',
          },
        ]}
      >
        <Select placeholder="select status">
          {foodStatus.map((item, index) => (
            <Option key={index} value={item.id}>{item.type}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="image"
        label="image"
        value={image}

      >
        <div>
          <input type="file" name="file" placeholder="Upload an Image" onChange={uploadImage}

          />
        </div>
        {
          loading ? (
            <h3>Loading..</h3>
          ) : (
            <img src={image} style={{ width: '300px' }} />
          )
        }
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Add New 
        </Button>
      </Form.Item>
    </Form>
  );
  
};


export default AddFood; 

