import React, { useState, useEffect } from 'react'
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
  Card,
  List,
  Row,
  Col,
  Pagination,
} from 'antd'
import { Radio } from 'antd'
import styles from './index.module.less'
import { getDataList, getSickRoom } from '@/api/interface.ts'

function RoomTable() {
  const { Option } = Select
  const [form] = Form.useForm() //搜索
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(30)
  const [total, setTotal] = useState<number>(0)
  const [list, setList] = useState([])
  const [firstSelectOptions, setFirstSelectOptions] = useState([])
  const [secondSelectOptions, setSecondSelectOptions] = useState([])
  const [firstId, setFirstId] = useState('')
  const [type, setType] = useState('ks')
  const [searchValue, setSearchValue] = useState({
    area: '',
    dept: '',
    isFull: '',
  })

  const onReset = () => {
    form.resetFields()
  }
  const onFinish = (values: any) => {
    console.log(values, '00000')
    setSearchValue({
      area: values.bq,
      dept: values.ks,
      isFull: values.isFull,
    })
    getRoom()
  }

  const onPageChange = (page: any, perPage: any) => {
    console.log(page, perPage)
    setCurrent(page)
    setPageSize(perPage)
  }

  //获取搜索条件列表
  const getRoom = async () => {
    const params = {
      current: current,
      pageSize: pageSize,
      // 病区id
      area: searchValue.area,
      // 科室id
      dept: searchValue.dept,
      // 满床
      isFull: searchValue.isFull,
    }
    /*   try {
      const response = await getSickRoom(params)
      const res = response.data
      if (res.code === 200) {
        setList(res.data.data)
        setTotal(res.data.total.total)
      } else {
        setList([])
        message.error('获取数据失败，请重试！')
      }
    } catch (error) {
      console.error('获取数据失败:', error)
    } */
    const data = await getSickRoom(params)
    console.log(data, 'data--')

    setList(data.data)
    setTotal(data.total.total)
  }
  //// 获取换床更换床位列表
  const handleActive = async () => {
    const params = { type: type, dept_id: firstId }
    console.log(params, 'params')
    /*   try {
      const response = await getDataList(params)
      const res = response.data
      if (type === 'ks' && res.code === 200) {
        setFirstSelectOptions(res.data)
      } else if (type === 'bq' && res.code === 200) {
        setSecondSelectOptions(res.data)
      }
      if (type === '' && res.code === 500) {
        message.error('信息获取，请重试！')
      } else if (type === 'ys' && res.code === 500) {
        message.error('获取信息失败！')
      }
    } catch (error) {
      console.error('获取数据失败:', error)
    } */
    const response = await getDataList(params)
    const res = response

    if (type === 'ks') {
      setFirstSelectOptions(res)
    } else if (type === 'bq') {
      setSecondSelectOptions(res)
    }
    if (type === '') {
      message.error('信息获取，请重试！')
    } else if (type === 'ys') {
      message.error('获取信息失败！')
    }
  }
  const handleSecondSelectChange = (value) => {
    console.log(value, 'value')
    setFirstId(value)
    setType('bq')
    form.setFieldsValue({ bq: undefined })
  }

  useEffect(() => {
    getRoom()
  }, [current, pageSize])

  useEffect(() => {
    handleActive()
  }, [type, firstId])

  return (
    <>
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
        <Form.Item name="isFull" label="">
          <Select placeholder="床位状态" style={{ width: '150px' }}>
            <Select.Option value="1">满床</Select.Option>
            <Select.Option value="0">未满</Select.Option>
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
      <div className={styles.content_box}>
        {list.map((item) => (
          <div className={styles.card_style_2}>
            <div className={styles.box_header}>
              <span>{item.sickroom_name || '无'}</span>
              <div>
                <div className={styles.deptName}>
                  <span>{item.dept_id || '无'}</span>
                </div>
                <div className={styles.deptName}>
                  <span>{item.area_id || '无'}</span>
                </div>
              </div>
            </div>
            <div className={styles.card_content}>
              {item?.sickinfo.map((item) => (
                <div>
                  <div style={{ flex: '1.3 1 0%' }}>
                    {item.bed_name || '无'}
                  </div>
                  <div style={{ flex: '2 1 0%' }}>{item.sick_name || '无'}</div>
                  <div style={{ flex: '0.1 1 0%' }}>
                    {item.sick_sex || '无'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Pagination
        total={total}
        showTotal={(total) => `共 ${total} 条`}
        showSizeChanger
        showQuickJumper
        current={current}
        pageSize={pageSize}
        onChange={onPageChange}
        pageSizeOptions={['20', '30', '40']}
      />
    </>
  )
}

export default RoomTable
