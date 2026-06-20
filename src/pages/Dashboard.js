import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { signOut } from 'firebase/auth';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-b from-purple-600 to-purple-500 text-white p-6 rounded-b-3xl shadow-lg">
        <h1 className="text-red-300 text-lg font-semibold">Welcome to DONAPAY! Safe and Secure Transactions</h1>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-purple-100">Hello, {userData?.fullName || 'User'}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-3xl p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-2">Available Balance</p>
              <h2 className="text-4xl font-bold">₹{userData?.balance?.toFixed(2) || '0.00'}</h2>
              <p className="text-purple-200 text-sm mt-2">Today's earnings: 0.00</p>
            </div>
            <button className="bg-purple-400 hover:bg-purple-300 text-purple-900 px-6 py-2 rounded-full font-semibold">
              Detail
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 mb-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <span className="text-2xl">₹</span>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Available Bonus</p>
                <p className="text-2xl font-bold text-gray-800">₹{userData?.bonus?.toFixed(2) || '0.00'}</p>
              </div>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-semibold">
              Claim
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => navigate('/bills')}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100"
          >
            <p className="text-4xl mb-2">📄</p>
            <p className="text-gray-800 font-semibold text-sm">Bills</p>
          </button>

          <button
            onClick={() => navigate('/buy-history')}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100"
          >
            <p className="text-4xl mb-2">🛒</p>
            <p className="text-gray-800 font-semibold text-sm">Buy History</p>
          </button>

          <button
            onClick={() => navigate('/sell-history')}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100"
          >
            <p className="text-4xl mb-2">📊</p>
            <p className="text-gray-800 font-semibold text-sm">Sell History</p>
          </button>

          <button
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100"
          >
            <p className="text-4xl mb-2">🎧</p>
            <p className="text-gray-800 font-semibold text-sm">Service</p>
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Other functions</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all">
              <p className="text-2xl mb-2">⭐</p>
              <p className="text-sm font-semibold text-gray-800">Bonus</p>
            </button>

            <button className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all">
              <p className="text-2xl mb-2">🎁</p>
              <p className="text-sm font-semibold text-gray-800">Redeem Gift</p>
            </button>

            <button className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all">
              <p className="text-2xl mb-2">✉️</p>
              <p className="text-sm font-semibold text-gray-800">Inbox</p>
            </button>

            <button
              onClick={() => navigate('/settings')}
              className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all"
            >
              <p className="text-2xl mb-2">🔒</p>
              <p className="text-sm font-semibold text-gray-800">Password</p>
            </button>

            <button className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all">
              <p className="text-2xl mb-2">🛡️</p>
              <p className="text-sm font-semibold text-gray-800">PIN</p>
            </button>

            <button className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all">
              <p className="text-2xl mb-2">🌍</p>
              <p className="text-sm font-semibold text-gray-800">Language</p>
            </button>

            <button
              onClick={() => navigate('/settings')}
              className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all"
            >
              <p className="text-2xl mb-2">⚙️</p>
              <p className="text-sm font-semibold text-gray-800">Settings</p>
            </button>

            <button className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all">
              <p className="text-2xl mb-2">ℹ️</p>
              <p className="text-sm font-semibold text-gray-800">v 6.0.1.1</p>
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center p-3 shadow-lg">
        <button className="flex flex-col items-center gap-1 text-purple-600">
          <p className="text-2xl">🏠</p>
          <span className="text-xs font-semibold">Home</span>
        </button>
        <button
          onClick={() => navigate('/bills')}
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-purple-600"
        >
          <p className="text-2xl">🛍️</p>
          <span className="text-xs font-semibold">Purchase</span>
        </button>
        <button
          onClick={() => navigate('/team')}
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-purple-600"
        >
          <p className="text-2xl">👥</p>
          <span className="text-xs font-semibold">Team</span>
        </button>
        <button
          onClick={() => navigate('/profile')}
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-purple-600"
        >
          <p className="text-2xl">👤</p>
          <span className="text-xs font-semibold">Profile</span>
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
