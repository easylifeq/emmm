import React, { useState, useEffect } from 'react';
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Upload,
  Space,
  message,
  Table,
} from 'antd';

import styles from './index.less';
import { getDataList, getSickRoom } from '../../../api/routes';

import { getArticleList } from '@/api/article';

function Device() {
  const { Option } = Select;
  const [form] = Form.useForm(); //搜索
  const [type, setType] = useState('ks');
  const [searchValue, setSearchValue] = useState({
    area: '',
    dept: '',
    isFull: '',
  });
  const [firstSelectOptions, setFirstSelectOptions] = useState([]);
  const [secondSelectOptions, setSecondSelectOptions] = useState([]);
  const [firstId, setFirstId] = useState('');

  const handleSecondSelectChange = (value) => {
    console.log(value, 'value');
    setFirstId(value);
    setType('bq');
    form.setFieldsValue({ bq: undefined });
  };
  const onFinish = (values) => {
    console.log(values, '00000');
    setSearchValue({
      area: values.bq,
      dept: values.ks,
      isFull: values.isFull,
    });
  };

  const handleActive = async (type) => {
    const params = { type: type, dept_id: firstId };
    console.log(params, 'params');
    try {
      const response = await getDataList(params);
      const res = response.data;
      if (type === 'ks' && res.code === 200) {
        setFirstSelectOptions(res.data);
      } else if (type === 'bq' && res.code === 200) {
        setSecondSelectOptions(res.data);
      }
      if (type === '' && res.code === 500) {
        message.error('出院失败，请重试！');
      } else if (type === 'ys' && res.code === 500) {
        message.error('获取信息失败！');
      }
    } catch (error) {
      console.error('获取数据失败:', error);
    }
  };

  // 搜索重置
  const onReset = () => {
    form.resetFields();
  };

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const columns = [
    {
      title: '序号',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '科室',
      dataIndex: 'age',
      key: 'age',
      align: 'center',
    },
    {
      title: '病区',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
    },
    {
      title: '操作',
      // dataIndex: 'address',
      key: 'address',
      align: 'center',
      render: (_text, _record, _index) => (
        <>
          <Button type="primary">下发设备</Button>
          <Button type="primary" style={{ marginLeft: '10px' }}>
            编辑
          </Button>
        </>
      ),
    },
  ];

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
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button onClick={onReset}>重置</Button>
          </Space>
        </Form.Item>
      </Form>

      <Table dataSource={dataSource} columns={columns} />
    </>
  );
}

export default Device;
