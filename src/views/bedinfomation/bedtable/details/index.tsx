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
  Switch,
  Tabs,
  Row,
  Col,
  Divider,
  DatePicker as TDatePicker,
} from 'antd'
import { Radio } from 'antd'
import { InputNumber } from 'antd'
import dayjs from 'dayjs'
import {
  getUpdateSick,
  getOut,
  getDataList,
  getNurseList,
  geUpdateBed,
  getChangeRecord,
} from '@/api/interface'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'

dayjs.extend(weekday)
dayjs.extend(localeData)

function Detail(props: any) {
  // console.log(props, 'porps')
  let DatePicker: any = TDatePicker
  const detailed = props?.list?.item
  const sick_id = detailed.sick_id
  const [form] = Form.useForm() //搜索
  // const { TabPane } = Tabs
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [forDire] = Form.useForm() //搜索
  const [page, setPage] = useState<number>(1)
  const [size, setSize] = useState<number>(20)
  const [total, setTotal] = useState<number>(0)
  const [bedForm] = Form.useForm() //搜索
  const [activeTab, setActiveTab] = useState('1')
  const [formList, setFormList] = useState({})
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [activeVisible, setActiveVisible] = useState([])
  const { Option } = Select
  const [staff, setStaff] = useState([])
  const [dire, setDire] = useState('')
  const [nurse, setNurse] = useState({ name: '', code: '' })
  const [doctor, setDoctor] = useState({ name: '', code: '' })
  const [changeBedList, setChangeBedList] = useState([])

  const onChange = (key: string) => {
    console.log(key)
  }
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '职工工号',
      dataIndex: 'user_out_no',
      key: 'user_out_no',
    },
    {
      title: '职工姓名',
      dataIndex: 'user_realname',
      key: 'user_realname',
    },
    {
      title: '科室',
      dataIndex: 'dept_id',
      key: 'dept_id',
    },
    {
      title: '病区',
      dataIndex: 'area_id',
      key: 'area_id',
    },
    {
      title: '操作',
      // dataIndex: 'code',
      width: 80,
      ellipsis: true,
      key: 'action',
      render: (_, record) => (
        <Radio
          checked={selectedRowKeys.includes(record.id)}
          onClick={() => handleRowSelect(setSelectedRowKeys, record)}
        />
      ),
    },
  ]

  const columnsChange = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '更换时间',
      dataIndex: 'change_bed_time',
      key: 'change_bed_time',
      width: 200,
    },
    {
      title: '历史床位',
      dataIndex: 'old_bed_out_code',
      key: 'old_bed_out_code',
      width: 100,
    },
    {
      title: '更换后床位',
      dataIndex: 'now_bed_out_code',
      key: 'now_bed_out_code',
      width: 100,
    },
    {
      title: '操作时间',
      dataIndex: 'create_time',
      key: 'create_time',
      width: 200,
    },
    {
      title: '操作人',
      dataIndex: 'user_realname',
      key: 'user_realname',
      width: 100,
    },
  ]

  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  //重置按钮
  const onReset = () => {
    forDire.resetFields()
  }
  // 责任医生
  const onDire = (type, item) => {
    setDire(item)
    setIsModalOpen(true)
    handleActive(type, '')
  }

  const onNur = (type, item) => {
    setDire(item)
    setIsModalOpen(true)
    handleActive(type, '')
  }

  const onFinish = (values: any) => {
    handSick(values)
  }
  const stffFinish = (values: any) => {
    console.log(values, 'valus')
    handChangeBed(values)
  }
  // 换床
  const handChangeBed = async (data: any) => {
    const params = {
      ...data,
      old_bed: detailed.bed_code,
      sick_id: detailed.sick_id,
    }
    console.log(params, 'data')
    /* try {
      const response = await geUpdateBed(params)
      const res = response.data
      if (res.code === 200) {
        message.success('修改成功')
        props.onCancel()
        props.getBedList()
        bedForm.resetFields()
      }
      if (res.code === 500) {
        message.error('修改失败，请重试！')
        bedForm.resetFields()
      }
    } catch (error) {
      console.error('获取数据失败:', error)
    } */
    const res = await geUpdateBed(params)
    props.onCancel()
    props.getBedList()
    bedForm.resetFields()
  }

  // 护士搜索
  const handleSearch = (values: any) => {
    handleActive('ys', values)
  }
  // 修改
  const handSick = async (data) => {
    const duty_nurse_no = nurse.code
    const bed_doctor_no = doctor.code
    const params = { ...data, sick_id, duty_nurse_no, bed_doctor_no }
    console.log(params, 'data')
    /* try {
      const response = await getUpdateSick(params)
      const res = response.data
      if (res.code === 200) {
        message.success('修改成功')
        props.onCancel()
        props.getBedList()
      }
      if (res.code === 500) {
        message.error('修改失败，请重试！')
        props.onCancel()
      }
    } catch (error) {
      console.error('获取数据失败:', error)
    } */
    const res = await getUpdateSick(params)
    props.onCancel()
    props.getBedList()
  }
  // 出院
  const handleClickOut = async () => {
    const params = { sick_id: sick_id }
    /*  try {
      const response = await getOut(params)
      const res = response.data
      if (res.code === 200) {
        message.success('出院成功')
        props.onCancel()
        props.getBedList()
      }
      if (res.code === 500) {
        message.error('出院失败，请重试！')
      }
    } catch (error) {
      console.error('获取数据失败:', error)
    } */
    const data = await getOut(params)
    message.success('出院成功')
    props.onCancel()
    props.getBedList()
  }

  //// 获取换床更换床位列表
  const handleActive = async (type, value) => {
    var params
    if (type === '') {
      params = { type: 'cw' }
    } else if (type === 'ys') {
      params = { type: 'ys', ...value }
    }
    /* try {
      const response = await getDataList(params)
      const res = response.data
      if (type === '' && res.code === 200) {
        setActiveVisible(res.data)
      } else if (type === 'ys' && res.code === 200) {
        setStaff(res.data)
      }
      if (type === '' && res.code === 500) {
        message.error('出院失败，请重试！')
      } else if (type === 'ys' && res.code === 500) {
        message.error('获取信息失败！')
      }
    } catch (error) {
      console.error('获取数据失败:', error)
    } */
    const response = await getDataList(params)
    console.log(response, 'response', type)
    if (response.length > 0) {
      if (type === '') {
        console.log(1111)
        setActiveVisible(response)
      } else if (type === 'ys') {
        console.log(222)
        setStaff(response)
      }
    } else {
      message.error('获取信息失败！')
    }
  }
  // 获取床位列表
  const handleList = async () => {
    const params = { sick_id: detailed.sick_id }
    console.log(params, 'params----')
    /*   try {
      const response = await getChangeRecord(params)
      const res = response.data
      if (res.code === 200) {
        setChangeBedList(res.data)
      } else if (res.code === 500) {
        setChangeBedList([])
      }
    } catch (error) {
      console.error('获取数据失败:', error)
    } */
    const data = await getChangeRecord(params)
    setChangeBedList(data)
  }
  const handleTabChange = (key: any) => {
    if (key === '2') {
      handleActive('', '')
      handleList()
    }
    setActiveTab(key)
  }

  const selectOptions = activeVisible.map((option) => (
    <Option key={option.bed_code} value={option.bed_code}>
      {option.bed_name}
    </Option>
  ))
  const rowSelection = {
    selectedRowKeys,
    columnWidth: 0,
    renderCell: () => null,
    onSelect: (record, selected) => {
      if (selected) {
        handleRowSelect(setSelectedRowKeys, record)
      } else {
        setSelectedRowKeys([])
      }
    },
  }

  const handleRowSelect = (setSelectedRowKeys, selectedRow) => {
    console.log('selectedRow', selectedRow)
    if (dire === '选择医生') {
      setDoctor({
        code: selectedRow.user_out_no,
        name: selectedRow.user_realname,
      })
    } else {
      setNurse({
        code: selectedRow.user_out_no,
        name: selectedRow.user_realname,
      })
    }
    setSelectedRowKeys([selectedRow.id])
  }

  // useEffect(() => {
  //   getRoom();
  // }, []);

  const items = [
    {
      label: '基本信息',
      key: '1',
      children: [
        <Form
          onFinish={onFinish}
          labelAlign="left"
          layout="horizontal"
          form={form}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="床位"
                name="bed_name"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValue={detailed.bed_name}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="床位代码:"
                name="bed_code"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValue={detailed.bed_code}
              >
                <InputNumber style={{ width: '100%' }} disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="所属科室"
                name="dept_id"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValue={detailed.dept_id}
              >
                <Select defaultValue={detailed.dept_id} disabled></Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="所属病区"
                name="area_id"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValue={detailed.area_id}
              >
                <Select defaultValue={detailed.area_id} disabled></Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="住院号"
                name="sick_no"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValue={detailed.sick_no}
                rules={[{ required: true, message: '请输入住院号' }]}
              >
                <Input defaultValue={detailed.sick_no} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="住院流水号"
                name="sick_serial_no"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 16 }}
                initialValue={detailed.sick_serial_no}
                rules={[{ required: true, message: '请输入住院流水号' }]}
              >
                <InputNumber
                  defaultValue={detailed.sick_serial_no}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="患者姓名"
                name="sick_name"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValue={detailed.sick_name}
                rules={[{ required: true, message: '请输入患者姓名' }]}
              >
                <Input defaultValue={detailed.sick_name} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="患者年龄"
                name="sick_age"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValue={detailed.sick_age}
                rules={[{ required: true, message: '请输入患者年龄' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  defaultValue={detailed.sick_age}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="患者性别"
                name="sick_sex"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValue={detailed.sick_sex == 1 ? '男' : '女'}
                rules={[{ required: true, message: '请输入患者性别' }]}
              >
                <Select defaultValue={detailed.sick_sex == 1 ? '男' : '女'}>
                  <Select.Option value="1">男</Select.Option>
                  <Select.Option value="2">女</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="诊断结果"
                name="diagnosis_name"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValue={detailed.diagnosis_name}
                rules={[{ required: true, message: '请输入诊断结果' }]}
              >
                <Input defaultValue={detailed.diagnosis_name} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="sick_identifier"
            label="二维码编码"
            initialValue={detailed.sick_identifier}
            // labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}
          >
            <Input placeholder="暂无" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="bed_doctor_no"
            label="责任医生"
            initialValue={detailed.bed_doctor_no}
          >
            <Input
              placeholder="暂无"
              value={doctor.name || detailed.bed_doctor_no}
            />
            <Button
              type="primary"
              style={{ marginTop: '10px' }}
              onClick={() => onDire('ys', '选择医生')}
            >
              {' '}
              选择
            </Button>
          </Form.Item>
          <Form.Item
            name="duty_nurse_no"
            label="责任护士"
            initialValue={detailed.duty_nurse_no}
          >
            <Input
              placeholder="暂无"
              value={nurse.name || detailed.duty_nurse_no}
              // defaultValue={detailed.bed_doctor_no}
            />
            <Button
              type="primary"
              style={{ marginTop: '10px' }}
              onClick={() => onNur('ys', '选择护士')}
            >
              选择
            </Button>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="入院时间"
                name="sick_in_time"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValue={dayjs(
                  detailed.sick_in_time,
                  'YYYY-MM-DD HH:mm:ss'
                )}
                rules={[{ required: true, message: '请输入入院时间' }]}
              >
                <DatePicker
                  //  onChange={onChange}
                  format="YYYY-MM-DD HH:mm:ss"
                  style={{ width: '100%' }}
                  defaultValue={dayjs(
                    detailed.sick_in_time,
                    'YYYY-MM-DD HH:mm:ss'
                  )}
                  showTime={{
                    defaultValue: dayjs(
                      detailed.sick_in_time,
                      'YYYY-MM-DD HH:mm:ss'
                    ),
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="出院时间"
                name="sick_out_time"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValue={dayjs(
                  detailed.sick_out_time,
                  'YYYY-MM-DD HH:mm:ss'
                )}
                rules={[{ required: true, message: '请输入出院时间' }]}
              >
                <DatePicker
                  //  onChange={onChange}
                  format="YYYY-MM-DD HH:mm:ss"
                  style={{ width: '100%' }}
                  defaultValue={dayjs(
                    detailed.sick_out_time,
                    'YYYY-MM-DD HH:mm:ss'
                  )}
                  showTime={{
                    defaultValue: dayjs(
                      detailed.sick_in_time,
                      'YYYY-MM-DD HH:mm:ss'
                    ),
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="护理级别"
                name="nursing_level"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValue={detailed.nursing_level}
                rules={[{ required: true, message: '请输入护理级别' }]}
              >
                <Select defaultOpen={detailed.nursing_level}>
                  <Select.Option value="9">特级护理</Select.Option>
                  <Select.Option value="1">一级护理</Select.Option>
                  <Select.Option value="23">三级护理</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="病情症状"
                name="sick_condition"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValue={detailed.sick_condition}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  defaultValue={detailed.sick_condition}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="过敏类型"
                name="sick_allergy"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValue={detailed.sick_allergy}
              >
                <Input
                  placeholder="暂无"
                  defaultValue={detailed.sick_allergy}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="隔离类型"
                name="sick_isolation"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValue={detailed.sick_isolation}
              >
                <Input
                  placeholder="暂无"
                  defaultValue={detailed.sick_isolation}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="饮食状况"
                name="sick_diet"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValue={detailed.sick_diet}
              >
                <Input
                  style={{ width: '100%' }}
                  defaultValue={detailed.sick_diet}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="安全防范"
                name="sick_safety_precautions"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValue={detailed.sick_safety_precautions}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  // defaultValue={detailed.sick_safety_precautions}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="">
            {' '}
            <div>
              (注：病情症状，过敏类型，隔离状况，饮食状况，安全防范可以输入多个，用英文","隔开)
            </div>
          </Form.Item>
          <Divider />
          <Form.Item name="">
            <Space align="start">
              <Button type="primary" danger onClick={() => handleClickOut()}>
                出院
              </Button>
            </Space>
            <Space align="end" style={{ position: 'absolute', right: '0' }}>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
              <Button
                // onClick={props.handleCancel}
                onClick={() => props.onCancel()}
              >
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>,
      ],
    },
    {
      label: '换床',
      key: '2',
      children: [
        <div>
          <Form form={bedForm} labelAlign="left" onFinish={stffFinish}>
            <Form.Item
              label="床位"
              initialValue={detailed.bed_name}
              // name="old_bad"
            >
              <Input
                disabled
                style={{ width: '150px' }}
                value={detailed.bed_name}
              />
            </Form.Item>
            <Form.Item label="更换床位" name="new_bed">
              <Select placeholder="请选择更换床位" style={{ width: '150px' }}>
                {selectOptions}
              </Select>
            </Form.Item>
            <Form.Item label="更换时间" name="change_time">
              <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: '200px' }}
                showTime={{
                  defaultValue: dayjs(
                    detailed.sick_in_time,
                    'YYYY-MM-DD HH:mm:ss'
                  ),
                }}
              />
            </Form.Item>
            <Form.Item name="">
              <Button type="primary" htmlType="submit">
                确认更换
              </Button>
            </Form.Item>
          </Form>
          <Table columns={columnsChange} dataSource={changeBedList} />
        </div>,
      ],
    },
  ]

  return (
    <>
      <Modal
        title="添加"
        open={props.visible}
        onCancel={props.onCancel}
        // onOk={onOk}
        footer={null}
        width={700}
      >
        <Tabs
          items={items}
          defaultActiveKey="1"
          onChange={handleTabChange}
          activeKey={activeTab}
        />
      </Modal>
      {/* 职工 */}
      <Modal
        title={dire}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        // bodyStyle={{ width: '800px' }}
        width={900}
        // height={600}
      >
        <Form form={forDire} layout="inline" onFinish={handleSearch}>
          {/* 搜索 */}
          <Form.Item name="name">
            <Input placeholder="请选择职工姓名" />
          </Form.Item>
          <Form.Item name="jobNo">
            <Input placeholder="请选择职工工号" />
          </Form.Item>
          <Form.Item name="cadre">
            <Select placeholder="是否本部">
              <Select.Option value="1">是</Select.Option>
              <Select.Option value="0">否</Select.Option>
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

        <Table
          rowKey="id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={staff}
          pagination={{
            //分页
            total,
            showSizeChanger: true,
            showTotal: (t) => `共${t}条`,
            defaultPageSize: 20,
            onChange: (p, s) => {
              setPage(p)
              setSize(s)
            },
          }}
        />
      </Modal>
    </>
  )
}

export default Detail
