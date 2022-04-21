import React, { FC } from 'react';

import ProfileInfo from "../ProfileInfo/ProfileInfo";
import MyPostsContainer from "../MyPosts/MyPostContainer";

import { IProfile } from "./types";

const Profile: FC<IProfile> = (
	{
		profile,
		status, updateStatus,
		isOwner,
		savePhoto,
		saveProfile
	}) => {
	return (
		<div>
			<ProfileInfo
				saveProfile={saveProfile}
				savePhoto={savePhoto}
				isOwner={isOwner}
				updateStatus={updateStatus}
				status={status}
				profile={profile}
			/>
			<MyPostsContainer/>
		</div>
	)
}

export default Profile;
