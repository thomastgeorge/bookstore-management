import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './LoginSignup.css'; 

const LoginSignup = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    // Check the current URL path and set the form accordingly
    if (location.pathname === '/signup') {
      setIsSignIn(false);
    } else {
      setIsSignIn(true);
    }
  }, [location.pathname]); // Dependency array ensures the effect runs on pathname change

  const toggleForm = (path) => {
    // Navigate to the given path and update the form state accordingly
    navigate(path);
  };

  return (
    <div id="login-signup-container" className={`login-signup-container ${isSignIn ? 'sign-in' : 'sign-up'}`}>
      <div className="login-signup-row">
        {/* SIGN UP */}
        <div className="login-signup-col login-signup-align-items-center login-signup-flex-col sign-up">
          <div className="login-signup-form-wrapper login-signup-align-items-center">
            
            <div className="login-signup-form sign-up">
              <div className="login-signup-input-group">
              <h1>Sign Up</h1>
                <i className='bx bxs-user'></i>
                <input type="text" placeholder="Username" />
              </div>
              <div className="login-signup-input-group">
                <i className='bx bx-mail-send'></i>
                <input type="email" placeholder="Email" />
              </div>
              <div className="login-signup-input-group">
                <i className='bx bx-user'></i>
                <input type="text" placeholder="Mobile Number" />
              </div>
              <div className="login-signup-input-group">
                <i className='bx bxs-lock-alt'></i>
                <input type="password" placeholder="Password" />
              </div>
              <div className="login-signup-input-group">
                <i className='bx bxs-lock-alt'></i>
                <input type="password" placeholder="Confirm password" />
              </div>
              <button>
                Sign up
              </button>
              <p>
                <span>
                  Already have an account?
                </span>
                <b onClick={() => toggleForm('/login')} className="login-signup-pointer">
                  Sign in here
                </b>
              </p>
            </div>
          </div>
        </div>
        {/* END SIGN UP */}

        {/* SIGN IN */}
        <div className="login-signup-col login-signup-align-items-center login-signup-flex-col sign-in">
          <div className="login-signup-form-wrapper login-signup-align-items-center">
            <div className="login-signup-form sign-in">
            <h1>Sign In</h1>
              <div className="login-signup-input-group">
                <i className='bx bxs-user'></i>
                <input type="text" placeholder="Username" />
              </div>
              <div className="login-signup-input-group">
                <i className='bx bxs-lock-alt'></i>
                <input type="password" placeholder="Password" />
              </div>
              <button>
                Sign in
              </button>
              <p>
                <b>
                  Forgot password?
                </b>
              </p>
              <p>
                <span>
                  Don't have an account?
                </span>
                <b onClick={() => toggleForm('/signup')} className="login-signup-pointer">
                  Sign up here
                </b>
              </p>
            </div>
          </div>
        </div>
        {/* END SIGN IN */}
      </div>

      <div className="login-signup-row login-signup-content-row">
        {/* SIGN IN CONTENT */}
        <div className="login-signup-col login-signup-align-items-center login-signup-flex-col">
          <div className="login-signup-text sign-in">
            <h2>
              Welcome
            </h2>
          </div>
          <div className="login-signup-img sign-in">
          </div>
        </div>
        {/* END SIGN IN CONTENT */}

        {/* SIGN UP CONTENT */}
        <div className="login-signup-col login-signup-align-items-center login-signup-flex-col">
          <div className="login-signup-img sign-up">
          </div>
          <div className="login-signup-text sign-up">
            <h2>
              Join with us
            </h2>
          </div>
        </div>
        {/* END SIGN UP CONTENT */}
      </div>
    </div>
  );
};

export default LoginSignup;
