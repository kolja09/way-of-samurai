import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { RootState } from "../store/store";

const mapStateToPropsForRedirect = (state: RootState) => {
	return {
		isAuth: state.auth.isAuth,
	}
}

type MapPropsType = {
	isAuth: boolean
}

type MapDispatchType = {}

export function withAuthRedirect<WCP>(Component: React.ComponentType<WCP>) {
	const RedirectComponent: React.FC<MapPropsType & MapDispatchType> = (props) => {
		let { isAuth, ...restProps } = props
		if (!isAuth) return <Redirect to='/login'/>
		return <Component {...restProps as WCP} />
	}
	return connect(mapStateToPropsForRedirect, null)(RedirectComponent)
}