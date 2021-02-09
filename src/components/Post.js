import React from 'react';
import { PostContext } from '../contexts/PostContext.js';

function Post(props) {
  const post = React.useContext(PostContext);

  return (
    <li className="post">
      <h2 className="post__title">{post.title}</h2>
      <p className="post__text">{post.body}</p>
    </li>
  );
}

export default Post;