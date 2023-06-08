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
  Popconfirm,
} from 'antd';
import { Radio } from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';
import type { ColumnsType } from 'antd/es/table';
import 'react-quill/dist/quill.snow.css';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

function WardAdd(props: any) {
  const [form] = Form.useForm();//搜索
  const [value, setValue] = useState(1); // 角色
  const { TextArea } = Input;
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
        title="新增病区信息"
        open={props.visible}
        onCancel={props.onCancel}
        onOk={onOk}
        bodyStyle={{ width: '700px' }}
      >
        <Form form={form}
          labelAlign="left"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 500 }}
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
            label="病区代码"
            rules={[{ required: true, message: '请输入病区代码!' }]}
          >
            <Input placeholder="请输入病区代码" />
          </Form.Item>
          <Form.Item
            name="address"
            label="病区外部代码"
            rules={[{ required: true, message: '请输入病区外部代码!' }]}
          >
            <Input placeholder="请输入科=病区外部代码" />
          </Form.Item>
          <Form.Item
            name="address"
            label="病区名称"
            rules={[{ required: true, message: '病区名称!' }]}
          >
            <Input placeholder="请输入病区名称" />
          </Form.Item>
          <Form.Item
            name="address"
            label="病区地址"
            rules={[{ required: true, message: '病区地址!' }]}
          >
            <Input placeholder="请输入病区地址" />
          </Form.Item>
          <Form.Item
            name="address"
            label="病区电话"
          >
            <Input placeholder="请输入病区电话" />
          </Form.Item>
          <Form.Item
            name="zhuang"
            label="关联科室"
          >
            <Select
              showSearch
              placeholder="请选择科室"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={[
                {
                  value: 'jack',
                  label: 'Jack',
                },
                {
                  value: 'lucy',
                  label: 'Lucy',
                },
                {
                  value: 'tom',
                  label: 'Tom',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="address"
            label="病区主任医生"
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
            label="病区护士长"
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
            label="病区简介"
          >
            <Input placeholder="请输入病区电话" />
          </Form.Item>
          <Form.Item
            name="address"
            label="备注"
          >
            <TextArea placeholder="备注" rows={4} />
          </Form.Item>
          <Form.Item
            label="角色"
            name="role"
          >
            <Radio.Group value={value}>
              <Radio value={1}>启用</Radio>
              <Radio value={2}>禁用</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal >

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

export default WardAdd;