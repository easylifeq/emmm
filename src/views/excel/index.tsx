import React, { useState } from 'react'
import { Button, Checkbox, Form, Input, Select, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import styles from './index.module.less'

function Excel() {
  const [form] = Form.useForm()

  const onFinish = (values) => {
    console.log('Received values of form: ', values)
  }
  const normFile = (e) => {
    console.log('Upload event:', e)
    const formData = new FormData()
    formData.append('file', e.file)

    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  const beforeUpload = ({ fileList }) => {
    return false
  }

  return (
    <>
      <div className={styles.formCon}>
        <Form
          form={form}
          layout="horizontal"
          labelAlign="left"
          onFinish={onFinish}
        >
          <Form.Item
            name="1"
            label="请选择导入类型"
            rules={[{ required: true, message: '请选择导入类型' }]}
          >
            <Select placeholder="请选择导入类型">
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="2"
            label="上传Excel文件"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="logo" beforeUpload={beforeUpload} listType="picture">
              <Button icon={<UploadOutlined />}>点击上传</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="">
            <Button type="primary" htmlType="submit">
              导入模版下载
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default Excel
