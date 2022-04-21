import React from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
	getStatus,
	getUserProfile,
	savePhoto,
	updateStatus,
	saveProfile
} from "../../store/profile/action-creators";
import { RootState } from "../../store/store";

import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import Profile from "./Profile";

import { IProfileContainer } from "./types";

class ProfileСontainer extends React.Component<IProfileContainer> {

	refreshProfile() {
		let userId: number | null = +this.props.match.params.userId
		if (!userId) {
			userId = this.props.authorizedUserId
			if (!userId) {
				// todo: may by replace push with Redirect??
				this.props.history.push('/login')
			}
		}
		if (!userId) {
			console.error('ID should exists in URI params or in state (authorizedUserId)')
		} else {
			this.props.getUserProfile(userId)
			this.props.getStatus(userId)
		}
	}

	componentDidMount() {
		this.refreshProfile()
	}

	componentDidUpdate(prevProps: IProfileContainer, prevState: IProfileContainer) {
		if (this.props.match.params.userId != prevProps.match.params.userId) {
			this.refreshProfile()
		}
	}

	render() {
		return (
			<Profile
				{...this.props}
				isOwner={!this.props.match.params.userId}
				updateStatus={this.props.updateStatus}
				status={this.props.status}
				profile={this.props.profile}
				savePhoto={this.props.savePhoto}
			/>
		);
	}
}

export const mapStateToProps = (state: RootState) => {
	return {
		profile: state.profilePage.profile,
		status: state.profilePage.status,
		authorizedUserId: state.auth.userId,
		isAuth: state.auth.isAuth,
	}
}

export default compose<React.ComponentType>(
	connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
	withRouter,
	withAuthRedirect,
)(ProfileСontainer)
