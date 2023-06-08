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
import { Radio } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Workers from './workers';
import styles from './index.less';

function Information() {
  const [form] = Form.useForm();//搜索
  const [addForm] = Form.useForm();//添加账号
  const [value, setValue] = useState(1); // 角色
  const [visible, setVisible] = useState(false); //编辑弹框
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const [total, setTotal] = useState<number>(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const [workList, setWorkList] = useState({ type: '', list: {}, addNembers: false });

  //重置按钮
  const onReset = () => {
    form.resetFields();
  };


  //定义表格列
  const columns: ColumnsType<any> = [
    {
      title: '序号',
      dataIndex: 'id',
      width: 50,
      key: 'id',
    },
    {
      title: '头像',
      dataIndex: 'id',
      width: 50,
      key: 'id',
    },
    {
      title: '职工姓名',
      dataIndex: 'id',
      width: 80,
      key: 'id',
    },
    {
      title: '职工帐号',
      dataIndex: 'code',
      width: 80,
      key: 'code',
      ellipsis: true,
    },
    {
      title: '职工工号',
      dataIndex: 'code',
      width: 80,
      key: 'code',
      ellipsis: true,
    },
    {
      title: '职工昵称',
      dataIndex: 'name',
      width: 50,
      ellipsis: true,
      key: 'name',
    },
    {
      title: '职工职务',
      dataIndex: 'role',
      width: 80,
      ellipsis: true,
      key: 'role',
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
      width: 50,
      ellipsis: true,
      key: 'role',
    },
    {
      title: '状态',
      dataIndex: 'role',
      width: 50,
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
            onClick={() => showModal(record)}
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


  const showModal = (record: any) => {
    setWorkList({ type: 'edit', list: record, addNembers: true });
  };
  const handleCancel = () => {
    setWorkList({ type: '', list: {}, addNembers: false });
  }

  const showWok = () => {
    setWorkList({ type: 'add', list: {}, addNembers: true });
  }



  // 删除按钮
  const handleDelete = (record: any) => {
    console.log(record, '0000');
    message.success('数据删除成功！');
  };
  // 搜索按钮
  const onSerch = () => {
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
  return (
    <>
      {/* 搜索 */}
      <Form form={form} layout="inline">
        <Form.Item name="name" >
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
        <Form.Item name="name" >
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
        <Form.Item name="name" >
          <Input placeholder="请选择职工姓名" />
        </Form.Item>
        <Form.Item name="name" >
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
        <Form.Item name="name" >
          <Select
            showSearch
            placeholder="请选择职工职务"
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
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" onClick={onSerch}>
              搜索
            </Button>
            <Button
              onClick={onReset}
            >
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <Space style={{ marginTop: '20px', marginBottom: '20px' }}>
        {/* 添加 */}
        <Button type="primary" onClick={showWok}>添加职工</Button>
        {/* 导入 */}
        <Button type="primary" >导入</Button>
        <Button type="primary" danger>批量删除</Button>
      </Space>

      <Table
        //  loading={loading} //是否加载中
        dataSource={data} //表格数据
        columns={columns} //表格列表
        rowKey="id"
        rowSelection={{ //行多选
          selectedRowKeys,
          onChange: (keys, rows) => {
            setSelectedRowKeys(keys);
            setSelectedRows(rows);
          },
        }}
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
      {workList.addNembers && <Workers
        type={workList.type}
        list={workList.list}
        visible
        onCancel={handleCancel} />}
    </>
  )
}

export default Information;
