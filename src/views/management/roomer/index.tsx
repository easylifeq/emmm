import React, { useState, useEffect, useCallback } from 'react';
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
} from 'antd';
import styles from './index.less';
import { Radio } from 'antd';
import RoomerAdd from './roomerAdd'
import type { ColumnsType } from 'antd/es/table';



function Roomer() {
  const [form] = Form.useForm();//搜索
  const [addOffice, setAddOffice] = useState({ type: '', list: {}, addNembers: false });
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const [total, setTotal] = useState<number>(0);


  //定义表格列
  const columns: ColumnsType<any> = [
    {
      title: '序号',
      dataIndex: 'id',
      width: 50,
      key: 'id',
    },
    {
      title: '病房代码',
      dataIndex: 'id',
      width: 50,
      key: 'id',
    },
    {
      title: '病房外部代码',
      dataIndex: 'id',
      width: 80,
      key: 'id',
    },
    {
      title: '病房名称',
      dataIndex: 'code',
      width: 80,
      key: 'code',
      ellipsis: true,
    },
    {
      title: '额定床位',
      dataIndex: 'name',
      width: 50,
      ellipsis: true,
      key: 'name',
    },
    {
      title: '所属科室',
      dataIndex: 'role',
      width: 80,
      ellipsis: true,
      key: 'role',
    },
    {
      title: '所属病区',
      dataIndex: 'role',
      width: 80,
      ellipsis: true,
      key: 'role',
    },
    {
      title: '备注',
      dataIndex: 'role',
      width: 80,
      ellipsis: true,
      key: 'role',
    },
    {
      title: '启用状态',
      dataIndex: 'role',
      width: 80,
      ellipsis: true,
      key: 'role',
    },
    {
      title: '操作',
      // dataIndex: 'code',
      width: 80,
      ellipsis: true,
      key: 'action',
      render: (record) => (
        <Space wrap>
          <Button type="primary"
            onClick={() => onAdd(record)}
          >
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

  // 搜索
  const onSearch = () => {
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

  // 重置
  const onReset = () => {
    form.resetFields()
  }
  const onAdd = (record: any) => {
    setAddOffice({ type: 'edit', list: record, addNembers: true });
  }
  const handleCancel = () => {
    setAddOffice({ type: '', list: {}, addNembers: false });
  }

  const showWok = () => {
    setAddOffice({ type: 'add', list: {}, addNembers: true });
  }


  // 编辑
  const onClick = (record: any) => {
    console.log(record, '000');
  }
  // 删除按钮
  const handleDelete = (record: any) => {
    console.log(record, '0000');
    message.success('数据删除成功！');
  };
  return (
    <>
      {/* 搜索 */}
      <Form form={form} layout="inline">
        <Form.Item name="name" >
          <Input placeholder="请输入病房代码" />
          {/*  <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select> */}
        </Form.Item>
        <Form.Item name="name" >
          <Select placeholder="请选择科室">
            <Select.Option value="1">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="name" >
          <Select placeholder="请选择病房">
            <Select.Option value="2">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" onClick={onSearch}>
              搜索
            </Button>
            <Button onClick={onReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      {/* 添加病房 */}
      <Space style={{ marginBottom: '20px', marginTop: '20px' }}>
        <Button type="primary" onClick={showWok}>
          添加病房
        </Button>
        <Button onClick={onReset}>
          导入
        </Button>
      </Space>
      <Table
        //  loading={loading} //是否加载中
        dataSource={data} //表格数据
        columns={columns} //表格列表
        rowKey="id"
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
      {addOffice.addNembers && <RoomerAdd
        type={addOffice.type}
        list={addOffice.list}
        visible
        onCancel={handleCancel} />}
    </>
  )
}


export default Roomer;
