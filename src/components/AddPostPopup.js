import React from 'react';
import './AddPostPopup.css';

import { PostContext } from '../contexts/PostContext.js';

function AddPostPopup(props) {

  const post = React.useContext(PostContext);

  const [postTitle, setPostTitle] = React.useState('');
  const [postBody, setPostBody] = React.useState('');

  function handlePostTitleChange(e) {
    setPostTitle(e.target.value);
  }

  function handlePostBodyChange(e) {
    setPostBody(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPost({
      title: postTitle,
      body: postBody
    });
  }
  
  React.useEffect(() => {
    setPostTitle(postTitle);
    setPostBody(postBody);
  }, [post]);

  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <form noValidate onSubmit={handleSubmit} className={`popup__form popup__form_${props.name}`} name={`${props.name}-form`}>
        <button className="popup__close" onClick={props.onClose} type="button" aria-label="Закрыть попап"></button>
        <h2 className="popup__title">{`${props.title}`}</h2>
        <div className="popup__wrap">
          <input required id="post-title-input" value={postTitle} onChange={handlePostTitleChange} className="popup__input popup__place-name" name="title" placeholder="Название" minLength="1" maxLength="30" />
          <span id="post-title-error" className="popup__error-text popup__error-text_title"></span>
        </div>
        <div className="popup__wrap">
          <textarea required id="post-textarea" value={postBody} onChange={handlePostBodyChange} className="popup__input popup__input_textarea" name="body" placeholder="Текст поста" minLength="1" maxLength="140"></textarea>
          <span id="post-textarea-error" className="popup__error-text popup__error-text_textarea"></span>
        </div>
        <button className="popup__save" type="submit" aria-label="Сохранить изменения">Добавить</button>
      </form>
    </div>
  );
}

export default AddPostPopup;