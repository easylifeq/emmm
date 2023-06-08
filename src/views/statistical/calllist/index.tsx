import React from 'react'
import {
  Table,
  Tag,
  Space,
  Button,
  Input,
  Select,
  Form,
  DatePicker,
} from 'antd'
// import styles from './index.less';
import SearchForm from '../../../components/serchform'

const { RangePicker } = DatePicker

function CallList() {
  const [form] = Form.useForm()

  const handleSearch = (values) => {
    console.log('搜索框的值:', values)
    // 在这里处理搜索框的值
  }
  const onFinish = (values) => {
    console.log(values, '00000')
  }
  // 搜索重置
  const onReset = () => {
    form.resetFields()
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
      title: '呼叫源',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '呼叫目标',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '呼叫开始时间',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '接听开始时间',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '呼叫内容',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '所属科室',
      dataIndex: 'address',
      key: 'address',
    },

    {
      title: '所属病区',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '处理结果',
      dataIndex: 'address',
      key: 'address',
    },
  ]

  return (
    <>
      <div
        style={{
          marginTop: '20px',
          marginLeft: '20px',
          marginBottom: '20px',
        }}
      >
        <Space
          style={{
            marginTop: '20px',
            marginLeft: '20px',
            marginBottom: '20px',
          }}
        >
          <SearchForm onSearch={handleSearch} />
          <Form form={form} layout="inline" onFinish={onFinish}>
            <Form.Item name="">
              <RangePicker showTime format="YYYY-MM-DD HH:mm" />
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
        </Space>
        <Table dataSource={dataSource} columns={columns} bordered />
      </div>
    </>
  )
}

export default CallList
