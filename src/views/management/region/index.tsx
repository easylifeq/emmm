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
  Switch
} from 'antd';
import { Radio } from 'antd';
import styles from './index.less';
import RegionAdd from './regionadd'

function Region() {
  const [isModalOpen, setIsModalOpen] = useState(false);//添加楼栋
  const [fooModal, setFoolModal] = useState(false);//添加楼层
  const [roomModal, setRoomModal] = useState(false);//添加房间
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [workList, setWorkList] = useState({ type: '', list: {}, addNembers: false, });
  // const [regionForm, setRegionForm] = useState({ level: '', table: {} })



  // 删除按钮
  const handleDelete = (record: any) => {
    console.log(record, '0000');
    message.success('数据删除成功！');
  };
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 80,
    },
    {
      title: '关联病区',
      dataIndex: 'age',
      key: 'age',
      width: 100,
    },
    {
      title: '关联病房',
      dataIndex: 'address',
      key: 'address',
      width: 80,
    },
    {
      title: '备注',
      dataIndex: 'address',
      key: 'address',
      width: 80,
    },
    {
      title: '操作',
      width: 120,
      ellipsis: true,
      key: 'action',
      render: (record: any) => {
        const buttons = [
          <Space wrap>
            <Button type="primary"
              onClick={() => handleActionClick(record)}
            >
              编辑
            </Button>
            <div>
              <Popconfirm
                placement="top"
                title="确定要删除这条数据吗？"
                onConfirm={() => handleDelete(record)}
                okText="确定"
                cancelText="取消"
              >
                <Button type="primary" href="#">删除</Button>
              </Popconfirm>
            </div>
          </Space>
        ];
        if (record.level <= 2) {
          buttons.unshift(
            <Button type="primary"
              style={{ marginRight: 10 }}
              onClick={() => handleActionClick(record)}
            >
              添加下级
            </Button>
          )
        }
        return buttons;
      },
    },
  ];

  const data = [
    {
      key: 1,
      name: '1',
      level: 1,
      children: [
        {
          key: 11,
          name: '1-1',
          level: 2,
          children: [
            {
              key: 111,
              name: '1-1-1',
              level: 3
            }
          ]
        }
      ]
    },
    {
      key: 2,
      name: '2',
      level: 1,
      children: [
        {
          key: 21,
          name: '2-1',
          level: 2,
          children: [
            {
              key: 211,
              name: '2-1-1',
              level: 3
            }
          ]
        }
      ]
    }
  ]

  const showModal = () => {
    setWorkList({ type: 'add', list: {}, addNembers: true, });
  };
  const handleCancel = () => {
    setWorkList({ type: '', list: {}, addNembers: false, });
  }

  const handleActionClick = (record: any) => {
    if (record.parentKey) {
      // 点击的是第三层数据的操作按钮
      console.log('Clicked on level 3 action button:', record);
      setWorkList({ type: '', list: { record }, addNembers: true, });
    } else if (record.children) {
      // 点击的是第二层数据的操作按钮
      console.log('Clicked on level 2 action button:', record);
      setWorkList({ type: '', list: { record }, addNembers: true, });
    } else {
      // 点击的是第一层数据的操作按钮
      console.log('Clicked on level 1 action button:', record);
      setWorkList({ type: '', list: { record }, addNembers: true, });
    }
  }


  return (
    <>
      <div style={{ backgroundColor: '#fff', height: '100%' }}>
        <Button type="primary"
          style={{ margin: '20px 20px 20px 20px ' }}
          onClick={() => showModal()}
        >
          添加楼栋
        </Button>
        <Table
          columns={columns}
          // rowSelection={{
          //   ...rowSelection,
          //   checkStrictly,
          // }}
          dataSource={data}
          expandedRowRender={(record) => {
            if (record.level <= 2) {
              return record.children.map(child => (
                <Table
                  columns={columns}
                  dataSource={[child]}
                />
              ))
            }
          }}
        />

        {workList.addNembers && <RegionAdd
          type={workList.type}
          list={workList.list}
          visible
          onCancel={handleCancel}
        />}

      </div>

    </>
  )
}

export default Region;
