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
  Popconfirm
} from 'antd';
import { Radio } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function Add(props: any) {
  const [form] = Form.useForm();//搜索
  const [value, setValue] = useState(1); // 角色

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

  return (
    <>
      <Modal
        title="新增科室信息"
        open={props.visible}
        onCancel={props.onCancel}
        onOk={onOk}
      >
        <Form form={form}
          labelAlign="left"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            name="name"
            label="排序"
            initialValue={props.type === 'add' ? '' : props?.list?.id}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dai"
            label="科室代码"
            rules={[{ required: true, message: '请输入科室代码!' }]}
          >
            <Input placeholder="请输入组织代码" />
          </Form.Item>
          <Form.Item
            name="address"
            label="科室外部代码"
            rules={[{ required: true, message: '请输入科室外部代码!' }]}
          >
            <Input placeholder="请输入科室外部代码" />
          </Form.Item>
          <Form.Item
            name="address"
            label="科室名称"
            rules={[{ required: true, message: '科室名称!' }]}
          >
            <Input placeholder="请输入科室名称" />
          </Form.Item>
          <Form.Item
            name="address"
            label="科室地址"
            rules={[{ required: true, message: '科室地址!' }]}
          >
            <Input placeholder="请输入科室地址" />
          </Form.Item>
          <Form.Item
            name="address"
            label="科室电话"
          >
            <Input placeholder="请输入科室电话" />
          </Form.Item>
          <Form.Item
            name="zhuang"
            label="是否本部"
          >
            <Radio.Group value={value}>
              <Radio value={1}>是</Radio>
              <Radio value={2}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="jian"
            label="科室简介"
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>
          <Form.Item
            name="zhuang"
            label="是否本部"
          >
            <Radio.Group value={value}>
              <Radio value={1}>启用</Radio>
              <Radio value={2}>禁用</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Add;