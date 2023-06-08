import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom'
import './index.less'
import { login, getMenus } from '@/api/login'
import { useDispatch } from 'react-redux';
import { setMenus } from '@/redux/loginReducer'


export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onFinish = (value: any) => {
        login().then((data: any) => {
            window.localStorage.setItem('token', data.token)
            getMenus().then(data => {
                dispatch(setMenus(data))
                navigate('/index')
            })
        })
    }
    const onFinishFailed = (err: any) => {
        console.log(22, err)
    }
    return (
        <div className='login-page'>
            <Form
                className='form-box'
                name="basic"
                initialValues={{ username: 'admin', password: '123456' }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="账号"
                    name="username"
                    rules={[{ required: true, message: '请输入账号' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item label="" colon={false}>
                    <Button type="primary" htmlType="submit" block>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}