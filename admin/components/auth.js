import React from 'react';

export default function Auth(props) {
  return (
    <div className="auth-layout">
      <div className="auth-section">
        <p className="auth-title">Admin Dashboard</p>
        <p className="auth-text">Telegram Weather Bot</p>
        <button onClick={() => props.setAuth({ data: null, status: true })}>
          Sign In with Google
        </button>
      </div>
    </div>
  );
}
