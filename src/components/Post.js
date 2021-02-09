import React from 'react';
import { PostContext } from '../contexts/PostContext.js';
import { api } from '../utils/api';

import './Post.css';

function Post(props) {
  const post = React.useContext(PostContext);

  const [author, setAuthor] = React.useState('');

  function handleAuthor(res) {
    setAuthor(res);
  }
    
  React.useEffect(() => {
    api.getUserById(post.userId)
      .then((res) => {
        const author = res.username;
        handleAuthor(author);
      })
      .catch(err => console.log(`Ошибка при запросе информации о пользователе: ${err}`));
  }, );

  return (
    <li className="post">
      <h2 className="post__title">{post.title}</h2>
      <p className="post__text">{post.body}</p>
      <p className="post__author">Автор поста: {author}</p>
    </li>
  );
}

export default Post;