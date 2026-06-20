import React from 'react';
import { useNavigate } from 'react-router-dom';

function SellHistory() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-b from-purple-600 to-purple-500 text-white p-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)}>← Back</button>
        <h1 className="text-2xl font-bold">Sell History</h1>
      </div>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-md text-center">
          <p className="text-2xl mb-4">📊</p>
          <h2 className="text-xl font-bold text-gray-800 mb-2">No Sales History</h2>
          <p className="text-gray-500">You haven't made any sales yet.</p>
        </div>
      </div>
    </div>
  );
}
export default SellHistory;
