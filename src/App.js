import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Bills from './pages/Bills';
import BuyHistory from './pages/BuyHistory';
import SellHistory from './pages/SellHistory';
import Profile from './pages/Profile';
import Team from './pages/Team';
import Settings from './pages/Settings';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-purple-600 to-purple-400">
        <div className="text-center">
          <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <div className="text-4xl">₹</div>
          </div>
          <h1 className="text-white text-3xl font-bold">DONAPAY</h1>
          <p className="text-purple-100 mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        <Routes>
          {!user ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/bills" element={<Bills />} />
              <Route path="/buy-history" element={<BuyHistory />} />
              <Route path="/sell-history" element={<SellHistory />} />
              <Route path="/team" element={<Team />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
