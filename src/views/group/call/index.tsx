import React, { useState } from 'react'
import {
  Table,
  Tag,
  Space,
  Button,
  Input,
  Select,
  Form,
  Popconfirm,
  message,
} from 'antd'
// import styles from './index.less';

import DetailList from '../detailList'

function Call() {
  const [form] = Form.useForm() //搜索
  const [showModal, setShowModal] = useState(false)

  const onFinish = (values) => {
    console.log(values, '00000')
  }
  // 搜索重置
  const onReset = () => {
    form.resetFields()
  }
  // 删除
  const handleDelete = (record: any) => {
    console.log(record, '0000')
    message.success('数据删除成功！')
  }

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ]

  const columns = [
    {
      title: '序号',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '群组编码',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '群组名称',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '病区护士站',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '设备类型',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '备注',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '状态',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '操作',
      // dataIndex: 'address',
      key: 'address',
      render: (_text, record, _index) => (
        <Space>
          <Button type="primary" onClick={() => showClick(record)}>
            编辑
          </Button>
          <Popconfirm
            placement="top"
            title="此操作将删除消息，确定要删除吗？"
            onConfirm={() => handleDelete(record)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary" href="#">
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const show = () => {
    setShowModal(true)
  }

  const handleCancel = () => {
    setShowModal(false)
  }

  const showClick = (record) => {
    // console.log(record,'record');
    setShowModal(true)
  }
  return (
    <>
      <div
        style={{
          marginTop: '20px',
          marginLeft: '20px',
          marginBottom: '20px',
        }}
      >
        <Form
          form={form}
          layout="inline"
          onFinish={onFinish}
          style={{
            marginTop: '20px',
            marginBottom: '20px',
          }}
        >
          <Form.Item name="2">
            <Select placeholder="请选择病区护士站">
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="1">
            <Input placeholder="请输入群组组名称" />
          </Form.Item>
          <Form.Item name="">
            <Space>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
              <Button onClick={onReset}>重置</Button>
            </Space>
          </Form.Item>
        </Form>
        <Button type="primary" onClick={() => show()}>
          添加群组
        </Button>
        <Table dataSource={dataSource} columns={columns} bordered />
        {showModal && (
          <DetailList visible onCancel={handleCancel} title="新增" />
        )}
      </div>
    </>
  )
}

export default Call
