import React, { useState, useEffect } from 'react'
import { Button, Space, message, Table, Popconfirm, Tabs, Modal } from 'antd'

// import styles from './index.moudle.less'
import SearchForm from '../../../components/serchform'
import TabsList from '../../../components/tabsform'

function Device() {
  const [activeTab, setActiveTab] = useState('1') //选项卡key
  const [isModalOpen, setIsModalOpen] = useState(false) //编辑弹框

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
      width: 150,
    },
    {
      title: '科室',
      dataIndex: 'age',
      key: 'age',
      width: 150,
    },
    {
      title: '病区',
      dataIndex: 'address',
      key: 'address',
      width: 150,
    },
    {
      title: '操作',
      // dataIndex: 'address',
      key: 'address',
      width: 150,
      render: (record) => (
        <Space wrap>
          <div>
            <Popconfirm
              placement="top"
              title="此操作将下发设备，确定要下发吗？"
              onConfirm={() => handleDelete(record)}
              okText="确定"
              cancelText="取消"
            >
              <Button type="primary" href="#">
                下发设备
              </Button>
            </Popconfirm>
          </div>
          <Button type="primary" onClick={() => showModal(record)}>
            编辑
          </Button>
        </Space>
      ),
    },
  ]
  const showModal = (record) => {
    setIsModalOpen(true)
  }

  const handleSearch = (values) => {
    console.log('搜索框的值:', values)
    // 在这里处理搜索框的值
  }
  // 下发设备
  const handleDelete = (record: any) => {
    console.log(record, '0000')
    message.success('数据删除成功！')
  }
  const onChange = (key) => {
    console.log(key)
  }
  const handleTabChange = (key: any) => {
    if (key === '2') {
      // handleActive('', '')
      // handleList()
    }
    setActiveTab(key)
  }

  // 选项卡
  const itemsTable = [
    {
      key: '1',
      label: `病床头机`,
      children: [<TabsList />],
    },
    {
      key: '2',
      label: `病房门口机`,
      children: [<TabsList />],
    },
  ]
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div style={{ display: 'flex', marginBottom: '20px', marginTop: '10px' }}>
        <SearchForm onSearch={handleSearch} />
        <Button type="primary">搜索</Button>
      </div>
      <Table dataSource={dataSource} columns={columns} bordered />
      <Modal
        title="编辑"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <Tabs
          defaultActiveKey="1"
          items={itemsTable}
          onChange={handleTabChange}
          activeKey={activeTab}
        />
      </Modal>
    </>
  )
}

export default Device
