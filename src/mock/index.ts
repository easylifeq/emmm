import Mock from 'mockjs'

Mock.mock('/login', 'post', {
  data: {
    token: '@string(10)',
  },
})

Mock.mock('/auth', 'get', () => {
  return {
    code: 401,
    msg: '登录失效',
  }
})

Mock.mock('/menus', 'get', {
  data: [
    {
      id: 1,
      name: '首页',
      path: '/index',
      parentId: 0,
    },
    /*   {
      id: 2,
      name: '测试2',
      path: '/test2',
      parentId: 0,
    },
    {
      id: 3,
      name: '一级菜单',
      path: '/level1',
      parentId: 0,
    },
    {
      id: 4,
      name: '二级菜单',
      path: '/test',
      parentId: 3,
    }, */
    {
      id: 5,
      name: '权限管理',
      path: '/level2',
      parentId: 0,
    },
    {
      id: 6,
      name: '账户管理',
      path: '/authority',
      parentId: 5,
    },
    {
      id: 7,
      name: '角色管理',
      path: '/role',
      parentId: 5,
    },
    {
      id: 8,
      name: '职工信息管理',
      path: '/information',
      parentId: 5,
    },
    /*  {
      id: 9,
      name: '医院简介',
      path: '/level3',
      parentId: 0,
    },
     {
      id: 10,
      name: '医院简介',
      path: '/introduction',
      parentId: 9,
    },
    {
      id: 11,
      name: '科室管理',
      path: '/office',
      parentId: 9,
    },
    {
      id: 12,
      name: '病区管理',
      path: '/ward',
      parentId: 9,
    },
    {
      id: 13,
      name: '床位管理',
      path: '/bed',
      parentId: 9,
    },
    {
      id: 14,
      name: '护士站管理',
      path: '/station',
      parentId: 9,
    },
    {
      id: 15,
      name: '区域管理',
      path: '/region',
      parentId: 9,
    }, */
    {
      id: 16,
      name: '床位信息展示',
      path: '/level4',
      parentId: 0,
    },
    {
      id: 17,
      name: '床位一栏表',
      path: '/bedtable',
      parentId: 16,
    },
    {
      id: 18,
      name: '病房状态表',
      path: '/roomtable',
      parentId: 16,
    },
    {
      id: 19,
      name: '主设备管理',
      path: '/level5',
      parentId: 0,
    },
    {
      id: 20,
      name: '设备管理',
      path: '/equipment',
      parentId: 19,
    },
    {
      id: 21,
      name: '设备设置',
      path: '/device',
      parentId: 19,
    },
    {
      id: 22,
      name: '设备类型管理',
      path: '/devicetype',
      parentId: 19,
    },
    {
      id: 24,
      name: '群组管理',
      path: '/level6',
      parentId: 0,
    },
    {
      id: 25,
      name: '主呼叫组',
      path: '/call',
      parentId: 24,
    },
    {
      id: 26,
      name: '统计数据',
      path: '/level7',
      parentId: 0,
    },
    {
      id: 27,
      name: '通话记录',
      path: '/callList',
      parentId: 26,
    },
    {
      id: 28,
      name: 'excel导入',
      path: '/excel',
      parentId: 0,
    },
    /*   {
      id: 23,
      name: '摄像头管理',
      path: '/camera',
      parentId: 19,
    }, */
  ],
})
