import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

export default function Auth(props) {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: 'pharmacydashboard-b9262.firebaseapp.com',
    databaseURL: 'https://pharmacydashboard-b9262.firebaseio.com',
    projectId: 'pharmacydashboard-b9262',
    storageBucket: 'pharmacydashboard-b9262.appspot.com',
    messagingSenderId: '127721288589',
    appId: '1:127721288589:web:44f97dec6ab3621a8dc3c4',
  };

  initializeApp(firebaseConfig);
  const login = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        props.setAuth({ data: result.user, status: result.user.emailVerified });
      })
      .catch((error) => {
        return error;
      });
  };
  return (
    <div className="auth-layout">
      <div className="auth-section">
        <p className="auth-title">Admin Dashboard</p>
        <p className="auth-text">Telegram Weather Bot</p>
        <button onClick={() => login()}>Sign In with Google</button>
      </div>
    </div>
  );
}
