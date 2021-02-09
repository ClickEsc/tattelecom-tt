import React from 'react';

// import { PostContext } from '../contexts/PostContext.js';

function Post(props) {
  
  // const post = React.useContext(PostContext);

  return (
    <li className="post">
      <h2 className="post__title">{props.title}</h2>
      <p className="post__text">{props.body}</p>
    </li>
  );
}

export default Post;