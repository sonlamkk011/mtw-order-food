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
import categoryService from "../../Service/CategoryService";
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

const CategoryDetail = () => {
    const [form] = Form.useForm();
    let navigate = useHistory();

    const [status, setStatus] = useState("");
    const [category, setCategory] = useState("");
    const { id } = useParams()

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

    useEffect(() => {
        getDetails();

    }, [])



    const getDetails = async () => {
        await categoryService.getCategoryDetails(id).then((res) => {
            form.setFieldsValue({ id: res.data.id });
            form.setFieldsValue({ name: res.data.name });
            form.setFieldsValue({ status: res.data.categoryStatus });
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
            "categoryStatus": values.status,

        };
        console.log('dataConverted', dataConverted)
        axios.put(`https://order-foods.herokuapp.com/api/v1/categories/${values.id}`, dataConverted)
            .then(res => {
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            })
        navigate("/admin/category/list");
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


export default CategoryDetail;