import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {initializedApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileСontainer = React.lazy(() => import('./components/Profile/ProfileСontainer'));


class App extends React.Component{

    componentDidMount() {
        this.props.initializedApp()
    }

    render() {

        if(!this.props.initialized){
            return  <Preloader />
        }
        return (
            <BrowserRouter>
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <NavbarContainer />
                    <div className='app-wrapper-content'>
                        <Route path='/dialogs' render={withSuspense(DialogsContainer)} />
                        <Route path='/profile/:userId?' render={withSuspense(ProfileСontainer)} />
                        <Route path='/users'>
                            <UsersContainer />
                        </Route>
                        <Route path='/login'>
                            <Login />
                        </Route>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        initialized:state.app.initialized
    }
}

export default connect(mapStateToProps, {initializedApp})(App);