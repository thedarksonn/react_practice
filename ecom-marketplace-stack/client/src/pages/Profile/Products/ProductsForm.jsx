import { Col, Form, Input, Modal, Row, Tabs, message, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../../redux/LoaderSlice';
import { AddProduct, EditProduct } from '../../../apicalls/products';

const { Option } = Select;

const ProductsForm = ({ showProdctForm, setShowProductForm, selectedProduct, getData }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.users);

    const [form] = Form.useForm(); // Using Form hook to get form instance

    const additionalThings = [
        {
            label: 'Bill Available',
            name: 'billAvailable'
        },
        {
            label: 'Warranty Available',
            name: 'warrantyAvailable'
        },
        {
            label: 'Accessories Available',
            name: 'accessoriesAvailable'
        },
        {
            label: 'Box Available',
            name: 'boxAvailable'
        }
    ];

    const rules = [
        {
            required: true,
            message: "Required"
        }
    ];

    const onFinish = async (values) => {
        try {
            dispatch(setLoader(true));
            let response = null;
            if (selectedProduct) {
                response = await EditProduct(selectedProduct._id, values);
            } else {
                values.seller = user._id;
                values.status = 'pending';
                response = await AddProduct(values); // Ensure await is used here
            }
            dispatch(setLoader(false));
            if (response.success) {
                message.success(response.message);
                getData();
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            dispatch(setLoader(false));
            message.error(error.message);
        }
    };

    useEffect(() => {
        if (selectedProduct) {
            form.setFieldsValue(selectedProduct); // Correct usage of setFieldsValue
        }
    }, [selectedProduct, form]);

    return (
        <Modal
            title=""
            open={showProdctForm}
            onCancel={() => setShowProductForm(false)}
            centered
            width={1000}
            okText='Save'
            onOk={() => {
                form.submit(); // Using form instance to submit the form
                return false; // Prevent default behavior
            }}
        >
            <div>
                <h1 className='text-primary text-2xl text-center font-semibold uppercase'>
                    {selectedProduct ? "Edit Product" : "Add Product"}
                </h1>
                <Tabs defaultActiveKey='1'>
                    <Tabs.TabPane tab='General' key='1'>
                        <Form
                            form={form} // Assigning the form instance obtained from Form.useForm()
                            layout='vertical'
                            onFinish={onFinish}
                        >
                            <Form.Item label="Name" name='name' rules={rules}>
                                <Input />
                            </Form.Item>

                            <Form.Item label="Description" name='description' rules={rules}>
                                <TextArea />
                            </Form.Item>

                            <Row gutter={[16, 16]}>
                                <Col span={8}>
                                    <Form.Item label="Price" name='price' rules={rules}>
                                        <Input type='number' />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Category" name='category' rules={rules}>
                                        <Select placeholder="Select a category">
                                            <Option value='electronics'>Electronics</Option>
                                            <Option value='fashion'>Fashion</Option>
                                            <Option value='home'>Home</Option>
                                            <Option value='sports'>Sports</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Age" name='age' rules={rules}>
                                        <Input type='number' />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <div className='flex gap-10'>
                                {additionalThings.map((item, index) => (
                                    <Form.Item
                                        label={item.label}
                                        name={item.name}
                                        key={index}
                                        valuePropName="checked"
                                    >
                                        <Input type='checkbox' />
                                    </Form.Item>
                                ))}
                            </div>
                        </Form>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Images' key='2'>
                        <h1>Images</h1>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </Modal>
    );
};

export default ProductsForm;
