import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Select, Space, Table } from 'antd'

import styles from './index.moudle.less'
import EquipmentDetail from './detail'

import { getDataList, getSickRoom } from '@/api/interface'

function Equipment() {
  const { Option } = Select
  const [form] = Form.useForm() //搜索
  const [type, setType] = useState('ks')
  const [searchValue, setSearchValue] = useState({
    area: '',
    dept: '',
    isFull: '',
  })
  const [firstSelectOptions, setFirstSelectOptions] = useState([])
  const [secondSelectOptions, setSecondSelectOptions] = useState([])
  const [firstId, setFirstId] = useState('')

  const [workList, setWorkList] = useState({ list: {}, addNembers: false })

  const handleSecondSelectChange = (value) => {
    console.log(value, 'value')
    setFirstId(value)
    setType('bq')
    form.setFieldsValue({ bq: undefined })
  }
  const onFinish = (values) => {
    console.log(values, '00000')
    setSearchValue({
      area: values.bq,
      dept: values.ks,
      isFull: values.isFull,
    })
  }
  // 获取搜索列表
  const handleActive = async () => {
    const params = { type: type, dept_id: firstId }
    const data = await getDataList(params)
    const res = data.data
    if (type === 'ks') {
      setFirstSelectOptions(data)
    } else if (type === 'bq') {
      setSecondSelectOptions(data)
    }
    /*   try {
      const response = await getDataList(params)
      const res = response.data
      if (type === 'ks' && res.code === 200) {
        setFirstSelectOptions(res.data)
      } else if (type === 'bq' && res.code === 200) {
        setSecondSelectOptions(res.data)
      }
      if (type === '' && res.code === 500) {
        message.error('出院失败，请重试！')
      } else if (type === 'ys' && res.code === 500) {
        message.error('获取信息失败！')
      }
    } catch (error) {
      console.error('获取数据失败:', error)
    } */
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      align: 'center',
      // fixed: 'left',
    },
    {
      title: '设备名称',
      dataIndex: 'age',
      key: 'age',
      width: 150,
      align: 'center',
    },
    {
      title: 'Sn',
      dataIndex: 'address',
      key: 'address',
      width: 100,
      align: 'center',
    },
    {
      title: '设备类型',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      align: 'center',
    },
    {
      title: '科室',
      dataIndex: 'age',
      key: 'age',
      width: 100,
      align: 'center',
    },
    {
      title: '病区',
      dataIndex: 'address',
      key: 'address',
      width: 100,
      align: 'center',
    },
    {
      title: '病房',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      align: 'center',
    },
    {
      title: '床位',
      dataIndex: 'age',
      key: 'age',
      width: 100,
      align: 'center',
    },
    {
      title: 'IP地址',
      dataIndex: 'address',
      key: 'address',
      width: 150,
      align: 'center',
    },
    {
      title: 'SIP账号',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      align: 'center',
    },
    {
      title: 'SIP密码',
      dataIndex: 'age',
      key: 'age',
      width: 150,
      align: 'center',
    },
    {
      title: 'SIP ID',
      dataIndex: 'address',
      key: 'address',
      width: 100,
      align: 'center',
    },
    {
      title: '位置',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      align: 'center',
    },
    {
      title: '是否在线',
      dataIndex: 'age',
      key: 'age',
      width: 100,
      align: 'center',
    },
    {
      title: '告警状态',
      dataIndex: 'address',
      key: 'address',
      width: 100,
      align: 'center',
    },
    {
      title: '忙闲状态',
      dataIndex: 'address',
      key: 'address',
      width: 100,
      align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 250,
      align: 'center',
      render: (_text, _record, _index) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <Button type="primary">远程控制</Button>
            <Button type="primary" style={{ marginLeft: '10px' }}>
              设备升级
            </Button>
          </div>
          <div style={{ marginTop: '10px' }}>
            <Button type="primary">编辑</Button>
            <Button type="primary" style={{ marginLeft: '10px' }}>
              删除
            </Button>
          </div>
        </div>
      ),
    },
  ]
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney',
    },
  ]
  // 搜索重置
  const onReset = () => {
    form.resetFields()
  }

  // 添加设备弹框
  const show = (item) => {
    setWorkList({ addNembers: true, list: { item } })
  }
  const handleCancel = () => {
    setWorkList({ list: {}, addNembers: false })
  }
  useEffect(() => {
    handleActive()
  }, [type, firstId])

  return (
    <>
      {/* 搜索条件 */}
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item name="ks" label="">
          <Select
            placeholder="请选择所属科室"
            onChange={handleSecondSelectChange}
            style={{ width: '150px' }}
          >
            {firstSelectOptions.map((option) => (
              <Option key={option.id} value={option.id}>
                {option.dept_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="bq" label="">
          <Select
            placeholder="请选择所属病区"
            disabled={!firstId}
            style={{ width: '150px' }}
          >
            {secondSelectOptions.map((option) => (
              <Option key={option.id} value={option.id}>
                {option.area_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="lei" label="">
          <Select placeholder="请选择设备类型" style={{ width: '150px' }}>
            <Select.Option value="1">满床</Select.Option>
            <Select.Option value="0">未满</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="ming" label="">
          <Input placeholder="请输入设备名称" />
        </Form.Item>
        <Form.Item name="sn" label="">
          <Input placeholder="请输入设备SN" />
        </Form.Item>
        <Form.Item name="jing" label="">
          <Select placeholder="请选择告警状态" style={{ width: '150px' }}>
            <Select.Option value="1">一键报警</Select.Option>
            <Select.Option value="0">卫生间报警</Select.Option>
            <Select.Option value="2">拆防报警</Select.Option>
            <Select.Option value="=3">体征报警</Select.Option>
            <Select.Option value="4">定时报警</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="isFull" label="">
          <Select placeholder="请选择闲忙状态" style={{ width: '150px' }}>
            <Select.Option value="1">正常呼叫</Select.Option>
            <Select.Option value="1">请求增援</Select.Option>
            <Select.Option value="2">满床</Select.Option>
            <Select.Option value="3">进入护理</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button onClick={onReset}>重置</Button>
          </Space>
        </Form.Item>
      </Form>
      <Space style={{ marginTop: '30px' }}>
        <Button type="primary" onClick={() => show()}>
          添加设备
        </Button>
        <Button type="primary">导入</Button>
        <Button type="primary">导出</Button>
        <Button type="primary">一键重启</Button>
        <Button type="primary">一键关机</Button>
        <Button type="primary">一键开机</Button>
        <Button danger>批量升级设备</Button>
      </Space>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        scroll={{ x: 1500 }}
        style={{ marginTop: '30px' }}
        bordered
      />
      {workList.addNembers && (
        <EquipmentDetail list={workList.list} visible onCancel={handleCancel} />
      )}
    </>
  )
}

export default Equipment
