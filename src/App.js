import React, { useEffect, useState } from 'react';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import EditPage from './routes/EditPage/EditPage';
import {authUser} from './fbase';
import {onAuthStateChanged } from "firebase/auth";
import LoginPage from './routes/LoginPage/LoginPage';
import styles from './App.module.css';
function App() {
  const [init,setInit]=useState(false);
  const [isLoggin,setIsLoggin]=useState(false);

  useEffect(()=>{
    onAuthStateChanged(authUser, (user) => {
      if (user) {
        console.log(user);
        setIsLoggin(true);
      } else {
        setIsLoggin(false);
      }
    });
    setInit(true);
  },[]);

  return (
    <div className={styles.App}>
      {init ?(
      <section className={styles.loginForm}>
      <Header isLoggin={isLoggin}/>
      {isLoggin ? <EditPage/> : <LoginPage/>}
      <Footer/>
      </section>):
      <h1>Initialize...</h1>}
    </div>
  );
}

export default App;
