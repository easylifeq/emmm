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
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}


function BedAdd(props: any) {
  const [form] = Form.useForm();//搜索
  const [value, setValue] = useState(1);
  const { TextArea } = Input;// 角色
  const [type, setType] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forDire] = Form.useForm();//搜索
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const [total, setTotal] = useState<number>(0);

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
  const onDire = () => {
    setIsModalOpen(true)
    setType(type)
  }
  const onNur = () => {
    setType(type)
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // 搜索按钮
  const onSerch = () => {
    forDire
      .validateFields()
      .then((values) => {
        console.log('Success:', values);
        forDire.resetFields();
      })
      .catch((errorInfo) => {
        console.log('Failed:', errorInfo);
      });
  }

  //重置按钮
  const onReset = () => {
    forDire.resetFields();
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];


  const data: DataType[] = [];
  for (let i = 0; i < 9; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({

      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <>
      <Modal
        title="新增床位"
        open={props.visible}
        onCancel={props.onCancel}
        onOk={onOk}
      >
        <Form form={form}
          labelAlign="left"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            name="name"
            label="排序"
            initialValue={props.type === 'add' ? '' : props?.list?.id}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dai"
            label="床位代码"
            rules={[{ required: true, message: '请输入床位代码!' }]}
          >
            <Input placeholder="请输入床位代码" />
          </Form.Item>
          <Form.Item
            name="address"
            label="床位外部代码"
            rules={[{ required: true, message: '请输入床位外部代码!' }]}
          >
            <Input placeholder="请输入床位外部代码" />
          </Form.Item>
          <Form.Item
            name="address"
            label="床位名称"
            rules={[{ required: true, message: '床位名称!' }]}
          >
            <Input placeholder="请输入床位名称" />
          </Form.Item>
          <Form.Item
            name="address"
            label="关联科室"
            rules={[{ required: true, message: '请选择关联科室!' }]}
          >
            <Select placeholder="请选择关联科室">
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="address"
            label="关联病区"
            rules={[{ required: true, message: '请选择关联病区!' }]}
          >
            <Select placeholder="请选择关联病区">
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="address"
            label="关联病房"
            rules={[{ required: true, message: '请选择关联病房!' }]}
          >
            <Select placeholder="请选择关联病房">
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="address"
            label="管床医生"
          >
            <Input placeholder="暂无" />
            <Button
              type="primary"
              style={{ marginTop: '10px' }}
              onClick={() => onDire()}
            > 选择</Button>
          </Form.Item>
          <Form.Item
            name="address"
            label="管床护士"
          >
            <Input placeholder="暂无" />
            <Button
              type="primary"
              style={{ marginTop: '10px' }}
              onClick={() => onNur()
              }
            >选择</Button>
          </Form.Item>

          <Form.Item
            name="address"
            label="床位类型"
          >
            <Select placeholder="请选择类型">
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="jian"
            label="备注"
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="zhuang"
            label="使用状态"
          >
            <Radio.Group value={value}>
              <Radio value={1}>是</Radio>
              <Radio value={2}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="zhuang"
            label="状态"
          >
            <Radio.Group value={value}>
              <Radio value={1}>启用</Radio>
              <Radio value={2}>禁用</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="选择职工"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        // bodyStyle={{ width: '800px' }}
        width={900}
      // height={600}
      >
        <Form form={forDire} layout="inline" >
          {/* 搜索 */}
          <Form.Item name="name" >
            <Input placeholder="请选择职工姓名" />
          </Form.Item>
          <Form.Item name="test" >
            <Input placeholder="请选择职工工号" />
          </Form.Item>
          <Form.Item name="ben"  >
            <Select placeholder="是否本部">
              <Select.Option value="yes">是</Select.Option>
              <Select.Option value="no">否</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" onClick={onSerch}>
                搜索
              </Button>
              <Button
                onClick={onReset}
              >
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>

        <Table
          rowSelection={{
            type: 'radio',
          }}
          columns={columns}
          dataSource={data}
          pagination={{
            //分页
            total,
            showSizeChanger: true,
            showTotal: (t) => `共${t}条`,
            defaultPageSize: 20,
            onChange: (p, s) => {
              setPage(p);
              setSize(s);
            },
          }}
        />
      </Modal >

    </>
  )
}

export default BedAdd;