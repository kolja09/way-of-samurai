import React, { ChangeEvent, Component } from 'react';

import { IProfileStatus, IState } from "./types";

class ProfileStatus extends Component<IProfileStatus, IState> {

	state = {
		editMode: false,
		status: this.props.status,
	}

	activated = () => {
		this.setState({
			editMode: true
		})
	}

	deactivated = () => {
		this.setState({
			editMode: false
		})
		this.props.updateStatus(this.state.status)
	}

	statusChange = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({
			status: e.currentTarget.value
		})
	}

	componentDidUpdate(prevProps: IProfileStatus, prevState: IState) {
		if (prevProps.status !== this.props.status) {
			this.setState({
				status: this.props.status
			})
		}
	}

	render() {
		return (
			<div>
				{
					!this.state.editMode ?
					<div>
						<b>Status</b>: <span onDoubleClick={this.activated}>{this.props.status || '====='}</span>
					</div>
					:
					<div>
						<input
							onChange={this.statusChange}
							onBlur={this.deactivated}
							autoFocus={true}
							value={this.state.status}
						/>
					</div>
				}
			</div>
		);
	}
}

export default ProfileStatus;
