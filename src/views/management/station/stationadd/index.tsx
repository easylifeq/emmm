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


function StationAdd(props: any) {
  const [form] = Form.useForm();//搜索
  const [value, setValue] = useState(1); // 角色
  const { TextArea } = Input;


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
        title="新增护士站"
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
            label="护士站代码"
            rules={[{ required: true, message: '护士站代码!' }]}
          >
            <Input placeholder="请输入组织代码" />
          </Form.Item>
          <Form.Item
            name="address"
            label="护士站名称"
            rules={[{ required: true, message: '请输入护士站名称!' }]}
          >
            <Input placeholder="请输入护士站名称" />
          </Form.Item>

          <Form.Item
            name="address"
            label="关联病区"
            rules={[{ required: true, message: '关联病区!' }]}
          >
            <Select placeholder="请选择病区">
              <Select.Option value="1">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="jian"
            label="备注"
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="zhuang"
            label="状态"
          >
            <Radio.Group value={value}>
              <Radio value={2}>禁用</Radio>
              <Radio value={1}>启用</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default StationAdd;