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
  DatePicker,
  Slider,
  InputNumber,
  TimePicker,
} from 'antd'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'
import styles from './index.module.less'

dayjs.extend(weekday)
dayjs.extend(localeData)

function TabsList(props) {
  const { RangePicker } = DatePicker
  const [activeTab, setActiveTab] = useState('volume')
  const format = 'HH:mm'
  const [form] = Form.useForm() //音量设置
  const [screenForm] = Form.useForm() //音量设置

  const itemList = [
    {
      key: '1',
      label: `音量设置`,
      children: [
        <Form form={form} layout="horizontal" labelAlign="left">
          <Form.Item label="夜晚时间短" name="time">
            <TimePicker.RangePicker />
          </Form.Item>
          <Form.Item label="通话音量" name="time1">
            <Slider defaultValue={30} />
          </Form.Item>
          <Form.Item label="提示音量" name="time2">
            <Slider defaultValue={30} />
          </Form.Item>
          <Form.Item label="白天媒体音量" name="time3">
            <Slider defaultValue={30} />
          </Form.Item>
          <Form.Item label="夜晚媒体音量" name="time4">
            <Slider defaultValue={30} />
          </Form.Item>
        </Form>,
      ],
    },
    {
      key: '2',
      label: `屏幕设置`,
      children: [
        <Form form={screenForm}>
          <Form.Item label="亮度调节" name="tim1">
            <Slider defaultValue={30} />
          </Form.Item>
          <Form.Item label="屏幕时间" name="tim2">
            <InputNumber
              min={1}
              max={30}
              defaultValue={3}
              placeholder="屏保世界只能输入1～30"
            />
            <span>m （屏保世界只能输入1～30）</span>
          </Form.Item>
          <Form.Item
            label="亮屏时间"
            name="tim3"
            rules={[{ required: true, message: '请输入亮屏时间' }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            label="熄屏时间"
            name="tim4"
            rules={[{ required: true, message: '请输入熄屏时间' }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item name="time0">
            <div>夜间模式</div>
          </Form.Item>
          <Form.Item label="亮度调节" name="tim5">
            <Slider defaultValue={30} />
          </Form.Item>
          <Form.Item label="屏保时间" name="tim4">
            <InputNumber
              min={1}
              max={30}
              defaultValue={3}
              placeholder="屏保世界只能输入1～30"
            />
            <span>m （屏保世界只能输入1～30）</span>
          </Form.Item>
        </Form>,
      ],
    },
  ]

  const handleTabChange = (tabName) => {
    setActiveTab(tabName)
  }

  return (
    <>
      <Tabs
        className={styles.tab}
        defaultActiveKey="1"
        items={itemList}
        // onChange={handleTabChange}
        // activeKey={activeTab}
      />
    </>
  )
}

export default TabsList
