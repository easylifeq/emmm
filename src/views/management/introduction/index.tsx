import React, { useState, useEffect } from 'react';
import {
  Table,
  Tag,
  Space,
  Button,
  Input,
  Select,
  Dropdown,
  Form,
  Modal,
  message,
  Popconfirm,
  Col, Row,
  Upload,
  DatePicker
} from 'antd';
import './index.less';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Introduction() {
  const [form] = Form.useForm();
  const [value, setValue] = useState('');

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('Success:', values);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log('Failed:', errorInfo);
      });
  }
  const onCancel = () => {
    form.resetFields()
  }
  // 上传图片
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const beforeUpload = ({ fileList }) => {
    // console.log(fileList, 'fileList');
    // return false;
    const isJpgOrPng = fileList.type === 'image/jpeg' || fileList.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = fileList.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>

      <Row style={{ backgroundColor: '#fff', height: '100%' }}>
        <Col span={8}></Col>
        <Col span={8}>
          <Form form={form}
            // layout="inline"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600, marginTop: 50 }}
          >
            <Form.Item
              name="logo"
              label="logo"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="logo"
                beforeUpload={beforeUpload}
              >
                <Button
                  icon={<UploadOutlined />}
                  style={{ height: 100, outline: '1px dashed ' }}
                >上传LOGO</Button>

              </Upload>
            </Form.Item>
            <Form.Item
              name="name"
              label="医院名称"
              rules={[{ required: true, message: '请输入医院名称!' }]}
            >
              <Input placeholder="请输入医院名称" />
            </Form.Item>
            <Form.Item
              name="dai"
              label="组织代码"
              rules={[{ required: true, message: '请输入组织代码!' }]}
            >
              <Input placeholder="请输入组织代码" />
            </Form.Item>
            <Form.Item
              name="address"
              label="地址"
            >
              <Input placeholder="请输入地址" />
            </Form.Item>
            <Form.Item
              name="chuang"
              label="床位"
            >
              <Input placeholder="请输入床位" />
            </Form.Item>
            <Form.Item
              name="xu"
              label="序列号"
            >
              <Input placeholder="请输入序列号" />
            </Form.Item>
            <Form.Item
              name="time"
              label="有效日期"
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="zhu"
              label="注册码"
            >
              <Input placeholder="请输入注册码" />
            </Form.Item>
            <Form.Item
              name="jieo"
              label="医院介绍"
            >
              <ReactQuill
                className="publish-quill"
                theme="snow"
                placeholder="请输入文章内容"
              />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" onClick={onCancel}> 关闭</Button>
                <Button type="primary" onClick={onOk}> 保存</Button>
              </Space>
            </Form.Item>
          </Form>

        </Col>
        <Col span={8}></Col>
      </Row>
    </>
  )
}

export default Introduction;
