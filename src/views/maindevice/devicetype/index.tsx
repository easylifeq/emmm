import React, { useState, useEffect } from 'react'
import { Table, Space, Button, Popconfirm, Radio } from 'antd'
// import styles from './index.less';
import TypeDetail from './detail'

function Equipment() {
  const [showModal, setShowModal] = useState(false)
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
      title: '设备类型名称',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '设备类型名称',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '说明',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '状态',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '操作',
      // dataIndex: 'address',
      key: 'address',
      render: (record) => (
        <Space>
          <Button type="primary" onClick={() => show(record)}>
            编辑
          </Button>
          <Popconfirm
            placement="top"
            title="此操作将删除信息，确定要删除吗？"
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

  const show = (record) => {
    setShowModal(true)
  }

  const handleCancel = () => {
    setShowModal(false)
  }

  const showClick = () => {
    setShowModal(true)
  }

  return (
    <>
      <Button
        type="primary"
        onClick={() => showClick()}
        style={{
          marginTop: '20px',
          marginLeft: '10px',
          marginBottom: '20px',
        }}
      >
        添加类型
      </Button>
      <Table dataSource={dataSource} columns={columns} bordered />
      {showModal && <TypeDetail visible onCancel={handleCancel} title="新增" />}
    </>
  )
}

export default Equipment
