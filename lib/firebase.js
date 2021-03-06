import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyDqv9czEBfNMwWkeI_QGcC9O3IAgoKqoMQ",
  authDomain: "pew-pew-9bc05.firebaseapp.com",
  databaseURL: "https://pew-pew-9bc05.firebaseio.com",
  projectId: "pew-pew-9bc05",
  storageBucket: "pew-pew-9bc05.appspot.com",
  messagingSenderId: "194751512644"
};
firebase.initializeApp(config);

export const setHighScore = (score) => {
  firebase.database().ref().set({ highScore: score });
};

export const getHighScore = () => {
  return firebase.database().ref().once('value').then((res) => {
    const highScore = res.val().highScore;
    return highScore;
  });
};
