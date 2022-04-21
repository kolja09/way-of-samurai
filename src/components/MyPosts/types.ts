export interface NewPostsFormType {
	newPostText: string,
}

export interface IMyPosts {
	posts: Array<PostsType>,
	addPost: (postText: string) => void,
}

export interface MapPropsType {
	posts:Array<PostsType>
}