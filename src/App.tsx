import React from 'react';
import { compose } from "redux";
import { connect, Provider } from "react-redux";
import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, WechatOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import {
	BrowserRouter,
	Link,
	Redirect,
	Route,
	Switch,
	withRouter,
} from "react-router-dom";

import store, { RootState } from "./store/store";
import { initializedApp } from "./store/app/action-creators";

import Preloader from "./components/Preloader/Preloader";
import { withSuspense } from "./hoc/withSuspense";
import { Login } from './components/Login/Login';
import Header from "./components/Header/Header";
import Users from "./components/Users/Users";

const ProfileСontainer = React.lazy(() => import('./components/Profile/ProfileСontainer'));
const Chat = React.lazy(() => import('./components/Chat/Chat'));

const SuspendedProfile = withSuspense(ProfileСontainer);
const SuspendedChatPage = withSuspense(Chat);

type MapStateType = ReturnType<typeof mapStateToProps>
type DispatchType = {
	initializedApp: () => void,
}

class App extends React.Component<MapStateType & DispatchType> {

	componentDidMount() {
		this.props.initializedApp()
	}

	render() {

		const { SubMenu } = Menu;
		const { Content, Footer, Sider } = Layout;

		if (!this.props.initialized) {
			return <Preloader/>
		}

		return (
			<Layout>
				<Header/>
				<Content style={{padding: '0 50px'}}>
					<Layout className="site-layout-background" style={{padding: '24px 0'}}>
						<Sider className="site-layout-background" width={200}>
							<Menu
								mode="inline"
								style={{height: '100%'}}
							>
								<SubMenu key="sub1" icon={<UserOutlined/>} title="My profile">
									<Menu.Item key="1"><Link to={'/profile'}>Profile</Link></Menu.Item>
								</SubMenu>
								<SubMenu key="sub2" icon={<LaptopOutlined/>} title="Developers">
									<Menu.Item key="2"><Link to={'/developers'}>Users</Link></Menu.Item>
								</SubMenu>
								<SubMenu key="sub3" icon={<WechatOutlined/>} title="Chat">
									<Menu.Item key="3"><Link to={'/chat'}>Chat</Link></Menu.Item>
								</SubMenu>
							</Menu>
						</Sider>
						<Content style={{padding: '0 24px', minHeight: 280}}>
							<Switch>
								<Route exact path='/' render={() => <Redirect to='/profile'/>}/>
								<Route path='/profile/:userId?' render={() => <SuspendedProfile/>}/>
								<Route path='/chat' render={() => <SuspendedChatPage/>}/>
								<Route path='/developers'><Users/></Route>
								<Route path='/login'><Login/></Route>
							</Switch>
						</Content>
					</Layout>
				</Content>
				<Footer style={{textAlign: 'center'}}>Samurai Social Network ©2021 Created by IT-KAMASUTRA</Footer>
			</Layout>
		);
	}
}

const mapStateToProps = (state: RootState) => {
	return {
		initialized: state.app.initialized,
	}
};

const AppContainer = compose<React.ComponentType>(
	withRouter,
	connect(mapStateToProps, { initializedApp })
)(App);

const SamuraiJsApp: React.FC = () => {
	return <BrowserRouter>
		<Provider store={store}>
			<AppContainer/>
		</Provider>
	</BrowserRouter>
}

export default SamuraiJsApp
