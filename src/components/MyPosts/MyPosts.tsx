import React, { FC } from 'react';

import Post from '../Post/Post';
import AddPostFormRedux from "../AddPostForm/AddPostForm";

import s from './MyPosts.module.css';
import { IMyPosts, NewPostsFormType } from './types';

const MyPosts: FC<IMyPosts> = ({ posts, addPost }) => {

	const newAddPost = (values: NewPostsFormType) => {
		addPost(values.newPostText)
	};

	return (
		<div className={s.myPosts}>
			<h3>My posts</h3>
			<AddPostFormRedux onSubmit={newAddPost}/>
			<div className={s.posts}>
				{posts.map(p => (
					<Post
						message={p.message}
						likesCount={p.likesCount}
						key={p.id}
					/>))}
			</div>
		</div>
	)
}

export default MyPosts;
