import React, { useState, useEffect } from 'react'
import { Button, Input, Form, Modal, message, Radio } from 'antd'

function TypeDetail(props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [value, setValue] = useState(2)
  const { TextArea } = Input
  const { title, okText, cancelText } = props

  const handleOk = () => {
    form.submit()
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Modal
        title={props.title}
        open={props.visible}
        onOk={handleOk}
        onCancel={props.onCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form
          form={form}
          labelAlign="right"
          layout="horizontal"
          onFinish={props.onFinish}
        >
          <Form.Item
            label="排序"
            name="dept_id4"
            rules={[{ required: true, message: '请输入排序' }]}
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
          <Form.Item label="说明" name="dept_id3">
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
        </Form>
      </Modal>
    </>
  )
}
export default TypeDetail
