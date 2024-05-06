import React, { useState } from 'react';
import { Form, Input, Button, Space, Upload, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { addAllEmployees } from '../../../Services/Employee.services';

const Refer = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async(data) => {
    try {
      setLoading(true); // Start loading
      console.log(data);
      await addAllEmployees(data); // Wait for the data to be submitted
    

      // Reset the form fields
      form.resetFields();
    } catch (error) {
      console.error('Error:', error.message);
      notification.error({
        message: 'Error',
        description: 'Failed to submit data!',
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Custom function to handle file upload
  const handleFileUpload = (info) => {
    if (info.file.status === 'done') {
      console.log('File uploaded successfully:', info.file.originFileObj);
      // Set the uploaded file in the form values
      form.setFieldsValue({ image: info.file.originFileObj });
    }
  };

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please enter your email!' }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Position"
          name="position"
          rules={[{ required: true, message: 'Please enter your position!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="role"
          name="role"
          rules={[{ required: true, message: 'Please enter your position!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Upload"
          name="upload"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          }}
          rules={[{ required: true, message: 'Please upload a file!' }]}
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              {loading ? 'Submitting' : 'Submit'}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Refer;
