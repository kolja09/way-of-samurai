import React, { FC } from "react";
import { InjectedFormProps, reduxForm } from "redux-form";

import { MaxLengthsCreator, required } from "../../util/validation/validation";

import { createField } from "../FormControl/FormControl";
import Textarea from "../Textarea/Textarea";
import { NewPostsFormType } from "../MyPosts/types";

import s from './AddPostForm.module.css';

const maxLengths = MaxLengthsCreator(50)

type NewPostsFormKeysType = Extract<keyof NewPostsFormType, string>

const AddPostForm: FC<InjectedFormProps<NewPostsFormType >> = (props) => {
	return (
		<form onSubmit={props.handleSubmit} className={s.pushPost}>
			{ createField<NewPostsFormKeysType>('Enter your post', 'newPostText', [required, maxLengths], Textarea) }
			<div>
				<button>Add post</button>
			</div>
		</form>
	)
}

const AddPostFormRedux = reduxForm<NewPostsFormType>({form: 'addPostForm'})(AddPostForm)

export default AddPostFormRedux