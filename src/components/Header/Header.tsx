import React, { FC } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import {
	Avatar,
	Button,
	Col,
	Layout,
	Menu,
	Row
} from "antd";

import { RootState } from "../../store/store";
import { logout } from "../../store/auth/action-creators";

const Header: FC = () => {
	const dispatch = useDispatch();

	const isAuth = useSelector((state: RootState) => state.auth.isAuth);
	const login = useSelector((state: RootState) => state.auth.login);

	const { Header } = Layout;

	const logoutCallback = () => {
		dispatch(logout())
	};

	return <Header className="header">
		<Row>
			<Col span={18}>
				<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
					<Menu.Item key="1"><Link to={'/developers'}>Developers</Link></Menu.Item>
				</Menu>
			</Col>
			{
				isAuth
					? <>
						<Col span={1}>
							<Avatar alt={login || ''} style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
						</Col>
						<Col span={5}>
							<Button onClick={logoutCallback}>Logout</Button>
						</Col>
					</>
					:
					<Col span={6}><Button><Link to='/login'>Login</Link></Button></Col>
			}
		</Row>
	</Header>
}

export default Header