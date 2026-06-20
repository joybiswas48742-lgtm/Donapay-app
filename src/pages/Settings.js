import React from 'react';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-b from-purple-600 to-purple-500 text-white p-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)}>← Back</button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
          <button className="w-full text-left p-4 hover:bg-gray-50 rounded-lg transition-all border-b">
            <p className="text-gray-800 font-semibold">Change Password</p>
            <p className="text-gray-500 text-sm">Update your password</p>
          </button>

          <button className="w-full text-left p-4 hover:bg-gray-50 rounded-lg transition-all border-b">
            <p className="text-gray-800 font-semibold">Change PIN</p>
            <p className="text-gray-500 text-sm">Set or update your PIN</p>
          </button>

          <button className="w-full text-left p-4 hover:bg-gray-50 rounded-lg transition-all border-b">
            <p className="text-gray-800 font-semibold">Notifications</p>
            <p className="text-gray-500 text-sm">Manage notifications</p>
          </button>

          <button className="w-full text-left p-4 hover:bg-gray-50 rounded-lg transition-all border-b">
            <p className="text-gray-800 font-semibold">Language</p>
            <p className="text-gray-500 text-sm">Select language</p>
          </button>

          <button className="w-full text-left p-4 hover:bg-gray-50 rounded-lg transition-all">
            <p className="text-gray-800 font-semibold">About DONAPAY</p>
            <p className="text-gray-500 text-sm">App version v 6.0.1.1</p>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Settings;
