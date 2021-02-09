import React from 'react';
import { Route } from 'react-router-dom';

import { PostContext } from '../contexts/PostContext';
import { UserContext } from '../contexts/UserContext';

import Post from './Post';
import Header from './Header';
import Main from './Main';
import User from './User';
// import UserList from './UserList';
import Footer from './Footer';

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
      <Post title={post.title} body={post.body} />
    </PostContext.Provider>
  })

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
            <Main cards={renderedPosts}/>
          </Route>
          <Route path="/users">
            <Main cards={renderedUsers}/>
          </Route>
          <Footer />
        </div>  
      </div>
    </div>
  );
}

export default App;