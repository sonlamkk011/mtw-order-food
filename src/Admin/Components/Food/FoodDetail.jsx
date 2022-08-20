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
import categoryService from '../../Service/CategoryService';
import foodService from '../../Service/FoodService';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
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
      span: 6,
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

const FoodDetail = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [categoryList, setCategoryList] = useState([]);
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const { id } = useParams()
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false)

  console.log(id)
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
    getDetails();

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

  const getDetails = async () => {
    await foodService.getDetails(id).then((res) => {
      console.log(res.data.image, 'res.data.image');
      form.setFieldsValue({ id: res.data.id });
      form.setFieldsValue({ name: res.data.name });
      form.setFieldsValue({ price: res.data.price });
      form.setFieldsValue({ description: res.data.description });
      form.setFieldsValue({ category: res.data.category.id });
      form.setFieldsValue({ status: res.data.status });
      form.setFieldsValue({ image: res.data.image });
      if (res.data.image) {
        setImage(res.data.image)
      }
    });
  };

  const handleChangeStatus = (ev) => {
    setStatus(ev.target.value)

  }
  const handleChangeCategory = (ev) => {
    setCategory(ev.target.value)

  }

  const onFinish = async (values) => {
    console.log("values", values);
    let dataConverted = {


      "id": values.id,
      "name": values.name,
      "image": image,
      "price": values.price,
      "description": values.description,
      "status": values.status,
      "category": {
        "id": values.category,
      }

    };
    console.log('dataConverted', dataConverted)
    axios.put(`https://order-foods.herokuapp.com/api/v1/foods/${values.id}`, dataConverted)
      .then(res => {
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      })
      history.push("/admin/food/list");
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
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Name"
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
        label="price"
        name="price"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="description"
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>

      <Form.Item

        name="category"
        label="Category"
        value={category}
      >
        <Select placeholder="select category">
          {categoryList.map((item) => (
            <Option key={item.id} value={item.id}>{item.name}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="status"
        label="Status"
        value={status}
        onChange={handleChangeStatus}
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
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};


export default FoodDetail;
