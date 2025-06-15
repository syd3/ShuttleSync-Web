import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { ReactComponent as UserIcon } from '../../assets/user.svg';
import { ReactComponent as LockIcon } from '../../assets/lock.svg';
import { ReactComponent as EyeIcon } from '../../assets/eye.svg';
import { ReactComponent as EyeOffIcon } from '../../assets/eye-off.svg';

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (!formData.username || !formData.password) {
    setError('Please fill in all fields');
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (res.ok && data.success) {
      // Store the token
      localStorage.setItem('token', data.token);
      navigate('/user');
    } else {
      setError(data.error || 'Invalid credentials');
    }
  } catch (err) {
    setError('Server error');
  }
};

  return (
    <div className="login-bg">
      <div className="login-container">
        <h1 className="login-title">
          <span className="bold">Shuttle</span>
          <span className="blue">Sync</span>
        </h1>
        <div className="login-box">
          <h2 className="portal-title">Admin Portal</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <span className="input-icon"><UserIcon /></span>
              <input 
                type="text" 
                name="username"
                placeholder="Username" 
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <span className="input-icon"><LockIcon /></span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <span
                className="input-icon input-eye"
                onClick={() => setShowPassword(v => !v)}
                style={{ cursor: 'pointer' }}
                title="Show/Hide Password"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </span>
            </div>
            {error && <div className="error-message">{error}</div>}
            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;