import React from 'react';
import { Link } from 'react-router-dom';
import { AlbumContext } from '../contexts/AlbumContext.js';
import { api } from '../utils/api';
import './Album.css';

function Album(props) {
  const album = React.useContext(AlbumContext);
  const [author, setAuthor] = React.useState('');
  const [photos, setPhotos] = React.useState([]);

  function handleAuthor(res) {
    setAuthor(res);
  }

  function handlePhotos(res) {
    setPhotos(res);
  }

  React.useEffect(() => {
    api.getUserById(album.userId)
      .then((res) => {
        const author = res.username;
        handleAuthor(author);
      })
      .catch(err => console.log(`Ошибка при запросе информации о пользователе: ${err}`));
  }, );
  
  React.useEffect(() => {
    api.getPhotos(album.id)
      .then((res) => {
         handlePhotos(res);
      })
      .catch(err => console.log(`Ошибка при запросе фотографий из альбома: ${err}`));
  }, []);

  return (
    <li className="album">
      <Link to="/photos"><h2 className="album__title" >{album.title}</h2></Link>
      <p className="album__author">Автор альбома: {author}</p>
    </li>
  );
}

export default Album;