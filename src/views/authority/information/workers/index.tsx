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
  Upload,
} from 'antd';
import { Radio } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';


function Workers(props: any) {
  console.log(props, props.type, 'props');
  const [addForm] = Form.useForm();//添加账号
  const [value, setValue] = useState(1); // 角色
  const { TextArea } = Input;
  const [fileList, setFileList] = useState([]);


  // 添加职工
  const onAddSubmit = () => {
    addForm
      .validateFields()
      .then((values) => {
        console.log('Success:', values);
        addForm.resetFields();
      })
      .catch((errorInfo) => {
        console.log('Failed:', errorInfo);
      });
  };
  const handleAddCancel = () => {
    addForm.resetFields();
  };
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
  // const handleChange = (info, e) => {
  //   console.log(info, 'infp00', e);
  //   if (info.file.status === 'uploading') {
  //     setLoading(true);
  //     return;
  //   }
  // }



  return (
    <>
      <Modal
        title="新增"
        open={props.visible}
        onCancel={props.onCancel}
        onOk={onAddSubmit}
      >
        <Form
          form={addForm}
        >
          <Form.Item
            name="upload"
            label="上传图片"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="logo"
              beforeUpload={beforeUpload}
            >
              <Button icon={<UploadOutlined />}>上传头像</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="职工姓名"
            name="id"
            rules={[{ required: true, message: '请输入职工姓名!' }]}
            initialValue={props.type === 'add' ? '' : props?.list?.id}
          >
            <Input
              placeholder='请输入职工姓名'
            />
          </Form.Item>

          <Form.Item
            label="所属科室"
            name="email"
          >
            <Select
              showSearch
              placeholder="请选择所属科室"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={[
                {
                  value: 'jack',
                  label: 'Jack',
                },
                {
                  value: 'lucy',
                  label: 'Lucy',
                },
                {
                  value: 'tom',
                  label: 'Tom',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="所属病区"
            name="password"
          >
            <Select
              showSearch
              placeholder="请选择所属病区"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={[
                {
                  value: 'jack',
                  label: 'Jack',
                },
                {
                  value: 'lucy',
                  label: 'Lucy',
                },
                {
                  value: 'tom',
                  label: 'Tom',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="职工账号"
            name="password"
            rules={[{ required: true, message: '请输入职工账号!' }]}
          >
            <Input placeholder=' 请输入职工账号!' />

          </Form.Item>
          <Form.Item
            label="职工账称"
            name="password"
          >
            <Select
              showSearch
              placeholder="请选择职工职称"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={[
                {
                  value: 'jack',
                  label: 'Jack',
                },
                {
                  value: 'lucy',
                  label: 'Lucy',
                },
                {
                  value: 'tom',
                  label: 'Tom',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="职工职务"
            name="password"
          >
            <Input placeholder='请输入职工职务' />
          </Form.Item>
          <Form.Item
            label="电话号码"
            name="password"
          >
            <Input placeholder='请输入电话号码' />
          </Form.Item>
          <Form.Item
            label="his职工工号"
            name="password"
          >
            <Input placeholder='请输入his职工工号' />
          </Form.Item>
          <Form.Item
            label="账号角色"
            name="password"
          >
            <Select
              showSearch
              placeholder="请选择职工职称"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={[
                {
                  value: 'jack',
                  label: 'Jack',
                },
                {
                  value: 'lucy',
                  label: 'Lucy',
                },
                {
                  value: 'tom',
                  label: 'Tom',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="简介"
            name="password"
          >
            {/* <Input placeholder='请输入简介，最多30字' /> */}
            <TextArea rows={4} placeholder='请输入简介，最多30字' />
          </Form.Item>
          <Form.Item
            label="角色"
            name="role"
          >
            <Radio.Group value={value}>
              <Radio value={1}>启用</Radio>
              <Radio value={2}>禁用</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal >

    </>
  )
}

export default Workers;