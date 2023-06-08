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
  Card,
  List,
  Row,
  Col,
  Pagination,
  Radio,
} from 'antd';

function EquipmentDetail(props) {
  const [form] = Form.useForm(); //搜索
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
  };
  return (
    <>
      <Modal
        title="基本信息"
        open={props.visible}
        onCancel={props.onCancel}
        onOk={onOk}
        // footer={null}
        width={700}
      >
        <Form
          form={form}
          labelAlign="left"
          // onFinish={stffFinish}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="设备排序"
                name="sick_diet"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                // initialValue={detailed.sick_diet}
                rules={[{ required: true, message: '请输入设备排序' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  // defaultValue={detailed.sick_diet}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="设备代码"
                name="sick_safety_precautions"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                // initialValue={detailed.sick_safety_precautions}
              >
                <Input
                  style={{ width: '100%' }}
                  // defaultValue={detailed.sick_safety_precautions}
                />
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
                // initialValue={detailed.dept_id}
                rules={[{ required: true, message: '请输入所属科室' }]}
              >
                <Select
                // defaultValue={detailed.dept_id} disabled
                >
                  <Select.Option value="9">特级护理</Select.Option>
                  <Select.Option value="1">一级护理</Select.Option>
                  <Select.Option value="23">三级护理</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="所属病区"
                name="area_id"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                // initialValue={detailed.area_id}
                rules={[{ required: true, message: '请输入所属病区' }]}
              >
                <Select
                // defaultValue={detailed.area_id} disabled
                >
                  <Select.Option value="9">特级护理</Select.Option>
                  <Select.Option value="1">一级护理</Select.Option>
                  <Select.Option value="23">三级护理</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="病房快照"
                name="dept_id"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                // initialValue={detailed.dept_id}
                rules={[{ required: true, message: '请输入病房快照' }]}
              >
                <Select
                // defaultValue={detailed.dept_id} disabled
                >
                  <Select.Option value="9">特级护理</Select.Option>
                  <Select.Option value="1">一级护理</Select.Option>
                  <Select.Option value="23">三级护理</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="病床快照"
                name="area_id"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                // initialValue={detailed.area_id}
                rules={[{ required: true, message: '请输入病床快照' }]}
              >
                <Select
                // defaultValue={detailed.area_id} disabled
                >
                  <Select.Option value="9">特级护理</Select.Option>
                  <Select.Option value="1">一级护理</Select.Option>
                  <Select.Option value="23">三级护理</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="设备名称"
                name="sick_diet"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                // initialValue={detailed.sick_diet}
                rules={[{ required: true, message: '请输入设备名称' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  // defaultValue={detailed.sick_diet}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="IP地址"
                name="sick_safety_precautions"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                // initialValue={detailed.sick_safety_precautions}
                rules={[{ required: true, message: '请输入IP地址' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  // defaultValue={detailed.sick_safety_precautions}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="子网掩码"
                name="sick_diet"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                // initialValue={detailed.sick_diet}
                rules={[{ required: true, message: '请输入子网掩码' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  // defaultValue={detailed.sick_diet}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="网关地址"
                name="sick_safety_precautions"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                // initialValue={detailed.sick_safety_precautions}
                rules={[{ required: true, message: '请输入网关地址' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  // defaultValue={detailed.sick_safety_precautions}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="设备位置"
                name="sick_condition"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                // initialValue={detailed.sick_condition}
              >
                <Input
                  style={{ width: '100%' }}
                  // defaultValue={detailed.sick_condition}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="关联病房类型"
                name="nursing_level"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                // initialValue={detailed.nursing_level}
                rules={[{ required: true, message: '请输入关联病房类型' }]}
              >
                <Select
                // defaultOpen={detailed.nursing_level}
                >
                  <Select.Option value="9">特级护理</Select.Option>
                  <Select.Option value="1">一级护理</Select.Option>
                  <Select.Option value="23">三级护理</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="绑定门灯" name="role">
            <Radio.Group>
              <Radio value={0}>启用</Radio>
              <Radio value={2}>禁用</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="启用状态" name="role1">
            <Radio.Group>
              <Radio value={0}>启用</Radio>
              <Radio value={1}>禁用</Radio>
            </Radio.Group>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="过敏类型"
                name="sick_allergy"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                // initialValue={detailed.sick_allergy}
              >
                <Input
                  placeholder="暂无"
                  // defaultValue={detailed.sick_allergy}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="隔离类型"
                name="sick_isolation"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                // initialValue={detailed.sick_isolation}
              >
                <Input
                  placeholder="暂无"
                  // defaultValue={detailed.sick_isolation}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default EquipmentDetail;
