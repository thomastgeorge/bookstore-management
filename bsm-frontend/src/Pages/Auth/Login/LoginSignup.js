import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from '../../../Service/Service'; 
import './LoginSignup.css'; 

const LoginSignup = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/signup') {
      setIsSignIn(false);
    } else {
      setIsSignIn(true);
    }
  }, [location.pathname]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignIn) {
        // Sign in
        const { email, password } = formData;
        const response = await Axios.post('/api/v1/auth/login', { email, password });
        localStorage.setItem('token', response.data.token); 
        



        navigate('/');
      } else {
        // Sign up
        const { username, email, mobile, password, confirmPassword } = formData;
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        await Axios.post('/api/v1/auth/signup', { name: username, email, mobile, password });
        navigate('/login'); 
      }
    } catch (error) {
      console.error("There was an error!", error);
      alert("Error occurred. Please try again.");
    }
  };

  return (
    <div id="login-signup-container" className={`login-signup-container ${isSignIn ? 'sign-in' : 'sign-up'}`}>
      <div className="login-signup-row">
        {/* SIGN UP */}
        <div className={`login-signup-col login-signup-align-items-center login-signup-flex-col sign-up ${isSignIn ? 'hidden' : ''}`}>
          <div className="login-signup-header">
            <img src="logo.png" alt="Logo" className="login-signup-logo" />
            <span className="login-signup-label">Libreria</span>
          </div>
          <div className="login-signup-form-wrapper login-signup-align-items-center">
            <form onSubmit={handleSubmit} className="login-signup-form sign-up">
              <h1>Sign Up</h1>
              <div className="login-signup-input-group">
                <i className='bx bxs-user'></i>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} />
              </div>
              <div className="login-signup-input-group">
                <i className='bx bx-mail-send'></i>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
              </div>
              <div className="login-signup-input-group">
                <i className='bx bx-user'></i>
                <input type="text" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleInputChange} />
              </div>
              <div className="login-signup-input-group">
                <i className='bx bxs-lock-alt'></i>
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
              </div>
              <div className="login-signup-input-group">
                <i className='bx bxs-lock-alt'></i>
                <input type="password" name="confirmPassword" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleInputChange} />
              </div>
              <button type="submit">
                Sign up
              </button>
              <p className='login-already-span'>
                <span className='login-already-span'>
                  Already have an account?
                </span>
                <b onClick={() => navigate('/login')} className="login-signup-pointer">
                  Login here
                </b>
              </p>
            </form>
          </div>
        </div>
        {/* END SIGN UP */}

        {/* SIGN IN */}
        <div className={`login-signup-col login-signup-align-items-center login-signup-flex-col sign-in ${isSignIn ? '' : 'hidden'}`}>
          <div className="login-signup-header">
            <img src="logo.png" alt="Logo" className="login-signup-logo" />
            <span className="login-signup-label">Libreria</span>
          </div>
          <div className="login-signup-form-wrapper login-signup-align-items-center">
            <form onSubmit={handleSubmit} className="login-signup-form sign-in">
              <h1>Login</h1>
              <div className="login-signup-input-group">
                <i className='bx bxs-user'></i>
                <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
              </div>
              <div className="login-signup-input-group">
                <i className='bx bxs-lock-alt'></i>
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
              </div>
              <button type="submit">
                Login
              </button>
              <p >
                <b className='login-already-span'>
                  Forgot password?
                </b>
              </p>
              <p >
                <span className='login-already-span'>
                  Don't have an account?
                </span>
                <b onClick={() => navigate('/signup')} className="login-signup-pointer">
                  Sign up here
                </b>
              </p>
            </form>
          </div>
        </div>
        {/* END SIGN IN */}
      </div>

      <div className="login-signup-row login-signup-content-row">
        {/* SIGN IN CONTENT */}
        <div className={`login-signup-col login-signup-align-items-center login-signup-flex-col ${isSignIn ? '' : 'hidden'}`}>
          <div className="login-signup-text sign-in">
            <h2>Welcome</h2>
          </div>
          <div className="login-signup-img sign-in"></div>
        </div>
        {/* END SIGN IN CONTENT */}

        {/* SIGN UP CONTENT */}
        <div className={`login-signup-col login-signup-align-items-center login-signup-flex-col ${isSignIn ? 'hidden' : ''}`}>
          <div className="login-signup-img sign-up"></div>
          <div className="login-signup-text sign-up">
            <h2>Join with us</h2>
          </div>
        </div>
        {/* END SIGN UP CONTENT */}
      </div>
    </div>
  );
};

export default LoginSignup;
