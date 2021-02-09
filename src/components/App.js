import React from 'react';

import { PostContext } from '../contexts/PostContext';

import Post from './Post';
import Header from './Header';
import Main from './Main';
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
    return <PostContext.Provider>
      <Post title={post.title} body={post.body} />
    </PostContext.Provider>
  })

  return (
    <div className="App">
      <div className="page">
        <div className="page__container">
          <Header />
          <Main posts={renderedPosts}/>
          <Footer />
        </div>  
      </div>
    </div>
  );
}

export default App;