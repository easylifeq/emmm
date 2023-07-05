import React from 'react';
import { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router';

import Login from '../views/login/index';
import Layout from '../views/layout/index';
import Error from '../views/403/index';
import Authority from '../views/authority/number';
import Role from '../views/authority/role';
import Information from '../views/authority/information';
import Introduction from '../views/management/introduction';
import Office from '../views/management/office';
import Ward from '../views/management/ward';
import Roomer from '../views/management/roomer';
import Bed from '../views/management/bed';
import Station from '../views/management/station';
import Region from '../views/management/region';
import BedTable from '../views/bedinfomation/bedtable';
import Roomtable from '../views/bedinfomation/roomtable';
import Equipment from '../views/maindevice/equipment';
import Device from '../views/maindevice/device';
import Devicetype from '../views/maindevice/devicetype';
import Camera from '../views/maindevice/camera';
import Call from '../views/group/call';
import CallList from '../views/statistical/calllist';
import Excel from '../views/excel';

// let Auth = lazy(() => import('./auth'))
let Index = lazy(() => import('../views/index/index'));
let Test = lazy(() => import('../views/test/index'));
let Tt = lazy(() => import('../views/tt/index'));

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      // element: <Auth><Layout></Layout></Auth>,
      element: <Layout></Layout>,
      children: [
        {
          path: 'index',
          element: (
            <Suspense fallback={<div>loading...</div>}>
              <Index />
            </Suspense>
          ),
        },
        {
          path: 'test',
          element: (
            <Suspense fallback={<div>loading...</div>}>
              <Test />
            </Suspense>
          ),
        },
        {
          path: 'tt',
          element: (
            <Suspense fallback={<div>loading...</div>}>
              <Tt />
            </Suspense>
          ),
        },
        {
          path: 'authority',
          element: (
            <Suspense fallback={<div>loading...</div>}>
              <Authority />
            </Suspense>
          ),
        },
        {
          // 角色管理
          path: 'role',
          element: (
            <Suspense fallback={<div>loading...</div>}>
              <Role />
            </Suspense>
          ),
        },
        //职工信息管理
        {
          path: 'information',
          element: (
            <Suspense fallback={<div>loading...</div>}>
              <Information />
            </Suspense>
          ),
        },

        {
          // '医院简介',
          path: 'introduction',
          element: (
            <Suspense fallback={<div>loading...</div>}>
              <Introduction />
            </Suspense>
          ),
        },

        {
          // 科室管理
          path: 'office',
          element: (
            <Suspense fallback={<div>loading...</div>}>
              <Office />
            </Suspense>
          ),
        },
        {
          //病区管理
          path: 'ward',
          element: (
            <Suspense fallback={<div>loading...</div>}>
              <Ward />
            </Suspense>
          ),
        },
        {
          // 病房管理
          path: 'roomer',
          element: (
            <Suspense fallback={<div>loading...</div>}>
              <Roomer />
            </Suspense>
          ),
        },
        {
          //床位管理
          path: 'bed',
          element: (
            <Suspense fallback={<div>loading...</div>}>
              <Bed />
            </Suspense>
          ),
        },
        {
          //护士站管理
          path: 'station',
          element: (
            <Suspense fallback={<div>loading...</div>}>
              <Station />
            </Suspense>
          ),
        },
        {
          //区域管理
          path: 'region',
          element: (
            <Suspense fallback={<div>loading...</div>}>
              <Region />
            </Suspense>
          ),
        },

        /*    {
          // 床位一栏表
          path: 'bedtable',
          element: (
            <Suspense fallback={<div>loading...</div>}>
              <BedTable />
            </Suspense>
          ),
        },
        {
          // 病房状态表
          path: 'roomtable',
          element: (
            <Suspense fallback={<div>loading...</div>}>
              <Roomtable />
            </Suspense>
          ),
        }, */
        /*  {
          // 设备管理
          path: 'equipment',
          element: (
            <Suspense fallback={<div>loading...</div>}>
              <Equipment />
            </Suspense>
          ),
        }, */
        {
          // 设备设置
          path: 'device',
          element: (
            <Suspense fallback={<div>loading...</div>}>
              <Device />
            </Suspense>
          ),
        },
        {
          // 设备类型管理
          path: 'devicetype',
          element: (
            <Suspense fallback={<div>loading...</div>}>
              <Devicetype />
            </Suspense>
          ),
        },
        {
          // 摄像头管理
          path: 'camera',
          element: (
            <Suspense fallback={<div>loading...</div>}>
              <Camera />
            </Suspense>
          ),
        },
        {
          // 主呼叫组
          path: '/call',
          element: (
            <Suspense fallback={<div>loading...</div>}>
              <Call />
            </Suspense>
          ),
        },
        {
          // 摄像头管理
          path: '/callList',
          element: (
            <Suspense fallback={<div>loading...</div>}>
              <CallList />
            </Suspense>
          ),
        },
        {
          // 摄像头管理
          path: '/excel',
          element: (
            <Suspense fallback={<div>loading...</div>}>
              <Excel />
            </Suspense>
          ),
        },

        {
          path: '403',
          element: <Error />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);
}
