// import { useState } from 'react';
// import { Space, Tag } from 'antd';
// import type { ColumnsType } from 'antd/es/table';

// interface DataType {
//   key: string;
//   name: string;
//   age: number;
//   address: string;
//   tags: string[];
// }

// const columns: ColumnsType<DataType> = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//     render: (text) => <a>{text}</a>,
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//     key: 'age',
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//     key: 'address',
//   },
//   {
//     title: 'Tags',
//     key: 'tags',
//     dataIndex: 'tags',
//     render: (tags: string[]) => (
//       <span>
//         {tags.map((tag) => {
//           let color = tag.length > 5 ? 'geekblue' : 'green';
//           if (tag === 'loser') {
//             color = 'volcano';
//           }
//           return (
//             <Tag color={color} key={tag}>
//               {tag.toUpperCase()}
//             </Tag>
//           );
//         })}
//       </span>
//     ),
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     render: (_, record) => (
//       <Space size="middle">
//         <a>Invite {record.name}</a>
//         <a>Delete</a>
//       </Space>
//     ),
//   },
// ];

// const data: DataType[] = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];

// const Test = () => {
  
//     // const onChange = (pageNum: number, pageSize: number) => {
//     //     console.log(11, pageNum, pageSize)
//     // }
//     const [arr, setArr] = useState([
//       {
//         name: 'a',
//       },
//       {
//         name: 'b',
//       }
//     ])
//     const test = (e: MouseEvent, index: number) => {
//       console.log(e, index)
//       // @ts-ignore
//       arr[index].name = e.target.value
//       setArr([...arr])
//     }
//   return (
//     <div>
//       11
//       {JSON.stringify(arr)}
//       {
//         arr.map((item, index) => {
//           return <input key={index} value={item.name} onChange={(e: any) => test(e, index)}/>
//         })
//       }
//       {/* <Table 
//       columns={columns} 
//       pagination={{ total: 50, pageSize: 20, onChange: onChange }}
//        dataSource={data} /> */}
//     </div>
//   );
// };

// export default Test;

// export default function Test () {
//   return (
//     <div>test</div>
//   )
// }

import React, { useState, useEffect, useLayoutEffect } from 'react'

export default function UseLayoutEffect() {

  const [count,setCount] = useState(10)
  
  useEffect(()=>{
    // if(count ===1){
    //   setCount(Math.random())
    // }
  },[])
  return (
    <div>
      <h2>数字:{count}</h2>
      <button onClick={e=>setCount(1)}>修改数字</button>
    </div>
  )
}