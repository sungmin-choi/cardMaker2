
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";
import {onAuthStateChanged } from "firebase/auth";
import {ref, child, get } from "firebase/database";

export default class FirebaseService{
  constructor(){
    this.firebaseConfig = {
      apiKey: "AIzaSyDw7tricSnJQqCvC2-mgjJ8tpGUhCTOSU4",
      authDomain: "cardmaker2-c1863.firebaseapp.com",
      databaseURL: "https://cardmaker2-c1863-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "cardmaker2-c1863",
      storageBucket: "cardmaker2-c1863.appspot.com",
      messagingSenderId: "340955878649",
      appId: "1:340955878649:web:2f2cf7109cde333d833e28"
    };
    this.app=initializeApp(firebaseConfig);
    this.authUser = getAuth();
    this.cardDb = getDatabase(app); 
  }

  stateChanged(setUserObj,setIsLoggin){
    onAuthStateChanged(this.authUser, (user) => {
      if (user) {
        const userObj={
          userId:user.uid,
          createAt:user.metadata.createdAt,
        }
        setUserObj(userObj);
        setIsLoggin(true);
      } else {
        setIsLoggin(false);
      }
    });
  }

  getCardsInfo=async(userObj,setCardsObj)=>{
    const dbRef = ref(this.cardDb);
    await get(child(dbRef, `cards/${userObj.userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setCardsObj(Object.entries(snapshot.val()));
      } else {
          setCardsObj(null);
      }
  });


  }
}

const firebaseConfig = {
  apiKey: "AIzaSyDw7tricSnJQqCvC2-mgjJ8tpGUhCTOSU4",
  authDomain: "cardmaker2-c1863.firebaseapp.com",
  databaseURL: "https://cardmaker2-c1863-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cardmaker2-c1863",
  storageBucket: "cardmaker2-c1863.appspot.com",
  messagingSenderId: "340955878649",
  appId: "1:340955878649:web:2f2cf7109cde333d833e28"
};

const app = initializeApp(firebaseConfig);

export const authUser = getAuth();
export const cardDb = getDatabase(app); 
