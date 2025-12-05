// src/components/ProtectedRoute.js

import React, { useState } from 'react';
import toast from 'react-hot-toast';

const PROTECTED_KEY = 'admin_authenticated';
const STATIC_USERNAME = 'majumder123'; // Static Username
const STATIC_PASSWORD = 'majumder123'; // Static Password

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem(PROTECTED_KEY) === 'true'
  );
  // 👈 মডাল দেখানোর জন্য নতুন স্টেট
  const [showLoginModal, setShowLoginModal] = useState(false);
  // 👈 ইউজারনেম ও পাসওয়ার্ড ইনপুটের জন্য স্টেট
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Already authenticated, render children
  if (isAuthenticated) {
    return children;
  }

  // Login handler triggered by modal's submit button
  const handleLoginSubmit = (e) => {
    e.preventDefault(); // ফর্ম সাবমিট প্রতিরোধ
    
    if (username === STATIC_USERNAME && password === STATIC_PASSWORD) {
      // Correct credentials
      localStorage.setItem(PROTECTED_KEY, 'true');
      setIsAuthenticated(true);
      setShowLoginModal(false); // মডাল বন্ধ করা
      setUsername('');
      setPassword('');

      // 🟢 Success Toast Message
      toast.success('Login successful! Welcome to the Admin Dashboard.', {
        duration: 3000,
      }); 
    } else {
      // Incorrect credentials
      
      // 🔴 Error Toast Message
      toast.error('Login failed. Incorrect Username or Password.', {
        duration: 4000,
      });
      // পাসওয়ার্ড বা ইউজারনেম ক্লিয়ার করা যেতে পারে
      setPassword(''); 
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>🔒 Access Restricted</h2>
      <p>This page requires authentication.</p>
      
      {/* 1. Login বাটন - মডাল চালু করবে */}
      <button 
        onClick={() => setShowLoginModal(true)} // 👈 মডাল চালু
        className='text-white px-5 py-2 bg-primary rounded-2xl cursor-pointer'
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Login to Access Admin Dashboard
      </button>

      {/* 2. Custom Login Modal (পপআপ) */}
      {showLoginModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h3>Admin Login</h3>
            <form onSubmit={handleLoginSubmit}>
              
              {/* ইউজারনেম ইনপুট */}
              <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                required
                style={inputStyle}
              />
              
              {/* পাসওয়ার্ড ইনপুট */}
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyle}
              />

              <div style={{ marginTop: '15px' }}>
                <button 
                  type="button" 
                  onClick={() => setShowLoginModal(false)} 
                  style={cancelButtonStyle}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={submitButtonStyle}
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProtectedRoute;


// 3. মডাল স্টাইলস (CSS ছাড়াই দ্রুত UI-এর জন্য)
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '8px',
  width: '300px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'left',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '8px 0',
  boxSizing: 'border-box',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const submitButtonStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginLeft: '10px',
};

const cancelButtonStyle = {
  backgroundColor: '#6c757d',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};