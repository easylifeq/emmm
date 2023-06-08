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
import {
  SearchOutlined,
  UndoOutlined
} from '@ant-design/icons';

import type { ColumnsType } from 'antd/es/table';
import styles from './index.less';
import { useRef } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';

function Number() {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const [total, setTotal] = useState<number>(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [visible, setVisible] = useState(false); //编辑弹框
  const [value, setValue] = useState(1); // 角色
  const [form] = Form.useForm();//搜索
  const [modelForm] = Form.useForm();//model弹框编辑
  const [addForm] = Form.useForm();//添加账号
  const [addNembers, setAddNembers] = useState(false); //添加账号

  //定义表格列
  const columns: ColumnsType<any> = [
    {
      title: 'id',
      dataIndex: 'id',
      width: 80,
      key: 'id',
    },
    {
      title: '帐号',
      dataIndex: 'code',
      width: 120,
      key: 'code',
      ellipsis: true,
    },
    {
      title: '昵称',
      dataIndex: 'name',
      width: 120,
      ellipsis: true,
      key: 'name',
    },
    {
      title: '角色',
      dataIndex: 'role',
      width: 120,
      ellipsis: true,
      key: 'role',
    },
    {
      title: '操作',
      // dataIndex: 'code',
      width: 120,
      ellipsis: true,
      key: 'action',
      render: (record) => (
        <Space wrap>
          <Button type="primary" onClick={showModal}>
            编辑
          </Button>
          <div>
            <Popconfirm
              placement="top"
              title="确定要删除这条数据吗？"
              onConfirm={() => handleDelete(record)}
              okText="确定"
              cancelText="取消"
            >
              <Button type="primary" href="#">删除</Button>
            </Popconfirm>
          </div>
        </Space>
      ),
    },
  ];

  const data = [
    {
      id: '1',
      code: 'John Brown',
      name: 32,
      role: 'New York No. 1 Lake Park',
    },
    {
      id: '2',
      code: 'Jim Green',
      name: 42,
      role: 'London No. 1 Lake Park',
    },
    {
      id: '3',
      code: 'Joe Black',
      name: 32,
      role: 'Sydney No. 1 Lake Park',
    },
  ];

  //搜索按钮
  const getResourceList = async () => {
    setDataSource([]);
    setSelectedRowKeys([]);
    setSelectedRows([]);
    const values = form.getFieldsValue();
    const params = {
      ...values,
    };
    setLoading(true);
    //  const res = await searchInterface({ params });
    //  setLoading(false);
    //  if (res && Array.isArray(res.content)) {
    //    setDataSource(res.content);
    //    setTotal(res.totalElements);
    //  }
  };

  //重置按钮
  const onReset = () => {
    form.resetFields();
  };

  // 编辑按钮
  const onModalSubmit = () => {
    modelForm
      .validateFields()
      .then((values) => {
        console.log('Success:', values);
        modelForm.resetFields();
        setVisible(false);
      })
      .catch((errorInfo) => {
        console.log('Failed:', errorInfo);
      });
  };

  const handleCancel = () => {
    modelForm.resetFields();
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  // 删除按钮
  const handleDelete = (record) => {
    console.log(record, '0000');
    message.success('数据删除成功！');
  };

  // 添加账号
  const showAddModal = () => {
    setAddNembers(true);
  }

  // 保存按钮
  const onAddSubmit = () => {
    addForm
      .validateFields()
      .then((values) => {
        console.log('Success:', values);
        addForm.resetFields();
        setAddNembers(false);
      })
      .catch((errorInfo) => {
        console.log('Failed:', errorInfo);
      });
  };

  const handleAddCancel = () => {
    addForm.resetFields();
    setAddNembers(false);
  };


  // 初始化Table数据
  useEffect(() => {
    getResourceList();
  }, [page, size]);



  return (
    <>
      {/* table搜索 */}
      <Form form={form} layout="inline" onFinish={getResourceList}>
        <Form.Item name="name" >
          <Input placeholder="请输入昵称" />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
              搜索
            </Button>
            <Button icon={<UndoOutlined />} onClick={onReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <br />
      <Button type="primary" style={{ marginBottom: '20px' }} onClick={showAddModal}>添加账号</Button>
      <br />
      <Table
        //  loading={loading} //是否加载中
        dataSource={data} //表格数据
        columns={columns} //表格列表
        rowKey="id"
        //  rowSelection={{ //行多选
        //     selectedRowKeys,
        //     onChange: (keys, rows) => {
        //        setSelectedRowKeys(keys);
        //        setSelectedRows(rows);
        //     },
        //  }}
        bordered
        pagination={{
          //分页
          total,
          showSizeChanger: true,
          showTotal: (t) => `共${t}条`,
          defaultPageSize: 20,
          onChange: (p, s) => {
            setPage(p);
            setSize(s);
          },
        }}
      />
      {/* 编辑 */}
      <Modal
        title="添加账号"
        visible={visible}
        onOk={onModalSubmit}
        onCancel={handleCancel}
      >
        <Form form={modelForm} >
          <Form.Item
            label="账号"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="昵称"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="角色"
            name="role"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Radio.Group value={value}>
              <Radio value={1}>管理员</Radio>
              <Radio value={2}>医生</Radio>
              <Radio value={3}>护士</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
      {/* 添加账号 */}
      <Modal
        title="添加账号"
        visible={addNembers}
        onOk={onAddSubmit}
        onCancel={handleAddCancel}
      >
        <Form form={addForm} >
          <Form.Item
            label="账号"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="昵称"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="角色"
            name="role"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Radio.Group value={value}>
              <Radio value={1}>管理员</Radio>
              <Radio value={2}>医生</Radio>
              <Radio value={3}>护士</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>

    </>
  );
}

export default Number;
