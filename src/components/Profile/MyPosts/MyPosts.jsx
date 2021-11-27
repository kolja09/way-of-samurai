import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {MaxLengthsCreator, required} from "../../../util/validation/validation";
import {createField, Textarea} from "../../common/FormControl/FormControl";


const MyPosts = ({posts, addPost}) => {

    const newAddPost = (values) => {
        addPost(values.newPostText)
    }


    return (
        <div className={s.myPosts}>
            <h3>My posts</h3>
            <AddPostFormRedux onSubmit={newAddPost}/>
            <div className={s.posts}>
                {posts.map(p => (
                    <Post message={p.message}
                          likesCount={p.likesCount}
                          id={p.id}
                          key={p.id}/>))}
            </div>
        </div>
    )
}

let maxLengths = MaxLengthsCreator(50)

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.pushPost}>
            {createField('Enter your post', 'newPostText', [required, maxLengths], Textarea)}
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddPostFormRedux = reduxForm({form: 'addPostForm'})(AddPostForm)

export default MyPosts;
