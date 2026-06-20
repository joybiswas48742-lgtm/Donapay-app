import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!phone || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (phone.length !== 10) {
      setError('Phone number must be 10 digits');
      setLoading(false);
      return;
    }

    try {
      const email = `user_${phone}@donapay.com`;
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid phone or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-purple-400 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-3xl font-bold text-purple-600">₹</span>
          </div>
          <h1 className="text-4xl font-bold text-white">DONAPAY</h1>
          <p className="text-purple-100 text-sm mt-1">Safe and Secure Transactions</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                maxLength="10"
              />
              <p className="text-xs text-gray-500 mt-1">Please enter 10 digit phone number</p>
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-xs text-gray-500 mt-1">Please enter 6 - 20 characters</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold py-3 rounded-full mt-6 hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <button
            onClick={() => navigate('/register')}
            className="w-full border-2 border-purple-600 text-purple-600 font-bold py-3 rounded-full mt-4 hover:bg-purple-50 transition-all"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
