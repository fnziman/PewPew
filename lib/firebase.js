import * as admin from "firebase";

var config = {
  apiKey: "AIzaSyDqv9czEBfNMwWkeI_QGcC9O3IAgoKqoMQ",
  authDomain: "pew-pew-9bc05.firebaseapp.com",
  databaseURL: "https://pew-pew-9bc05.firebaseio.com",
  projectId: "pew-pew-9bc05",
  storageBucket: "",
  messagingSenderId: "194751512644"
};
admin.initializeApp(config);

const database = admin.database();

export const newHighScore = (score) => {
  admin.database().ref().set({ highScore: score });
};

export const getScore = () => {
  admin.database().ref().once('value').then((res) => {

    const highScore = res.val().highScore;

    return highScore;
  });
};
