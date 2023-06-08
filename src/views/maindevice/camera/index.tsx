import React from 'react';
import { Table, Tag, Space, Button, Input, Select } from 'antd';
import styles from './index.less';

import { getArticleList } from '@/api/article';

type TheTableType = {
  dataList: any;
  filter: any;
};

function Camera(){
  return(
    <>
    <div>摄像头管理</div>
    </>
  )
 }

export default Camera;
