import React, { useState, useEffect } from 'react';
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
  Popconfirm
} from 'antd';
import { Radio } from 'antd';


function RegionAdd(props: any) {
  // console.log(props.type, props.list.record, 'type');
  const list = props.list.record; // table数据
  console.log(list, 'list');
  const level = props.list?.record?.level
  const [label, setLabel] = useState({ label: '楼栋名称', default: '' })

  console.log(label, 'label');



  const [form] = Form.useForm();//搜索
  const [value, setValue] = useState(1); // 角色
  const { TextArea } = Input;


  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('Success:', values);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log('Failed:', errorInfo);
      });
  }
  const onCancel = () => {
    form.resetFields()
  }

  useEffect(() => {
    const list = props.list.record;
    if (props.list?.record?.level == '1') {
      setLabel({ label: '楼层名称', default: list.name })
    } else if (props.list?.record?.level == '2') {
      setLabel({ label: '房间名称', default: list.name })
    }
  }, [props]);


  return (
    <>
      <Modal
        title="添加"
        open={props.visible}
        onCancel={props.onCancel}
        onOk={onOk}
      >
        <Form
          name="添加楼栋"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="排序"
            name="username"
          >
            <Input placeholder='请输入排序' />
          </Form.Item>
          <Form.Item
            label={label.label}
            name="dong"
            rules={[{ required: true, message: '请输入楼层名称！' }]}
          >
            <Input defaultValue={label.default} />
          </Form.Item>
          {
            props.type == 'add' ? null :
              <>
                <Form.Item
                  label="关联病区"
                  name="qu"
                  rules={[{ required: true, message: '请选择关联病区' }]}
                >
                  <Select placeholder="请选择关联病区">
                    <Select.Option value="1">Demo</Select.Option>
                  </Select>
                </Form.Item>
                {
                  level == '1' ? null : <>
                    <Form.Item
                      label="关联病房"
                      name="fang"
                      rules={[{ required: true, message: '请选择关联病房' }]}
                    >
                      <Select placeholder="请选择关联病区">
                        <Select.Option value="2">2</Select.Option>
                      </Select>
                    </Form.Item>
                  </>
                }
              </>
          }
          <Form.Item
            label="备注"
            name="password"
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal >
    </>
  )
}

export default RegionAdd;