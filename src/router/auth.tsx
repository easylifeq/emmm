import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectMenus } from '@/redux/loginReducer';
import React from 'react';

const whiteList = ['/login', '/403'];

export default function Auth({ children }: { children: JSX.Element }) {
  const menus = useSelector(selectMenus);
  console.log('Menus:', menus); // 打印查看menus的值
  const location = useLocation();

  if (location.pathname === '/') {
    return <Navigate to="/index" replace />;
  }
  if (whiteList.includes(location.pathname)) {
    return children;
  }
  // @ts-ignore
  const exist = menus.find((item) => item.path === location.pathname);

  const menusArray = Array.isArray(menus) ? menus : [];
  // 然后使用 menusArray 而不是 menus
  /*   const exist = menusArray.find((item) => item.menu_urls === location.pathname); */

  const token = window.localStorage.getItem('token');
  if (token) {
    if (exist) {
      return children;
    }
    return <Navigate to="/403" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
}
