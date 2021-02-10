import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { PostContext } from '../contexts/PostContext';
import { user, UserContext } from '../contexts/UserContext';
import { album, AlbumContext } from '../contexts/AlbumContext';
import { PhotoContext } from '../contexts/PhotoContext';

import Post from './Post';
import Header from './Header';
import Main from './Main';
import User from './User';
import Album from "./Album";
import Gallery from "./Gallery";
import Photo from "./Photo";
import Footer from './Footer';
import AddPostPopup from './AddPostPopup';

import { api } from '../utils/api';
import './App.css';

function App() {
  
  // Посты

  const [posts, setPosts] = React.useState([]);

  function handlePosts(res) {
    setPosts(res);
  }
  
  React.useEffect(() => {
    api.getPosts()
      .then((res) => {
        const initialPosts = res.map((item) => {
          return item
        });
        handlePosts(initialPosts);
      })
      .catch(err => console.log(`Ошибка при запросе постов: ${err}`))
  }, []);

  const renderedPosts = posts.map((post) => {
    return <PostContext.Provider value={post} key={post.id}>
      <Post author={user.id} title={post.title} body={post.body} />
    </PostContext.Provider>
  })

  // Добавление нового поста
  function handleAddPostSubmit(post) {
    api.createPost(post)
      .then((newPost) => {
        setPosts([newPost, ...posts]);
        setAddPostPopupOpen(false);
      })
      .catch(err => console.log(`Ошибка при создании нового поста: ${err}`))
  }

  // Хук для попапа добавления карточки
  const [isAddPostPopupOpen, setAddPostPopupOpen] = React.useState(false);

  function handleAddPostClick() {
    setAddPostPopupOpen(true);
  }

  // Функция закрытия всех попапов
  function closeAllPopups() {
    setAddPostPopupOpen(false);
  }

  // Список пользователей

  const [users, setUsers] = React.useState([]);

  function handleUsers(res) {
    setUsers(res);
  }
    
  React.useEffect(() => {
    api.getUsers()
      .then((res) => {
        const initialUsers = res.map((item) => {
          return item
        });
          handleUsers(initialUsers);
        })
        .catch(err => console.log(`Ошибка при запросе списка пользователей: ${err}`))
    }, []);

    const renderedUsers = users.map((user) => {
      return <UserContext.Provider value={user} key={user.id}>
        <User username={user.username} name={user.name} city={user.address.city} company={user.company.name} website={user.website} phone={user.phone} email={user.email} />
      </UserContext.Provider>    
    })

  // Список альбомов

  const [albums, setAlbums] = React.useState([]);

  function handleAlbums(res) {
    setAlbums(res);
  }
    
  React.useEffect(() => {
    api.getAlbums()
      .then((res) => {
        const initialAlbums = res.map((item) => {
          return item
        });
          handleAlbums(initialAlbums);
        })
        .catch(err => console.log(`Ошибка при запросе списка альбомов: ${err}`))
    }, []);

    const renderedAlbums = albums.map((album) => {
      return <AlbumContext.Provider value={album} key={album.id}>
        <Album title={album.title} />   
      </AlbumContext.Provider>  
    })

  // Фотографии
  const [photos, setPhotos] = React.useState([]);

  function handlePhotos(res) {
    setPhotos(res);
  }
    
  React.useEffect(() => {
    api.getPhotos(1)
      .then((res) => {
        const initialPhotos = res.map((item) => {
          return item
        });
          handlePhotos(initialPhotos);
        })
        .catch(err => console.log(`Ошибка при запросе фотографий: ${err}`))
    }, []);

    const renderedPhotos = photos.map((photo) => {
      return <PhotoContext.Provider value={photo} key={photo.id}>
        <Photo title={photo.title} url={photo.url} albumId={album.id}/>   
      </PhotoContext.Provider>  
   })

  return (
    <div className="App">
      <div className="page">
        <div className="page__container">
          <Header />
          <Switch>
            <Route exact path="/">
              <>
                <div className="nav">
                  <Link to="/users" className="link"><button type="submit" className="button button__goto">Список пользователей</button></Link>
                  <Link to="/albums" className="link"><button type="submit" className="button button__goto_albums">Альбомы</button></Link>
                  <Link to="/photos" className="link"><button type="submit" className="button button__goto_photos">Фото</button></Link>
                </div>
              </>
              <Main cards={renderedPosts} onAddPost={handleAddPostClick}/>
            </Route>
            <Route path="/users">
              <>
              <Link to="/" className="link"><button type="submit" className="button button__goto">Список поcтов</button></Link>
              </>
              <Main cards={renderedUsers} />
            </Route>
            <Route path="/albums">
              <>
              <Link to="/" className="link"><button type="submit" className="button button__goto">Список поcтов</button></Link>
              </>
              <Main cards={renderedAlbums} />
            </Route>
            <Route path="/photos" > 
              <Gallery cards={renderedPhotos} />
            </Route>
          </Switch>
          <Footer />
          <AddPostPopup isOpen={isAddPostPopupOpen} onAddPost={handleAddPostSubmit} onClose={closeAllPopups} name="add-post" title="Добавить пост" />
        </div>  
      </div>
    </div>
  );
}

export default App;