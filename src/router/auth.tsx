import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectMenus } from '@/redux/loginReducer'

const whiteList = ['/login', '/403']

export default function Auth({ children }: { children: JSX.Element }) {
    const menus = useSelector(selectMenus);
    const location = useLocation()

    if (location.pathname === '/') {
        return <Navigate to='/index' replace />
    }
    if (whiteList.includes(location.pathname)) {
        return children
    }
    // @ts-ignore
    const exist = menus.find(item => item.path === location.pathname)
    const token = window.localStorage.getItem('token')
    if (token) {
        if (exist) {
            return children
        }
        return <Navigate to='/403' replace />
    } else {
        return (
            <Navigate to='/login' replace />
        )
    }
}