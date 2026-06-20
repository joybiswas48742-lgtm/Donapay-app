import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };
    fetchUserData();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-b from-purple-600 to-purple-500 text-white p-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)}>← Back</button>
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-md">
          <div className="text-center mb-6">
            <p className="text-5xl mb-4">👤</p>
            <h2 className="text-2xl font-bold text-gray-800">{userData?.fullName || 'User'}</h2>
          </div>
          
          <div className="space-y-4">
            <div className="border-b pb-4">
              <p className="text-gray-500 text-sm">Full Name</p>
              <p className="text-gray-800 font-semibold">{userData?.fullName || 'N/A'}</p>
            </div>
            
            <div className="border-b pb-4">
              <p className="text-gray-500 text-sm">Phone Number</p>
              <p className="text-gray-800 font-semibold">+91 {userData?.phone || 'N/A'}</p>
            </div>
            
            <div className="pb-4">
              <p className="text-gray-500 text-sm">Total Balance</p>
              <p className="text-2xl font-bold text-purple-600">₹{userData?.balance?.toFixed(2) || '0.00'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
