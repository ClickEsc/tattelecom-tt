import React from 'react';
import { Route, Link } from 'react-router-dom';

import { PostContext } from '../contexts/PostContext';
import { user, UserContext } from '../contexts/UserContext';

import Post from './Post';
import Header from './Header';
import Main from './Main';
import User from './User';
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

  return (
    <div className="App">
      <div className="page">
        <div className="page__container">
          <Header />
          <Route exact path="/">
            <>
              <Link to="/users" className="link"><button type="submit" className="button button__goto">Список пользователей</button></Link>
            </>
            <Main cards={renderedPosts} onAddPost={handleAddPostClick}/>
          </Route>
          <Route path="/users">
            <>
            <Link to="/" className="link"><button type="submit" className="button button__goto">Список поcтов</button></Link>
            </>
            <Main cards={renderedUsers} />
          </Route>
          <Footer />
          <AddPostPopup isOpen={isAddPostPopupOpen} onAddPost={handleAddPostSubmit} onClose={closeAllPopups} name="add-post" title="Добавить пост" />
        </div>  
      </div>
    </div>
  );
}

export default App;