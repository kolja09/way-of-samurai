import React, { FC } from 'react';

import s from './Post.module.css';
import { IPost } from "./types";

const Post:FC<IPost> = ({ message,likesCount }) => {

  return (
    <div className={s.item}>
        {message }
      <div>
        <span>like</span> {likesCount}
      </div>
    </div>
  )
}

export default Post;