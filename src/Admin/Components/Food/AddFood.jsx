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
  const [isRedirectSuccess, setisRedirectSuccess] = React.useState(false);
  const [isLoading, serisLoading] = React.useState(false);
  // const [content, setcontent] = React.useState("");
  const [categoryList, setCategoryList] = React.useState([]);
  const [foodList, setFoodList] = React.useState([]);
  const [status, setStatus] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [image, setImage] = React.useState("");
  const [loading, setLoading] = React.useState(false)

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

  // const _setValue = (ev, key) => {
  //   ev.persist();
  //   this.setState(prevState => {
  //     prevState.form.dirty = false;
  //     prevState.form[key] = {
  //       value: ev.target.value,
  //       err: this._getInvalidErr(ev.target),
  //     }
  //     return prevState;
  //   });
  // }

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
      // id: values.id,
      // name: values.name,
      // slug: values.slug,
      // description: values.description,
      category: { id: values.category },
      // status: values.status,
      // price: values.price,
      // image: image,
      "name": values.name,
      "image": image,
      "price": values.price,
      "description": values.description,
      "status": values.status,
      // "mealTime": null,
      // "createdAt": "2022-08-01T10:05:34.677",
      // "category": {
      //   "id": 12
      // }
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
        id="price"
        name="price"
        value={price.value}
        label="Price"

        onChange={(ev) => this._setValue(ev, 'price')}
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
        value={description.value}
        onChange={(ev) => this._setValue(ev, 'description')}
        rules={[
          {
            required: true,
            message: 'Please input description',
          },
        ]}
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
        {/* <Link to={"/list"}> */}
        <Button type="primary" htmlType="submit">
          Add
        </Button>
        {/* </Link> */}
      </Form.Item>
    </Form>
  );
};


export default AddFood;
