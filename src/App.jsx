import { Outlet } from 'react-router';
import { createContext, useState, useEffect, } from 'react';

import Footer from './components/footer'
import Navbar from './components/navbar';
import './App.css';

export const SessionContext = createContext(null);
export const SelfPostsContext = createContext([]);
export const ServerStatusContext = createContext(null);


//get self posts
const useFetchSlefPosts = async (url, token, setServerStatus) => {
  try {
    const data = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${token}`
      })
    })
    .then(async (res) => {
      if(!res.ok) {
          const error = new Error(res.error);
          console.error(error);
      }
      else return await res.json()

    })
    .then(val => {
      if(val) return val.data;
    });
    return data;

  }catch (err) {
    setServerStatus(false);
  }
    
}

function App() {

  const token = localStorage.getItem("Token");
  const user = localStorage.getItem("username");

  let userName = null;
  if(token && user) userName = user;

  const [ username, setUsername ] = useState(userName);
  const [ posts, setPosts ] = useState([]);
  const [ serverStatus, setServerStatus ] = useState(true); //inform server is down

  //fetch author's only posts if any
  useEffect(() => {
      let ignore = true;
      const token = localStorage.getItem("Token");

      async function loadData() {
      const url = 'https://blog-api-fi4r.onrender.com/posts';
      const posts = await useFetchSlefPosts(url, token, setServerStatus);

      return posts;
      };

      if(username && typeof username === 'string' && token && typeof token === 'string') ignore = false;

      if(!ignore) {
      async function getPosts() {
          const posts = await loadData();
          if(posts.length === 0) return setPosts(false);
          setPosts(posts);
      }
      getPosts();
      }

      return () => ignore = true;

  }, [username]);

  return (
    <div className="app-wrapper">
      <SessionContext value={{username, setUsername}}>
          <main>
            <ServerStatusContext value={serverStatus}>
              <Navbar />
              <SelfPostsContext value={{setPosts, posts}}>
                  <Outlet />
              </SelfPostsContext>
            </ServerStatusContext>
          </main>
      </SessionContext>
      <Footer />
    </div>
  )
}

export default App