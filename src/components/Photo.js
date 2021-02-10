import React from 'react';
import { PhotoContext } from '../contexts/PhotoContext';
import './Photo.css';

function Photo(props) {
  const photo = React.useContext(PhotoContext);

  return (
    <li className="photo">
      <h2 className="photo__title">{photo.title}</h2>
      <img className="photo__image" src={photo.url} alt="#"/>
    </li>
  );
}

export default Photo;