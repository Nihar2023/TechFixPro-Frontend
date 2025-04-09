import React, { useContext, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { UserContext } from '../../Context/UserContext';

const Login = () => {
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);

  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false); // loader

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!email || !password || (authMode === 'sign up' && (!name || !address || !mobile))) {
      toast.error("Please fill out all required fields.");
      setLoading(false);
      return;
    }

    try {
      const url = authMode === 'sign up' 
        ?   `${import.meta.env.VITE_BACKEND_LINK}/api/user/signup`
        : `${import.meta.env.VITE_BACKEND_LINK}/api/user/login`;

      const payload = authMode === 'sign up'
        ? { email, password, name, address, mobile }
        : { email, password };

      const res = await axios.post(url, payload);

      if (res.data.success) {
        const userData = res.data.user;
        setUserData(userData);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(userData));

        toast.success(`${authMode === 'sign up' ? 'Signup' : 'Login'} successful! 🎉`, { autoClose: 1000 });

        // Immediate navigation after toast
        setTimeout(() => {
          navigate('/');
          window.location.reload(); // Force fresh data from localStorage
        }, 1000);
      } else {
        toast.error(res.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Auth Error:", error);
      toast.error(error?.response?.data?.message || "Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-container" onSubmit={onSubmitHandler}>
      <ToastContainer />
      <p className="login-title">{authMode === 'sign up' ? 'Create Account' : 'Login'}</p>
      <p className="login-description">Please {authMode === 'sign up' ? 'create an account' : 'login'} to continue.</p>

      {authMode === 'sign up' && (
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input type="text" className="form-input" placeholder="Enter your full name" onChange={(e) => setName(e.target.value)} value={name} required />
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Email</label>
        <input type="email" className="form-input" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} value={email} required />
      </div>

      <div className="form-group">
        <label className="form-label">Password</label>
        <input type="password" className="form-input" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} value={password} required />
      </div>

      {authMode === 'sign up' && (
        <>
          <div className="form-group">
            <label className="form-label">Address</label>
            <input type="text" className="form-input" placeholder="Enter your address" onChange={(e) => setAddress(e.target.value)} value={address} required />
          </div>

          <div className="form-group">
            <label className="form-label">Mobile No</label>
            <input type="text" className="form-input" placeholder="Enter your mobile number" onChange={(e) => setMobile(e.target.value)} value={mobile} required />
          </div>
        </>
      )}

      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? "Please wait..." : authMode === 'sign up' ? 'Create Account' : 'Login'}
      </button>

      <p className="toggle-message">
        {authMode === 'sign up' ? "Already have an account?" : "Don’t have an account?"}{" "}
        <span className="toggle-link" onClick={() => setAuthMode(authMode === 'sign up' ? 'login' : 'sign up')}>
          {authMode === 'sign up' ? "Login here" : "Sign up here"}
        </span>
      </p>
    </form>
  );
};

export default Login;
