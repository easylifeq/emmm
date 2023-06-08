import { auth } from '@/api/login'
import { useNavigate } from 'react-router-dom'
import { exportExcel, importExcelToJSON } from '@/utils/index'
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';

export default function Index () {
  const navigate = useNavigate()

  const handle401 = () => {
    auth()
  }
  const logout = () => {
    window.localStorage.clear()
    navigate('/login')
  }
  const list = [
    {
      name: 'a'
    },
    {
      name: 'b'
    },
  ]
  const exportFile = () => {
    const sheet1 = list.map(item => {
      return [item.name]
    })
    exportExcel('test.xls', [
      {
        data: [
          ['名字'],
          ...sheet1
        ]
      }
    ])
  }

  
  const keyMap = {
    '名字': 'name',
  }
  const [importJson, setImportJson] = useState([])
  const props: UploadProps = {
    showUploadList: false,
    customRequest (option) {
      importExcelToJSON(option.file).then(data => {
        const keys = Object.keys(keyMap)
        // @ts-ignore
        const json = data[0]
        // @ts-ignore
        const result = json.map(item => {
          const temp = {}
          keys.forEach(key => {
            // @ts-ignore
            temp[keyMap[key]] = item[key] || ''
          })
          return temp
        })
        setImportJson(result)
      })
    }
  }

  return (
    <div>
      <Button type="primary" onClick={handle401}>
        401
      </Button>
      <Button type="primary" onClick={logout}>
        logout
      </Button>
      <div>导出JSON：{JSON.stringify(list)}</div>
      <Button type="primary" onClick={exportFile}>
        export
      </Button>
      
      <div>导入JSON：{JSON.stringify(importJson)}</div>
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>

    </div>
  )
}