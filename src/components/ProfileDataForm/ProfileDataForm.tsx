import React, { FC } from "react";
import { InjectedFormProps, reduxForm } from "redux-form";

import { createField } from "../FormControl/FormControl";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";

import s from './ProfileDataForm.module.css'
import { IProfileDataForm, ProfileTypeKey } from "./types";


const ProfileDataForm: FC<InjectedFormProps<ProfileType, IProfileDataForm> & IProfileDataForm> = (
	{ handleSubmit, profile, error}) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<button>Save</button>
			</div>
			{error && <div className={s.formControlSummary}>
				{error}
			</div>}
			<div>
				<b>Full name</b>:
				{ createField<ProfileTypeKey>('Full name', 'fullName', [], Input) }
			</div>
			<div>
				<b>Looking for a lob</b>:
				{ createField<ProfileTypeKey>('', 'lookingForAJob', [], Input, {type: 'checkbox'}) }
			</div>
			<div>
				<b>My professional skills</b>:
				{ createField<ProfileTypeKey>('My professional skills', 'lookingForAJobDescription', [], Textarea) }
			</div>
			<div>
				<b>About me</b>:
				{ createField<ProfileTypeKey>('About me', 'aboutMe', [], Textarea) }
			</div>
			<div>
				<b>Contacts</b>:
				{
					Object.keys(profile.contacts).map(key => {
						return (
							<div key={key} className={s.contact}>
								<b>{key}: { createField(key, 'contacts.' + key, [], Textarea) }</b>
							</div>
					  )
			    })
				}
			</div>
		</form>
	)
}

const ProfileDataFormRedux = reduxForm<ProfileType, IProfileDataForm>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormRedux
