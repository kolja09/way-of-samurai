import React, { ChangeEvent, FC, useState } from 'react';

import photo from '../../assets/img/149071.png'
import Preloader from "../Preloader/Preloader";
import ProfileStatus from "../ProfileStatus/ProfileStatus";
import ProfileDataForm from "../ProfileDataForm/ProfileDataForm";
import ProfileData from "../ProfileData/ProfileData";

import { IProfileInfo } from "./types";
import s from './ProfileInfo.module.css';

const ProfileInfo: FC<IProfileInfo> = (
	{
		profile,
		status,
		updateStatus,
		isOwner,
		savePhoto,
		saveProfile
	}) => {

	const [editMode, setEditMode] = useState(false);

	if (!profile) {
		return <Preloader/>
	}

	const photoSelected = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length) {
			savePhoto(e.target.files[0])
		}
	};

	const onSubmit = (formData: ProfileType) => {
		saveProfile(formData).then(() => {
			setEditMode(false)
		})
	};

	return (
		<div className={s.profileContainer}>
			<div>
				<img className={s.mainPhoto} src={profile.photos.small || photo} alt={`${profile.photos.small}`}/>
				{ isOwner && <input onChange={photoSelected} type={'file'}/> }
			</div>
			{
				editMode ?
					<ProfileDataForm
						initialValues={profile}
						onSubmit={onSubmit}
						profile={profile}
					/>
					:
					<ProfileData
						getEditMode={() => {setEditMode(true)}}
						isOwner={isOwner}
						profile={profile}
					/>
			}
			<ProfileStatus
				updateStatus={updateStatus}
				status={status}
			/>
		</div>
	)
}

export default ProfileInfo;