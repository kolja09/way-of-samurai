import React, { FC } from "react";

import Contact from "../Contact/Contact";

import { ProfileDataPropsType } from "./types";
import s from './ProfileData.module.css'

const ProfileData:FC<ProfileDataPropsType> = ({ profile, isOwner, getEditMode }) => {
	return (
		<div className={s.profileContainer}>
			{isOwner && <div>
				<button onClick={getEditMode}>Edit</button>
			</div>}
			<div className={s.profileBlock}>
				<h3>Full name :</h3> <p>{profile.fullName}</p>
			</div>
			<div>
				<b>Looking for a lob</b>: {profile.lookingForAJob ? 'yes' : 'no'}
			</div>
			{profile.lookingForAJob &&
				<div>
					<b>My professional skills</b>: {profile.lookingForAJobDescription}
				</div>
			}
			<div>
				<b>About me</b>: {profile.aboutMe}
			</div>
			<div>
				<b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
				return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
			})}
			</div>
		</div>
	)
}

export default ProfileData
