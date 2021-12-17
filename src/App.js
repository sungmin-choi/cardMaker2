import React, { useEffect, useState } from 'react';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import EditPage from './routes/EditPage/EditPage';
import FirebaseService from './fbase';
import LoginPage from './routes/LoginPage/LoginPage';
import styles from './App.module.css';

const firebase = new FirebaseService();

function App() {
  const [init,setInit]=useState(false);
  const [isLoggin,setIsLoggin]=useState(false);
  const [userObj,setUserObj] = useState(null);

  useEffect(()=>{
    firebase.stateChanged(setUserObj,setIsLoggin);
    setInit(true);
  },[]);

  return (
    <div className={styles.App}>
      {init ?(
      <section className={styles.loginForm}>
      <Header isLoggin={isLoggin}/>
      {isLoggin ? <EditPage userObj={userObj} firebase={firebase}/> : <LoginPage/>}
      <Footer/>
      </section>):
      <h1>Initialize...</h1>}
    </div>
  );
}

export default App;
