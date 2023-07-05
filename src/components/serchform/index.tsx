import React, { useState, useEffect } from 'react';
import { Form, Select, message } from 'antd';
// import { getDataList } from '../../api/interface'

const SearchForm = ({ onSearch }) => {
  const { Option } = Select;
  const [form] = Form.useForm(); //搜索
  const [type, setType] = useState('ks');
  const [firstId, setFirstId] = useState(null);
  const [firstSelectOptions, setFirstSelectOptions] = useState([]);
  const [secondSelectOptions, setSecondSelectOptions] = useState([]);

  const handleSecondSelectChange = (value: any) => {
    setFirstId(value);
    setType('bq');
    form.setFieldsValue({ bq: undefined });
    onSearch({ ks: value, bq: undefined });
  };

  const handleActive = async () => {
    const params = { type: type, dept_id: firstId };
    const res = await getDataList(params);
    if (res) {
      if (type === 'ks') {
        setFirstSelectOptions(res);
      } else if (type === 'bq') {
        setSecondSelectOptions(res);
      }
    } else {
      message.error('或许信息失败，请重试！');
    }
  };

  const handleBqChange = (value: any) => {
    onSearch({ ks: firstId, bq: value }); // 调用 onSearch 回调函数
  };
  // 在组件加载时请求接口并获取值
  useEffect(() => {
    handleActive();
  }, [type, firstId]);

  return (
    <>
      <Form form={form} layout="inline">
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
            onChange={handleBqChange}
          >
            {secondSelectOptions.map((option) => (
              <Option key={option.id} value={option.id}>
                {option.area_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </>
  );
};

export default SearchForm;
