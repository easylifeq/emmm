import React, { useState, useEffect } from 'react'
import { Space, Button, Input, Select, Form, Pagination } from 'antd'
import Detail from './details'
import styles from './index.module.less'
import { getBedList } from '@/api/interface.ts'
import pic1 from '@/assets/image/1.png'
import pic2 from '@/assets/image/2.png'
import pic3 from '@/assets/image/3.png'
import pic4 from '@/assets/image/4.png'
import pic5 from '@/assets/image/5.png'

function BedTable() {
  const [form] = Form.useForm() //搜索
  const [workList, setWorkList] = useState({ list: {}, addNembers: false })
  const [list, setList] = useState([])
  const [page, setPage] = useState<number>(1)
  const [size, setSize] = useState<number>(20)
  const [total, setTotal] = useState<number>(0)
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(30)
  const [bedSer, setBedSer] = useState('')

  // 搜索
  const onSearch = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('Success:', values)
        form.resetFields()
      })
      .catch((errorInfo) => {
        console.log('Failed:', errorInfo)
      })
  }

  // 重置
  const onReset = () => {
    form.resetFields()
  }

  const showBed = (item: any) => {
    setWorkList({ addNembers: true, list: { item } })
  }
  const handleCancel = () => {
    setWorkList({ list: {}, addNembers: false })
  }

  const onPageChange = (page: any, perPage: any) => {
    console.log(page, perPage)

    setCurrent(page)
    setPageSize(perPage)
  }

  const handleClick = (type: any) => {
    setBedSer(type)
  }

  const getBed = async () => {
    const params = {
      current: current,
      pageSize: pageSize,
      search: bedSer,
    }
    const data = await getBedList(params)
    setList(data.data)
    setTotal(data.total.total)
  }

  useEffect(() => {
    getBed()
  }, [current, pageSize, bedSer])

  return (
    <>
      {/* 搜索 */}
      <div className={styles.content_box1}>
        <div className={styles.card_style1}>
          <div className={styles.flex_center} onClick={() => handleClick('')}>
            <img src={pic1} style={{ width: '80%' }} />
          </div>
          <div className={styles.desc}>
            <span>总床位数</span>
            <span style={{ position: 'relative' }}>18</span>
          </div>
        </div>
        <div className={styles.card_style1} onClick={() => handleClick('0')}>
          <div className={styles.flex_center}>
            <img src={pic2} style={{ width: '80%' }} />
          </div>
          <div className={styles.desc}>
            <span>今日入院人数</span>
            <span style={{ position: 'relative' }}>18</span>
          </div>
        </div>
        <div className={styles.card_style1} onClick={() => handleClick('1')}>
          <div className={styles.flex_center}>
            <img src={pic3} style={{ width: '80%' }} />
          </div>
          <div className={styles.desc}>
            <span>代入科人数</span>
            <span style={{ position: 'relative' }}>18</span>
          </div>
        </div>
        <div className={styles.card_style1} onClick={() => handleClick('2')}>
          <div className={styles.flex_center}>
            <img src={pic4} style={{ width: '80%' }} />
          </div>
          <div className={styles.desc}>
            <span>今日出院人数</span>
            <span style={{ position: 'relative' }}>18</span>
          </div>
        </div>
        <div className={styles.card_style1} onClick={() => handleClick('3')}>
          <div className={styles.flex_center}>
            <img src={pic5} style={{ width: '80%' }} />
          </div>
          <div className={styles.desc}>
            <span>今日出院人数</span>
            <span style={{ position: 'relative' }}>18</span>
          </div>
        </div>
      </div>
      <Form
        form={form}
        layout="inline"
        style={{ marginTop: '20px', marginBottom: '20px' }}
      >
        <Form.Item name="dept">
          <Input placeholder="请输入患者姓名" />
        </Form.Item>
        <Form.Item name="area">
          <Select placeholder="请输入所属病区">
            <Select.Option value="3">是</Select.Option>
            <Select.Option value="4">否</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="name">
          <Input placeholder="请输入患者姓名" />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" onClick={onSearch}>
              搜索
            </Button>
            <Button onClick={onReset}>重置</Button>
          </Space>
        </Form.Item>
      </Form>
      <div className={styles.content_box}>
        {list.map((item) => (
          <div className={styles.card_style} onClick={() => showBed(item)}>
            <div className={styles.box_header}>
              <span style={{ flex: '2 1 0%' }}>{item?.bed_name}</span>
              <span style={{ flex: '4 1 0%' }}>{item?.sick_name}</span>
              <span style={{ flex: '1.5 1 0%' }}>
                {' '}
                {item?.sick_sex == 1 ? '男' : '女'}
              </span>
            </div>
            <div className={styles.card_content}>
              <p>
                <span>住院号：</span>
                <span>{item.sick_no ? item.sick_no : null}</span>
              </p>
              <p>
                <span>入院诊断：</span>
                <span>{item.diagnosis_name ? item.diagnosis_name : null}</span>
              </p>
              <p>
                <span>入院时间：</span>
                <span>{item.sick_in_time ? item.sick_in_time : null}</span>
              </p>
              <p>
                <span>患者类型：</span>
                <span>{null}</span>
              </p>
              <p>
                <span>主治医师：</span>
                <span>{item.bed_doctor_no ? item.bed_doctor_no : null}</span>
              </p>
              <p>
                <span>责任护士：</span>
                <span>{item.duty_nurse_no ? item.duty_nurse_no : null}</span>
              </p>
              <p>
                <span>所属科室：</span>
                <span>{item.dept_id ? item.dept_id : null}</span>
              </p>
              <p>
                <span>所属病区：</span>
                <span>{item.area_id ? item.area_id : null}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      {workList.addNembers && (
        <Detail
          list={workList.list}
          visible
          onCancel={handleCancel}
          getBedList={getBed}
        />
      )}
      <Pagination
        total={total}
        showTotal={(total) => `共 ${total} 条`}
        showSizeChanger
        showQuickJumper
        current={current}
        pageSize={pageSize}
        onChange={onPageChange}
      />
    </>
  )
}

export default BedTable
