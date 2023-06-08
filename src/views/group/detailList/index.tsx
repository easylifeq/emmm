import React, { useState, useEffect } from 'react'
import {
  Button,
  Input,
  Form,
  Modal,
  message,
  Radio,
  Tabs,
  Select,
  Space,
  Table,
} from 'antd'
import SearchForm from '../../../components/serchform'

function DetailList(props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [SearchInput] = Form.useForm()

  const handleOk = () => {
    form.submit()
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onChange = (key) => {
    console.log(key)
  }
  const handleSearch = (values) => {
    console.log('搜索框的值:', values)
    // 在这里处理搜索框的值
  }

  const onReset = () => {
    SearchInput.resetFields()
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
      title: '设备编号',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '设备名称',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '设备类型',
      dataIndex: 'age',
      key: 'age',
    },
    /* {
      title: '操作',
      // dataIndex: 'address',
      key: 'address',
     
    }, */
  ]

  const items = [
    {
      key: '1',
      label: `基本信息`,
      children: [
        <Form
          form={form}
          labelAlign="left"
          layout="horizontal"
          onFinish={props.onFinish}
          style={{ maxWidth: '400px' }}
        >
          <Form.Item
            label="群组排序"
            name="dept_id4"
            rules={[{ required: true, message: '请输入群组排序' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="群组编号"
            name="2"
            rules={[{ required: true, message: '请输入群组编号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="群组编号"
            name="3"
            rules={[{ required: true, message: '请输入群组名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="设备类型名称"
            name="dept_id2"
            rules={[{ required: true, message: '请输入设备类型名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="病区护士站"
            name="dept_id3"
            rules={[{ required: true, message: '请输入病区护士站' }]}
          >
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="设备类型" name="dept_id4">
            <Select>
              <Select.Option value="demo1">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="备注说明" name="dept_id6">
            <Input.TextArea
              rows={4}
              placeholder="maxLength is 6"
              maxLength={6}
            />
          </Form.Item>
          <Form.Item label="状态" name="dept_id1" initialValue={props.value}>
            <Radio.Group>
              <Radio value={1}>启用</Radio>
              <Radio value={2}>禁用</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="">
            <Space align="end" style={{ position: 'absolute', right: '0' }}>
              <Button type="primary" htmlType="submit">
                关闭
              </Button>
              <Button
                // onClick={props.handleCancel}
                onClick={() => props.onCancel()}
              >
                保存
              </Button>
            </Space>
          </Form.Item>
        </Form>,
      ],
    },
    {
      key: '2',
      label: `设备成员`,
      children: [
        <>
          <Space align="start" style={{ marginBottom: '20px' }}>
            <SearchForm onSearch={handleSearch} />
            <Form form={SearchInput} layout="inline" onFinish={props.onFinish}>
              <Form.Item name="dept">
                <Input placeholder="请输入设备名称" />
              </Form.Item>
              <Form.Item name="dep1">
                <Select placeholder="请输入设备类型">
                  <Select.Option value="demo22">Demo</Select.Option>
                </Select>
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
          <Table
            dataSource={dataSource}
            columns={columns}
            rowSelection={{
              type: 'radio',
            }}
          />
          <Space align="center">
            <Button type="primary" htmlType="submit">
              关闭
            </Button>
            <Button
              // onClick={props.handleCancel}
              onClick={() => props.onCancel()}
            >
              保存
            </Button>
          </Space>
        </>,
      ],
    },
  ]

  return (
    <>
      <>
        <Modal
          title={props.title}
          open={props.visible}
          onOk={handleOk}
          onCancel={props.onCancel}
          okText="确认"
          cancelText="取消"
          footer={null}
          width={900}
        >
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </Modal>
      </>
    </>
  )
}

export default DetailList
