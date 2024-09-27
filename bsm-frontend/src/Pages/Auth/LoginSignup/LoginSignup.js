import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from '../../../Service/Axios';
import { UserContext } from '../../../App';
import './LoginSignup.css';
import emailjs from '@emailjs/browser';

const PUBLIC_KEY = 'zgVYVTJWKV1hRD6pk';
emailjs.init(PUBLIC_KEY);

const LoginSignup = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [otp, setOtp] = useState('');
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [showForgotPasswordDialog, setShowForgotPasswordDialog] = useState(false);
  const[showResetPasswordDialog,setShowResetPasswordDialog]=useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordOtp, setForgotPasswordOtp] = useState('');
  const [generatedForgotPasswordOtp, setGeneratedForgotPasswordOtp] = useState(''); // Added state
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
 


  useEffect(() => {
    if (location.pathname === '/signup') {
      setIsSignIn(false);
    } else {
      setIsSignIn(true);
    }
  }, [location.pathname]);



  const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignIn) {
      // Sign in logic
      localStorage.removeItem('token');
      const { email, password } = formData;
      try {
        const response = await Axios.post('/api/v1/auth/login', { email, password });
        localStorage.setItem('token', response.data.token);
        if (response.data.user.role === "USER") {
          const userResponse = await Axios.get(`/api/v1/customer/userId/${response.data.user.userId}`);
          const modifiedData = {
            ...userResponse.data,
            role: response.data.user.role
          };
          setUser(modifiedData);
          localStorage.setItem('user', JSON.stringify(modifiedData));
          const redirectUrl = localStorage.getItem('currentPageUrl') || '/';
          const pathname = new URL(redirectUrl, window.location.origin).pathname;
          navigate(pathname);
        } else {
          setUser(response.data.user);
          navigate('/admin');
        }
      } catch (error) {
        console.error('There was an error!', error);
        alert("Invalid Credentials")
      }
    } else {
      // Sign up logic
      const { username, email, mobile, password, confirmPassword } = formData;
      if (!username || !email || !mobile || !password || !confirmPassword) {
        alert('All fields are required!');
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
     

      const otp = generateOTP();
      setGeneratedOtp(otp);
      setShowOtpDialog(true);

      // Send OTP email
      const serviceID = "service_6sfv418";
      const templateID = "template_xr5glab";
      const templateParams = {
        from_name: "Libreria",
        OTP: otp,
        message: "Use the OTP to verify your email address.",
        reply_to: email,
      };

      emailjs.send(serviceID, templateID, templateParams)
        .then((response) => {
          console.log('OTP sent successfully', response);
        })
        .catch((error) => {
          console.error('Error sending OTP', error);
        });
    }
  };

  const handleOtpSubmit = () => {
    if (otp === generatedOtp.toString()) {
      // Proceed with the signup
      const { username, email, mobile, password } = formData;
      Axios.post('/api/v1/auth/signup', { name: username, email, mobile, password })
        .then(() => {
          navigate('/login');
        })
        .catch((error) => {
          console.error('Error during signup', error);
        });
      setShowOtpDialog(false);
    } else {
      alert('Invalid OTP');
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    const otp = generateOTP();
    setGeneratedForgotPasswordOtp(otp);

    // Send OTP email
    const serviceID = "service_6sfv418";
    const templateID = "template_xr5glab";
    const templateParams = {
      from_name: "Libreria",
      OTP: otp,
      message: "Use the OTP given to reset password.",
      reply_to: forgotPasswordEmail,
    };

    emailjs.send(serviceID, templateID, templateParams)
      .then((response) => {
        console.log('OTP sent successfully', response);
        
        setShowForgotPasswordDialog(false); // Show dialog to enter OTP and new password
        setShowResetPasswordDialog(true);
      })
      .catch((error) => {
        console.error('Error sending OTP', error);
      });
  };

  const handleResetPasswordSubmit = async () => {
    if (forgotPasswordOtp !== generatedForgotPasswordOtp.toString()) {
      alert('Invalid OTP');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      await Axios.patch(`/api/v1/user/updatePasswordLogin/${forgotPasswordEmail}`, { newPassword });
      alert('Password reset successfully');
      setShowResetPasswordDialog(false);
    } catch (error) {
      console.error('Error resetting password', error);
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
              <h2>Sign Up</h2>
              <div className="login-signup-input-group">
                <i className='bx bxs-user'></i>
                <input type="text" name="username" placeholder="Username" value={formData.username} required
                  pattern="[A-Za-z0-9 ]{3,}"
                  title="Username must be at least 3 characters long and contain only letters, space and digits." onChange={handleInputChange} />
                {/* {errors.username && <span className="error-message">{errors.username}</span>} */}
              </div>
              <div className="login-signup-input-group">
                <i className='bx bx-mail-send'></i>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                {/* {errors.email && <span className="error-message">{errors.email}</span>} */}
              </div>
              <div className="login-signup-input-group">
                <i className='bx bx-user'></i>
                <input type="text" name="mobile" placeholder="Mobile Number" required pattern="\+?[1-9]\d{1,14}$"
                  title="Please enter a valid international mobile number." value={formData.mobile} onChange={handleInputChange} />
                {/* {errors.mobile && <span className="error-message">{errors.mobile}</span>} */}
              </div>
              <div className="login-signup-input-group">
                <i className='bx bxs-lock-alt'></i>
                <input type="password" name="password" placeholder="Password" required pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"
                  title="Password must be at least 8 characters long and contain a mix of uppercase, lowercase letters, and numbers." value={formData.password} onChange={handleInputChange} />
                {/* {errors.password && <span className="error-message">{errors.password}</span>} */}
              </div>
              <div className="login-signup-input-group">
                <i className='bx bxs-lock-alt'></i>
                <input type="password" name="confirmPassword" placeholder="Confirm password" required pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}"
                  title="Please confirm your password." value={formData.confirmPassword} onChange={handleInputChange} />
                {/* {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>} */}
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
              <h2>Login</h2>
              <div className="login-signup-input-group">
                <i className='bx bxs-user'></i>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
              </div>
              <div className="login-signup-input-group">
                <i className='bx bxs-lock-alt'></i>
                <input type="password" name="password" placeholder="Password" required pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"
                  title="Password must be at least 8 characters long and contain a mix of uppercase, lowercase letters, and numbers." value={formData.password} onChange={handleInputChange} />
              </div>
              <button type="submit">
                Login
              </button>
              <p>
                <b className='login-already-span' onClick={() => setShowForgotPasswordDialog(true)}>
                  Forgot password?
                </b>
              </p>
              <p>
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

      {/* OTP Dialog */}
      {showOtpDialog && (
        <div className="forgot-password-dialog">
          <div className="forgot-password-dialog-content">
            <h3>Enter OTP</h3>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
            <button onClick={handleOtpSubmit}>Verify OTP</button>
            <button onClick={() => setShowOtpDialog(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Forgot Password Dialog */}
      {showForgotPasswordDialog && !forgotPasswordOtp && (
        <div className="forgot-password-dialog">
          <div className="forgot-password-dialog-content">
            <h3>Reset Password</h3>
            <input
              type="email"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <button onClick={handleForgotPasswordSubmit}>Send OTP</button>
            <button onClick={() => setShowForgotPasswordDialog(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Reset Password Dialog */}
      {showResetPasswordDialog&& (
        <div className="forgot-password-dialog">
          <div className="forgot-password-dialog-content">
            <h3>Enter OTP and New Password</h3>
            <input
              type="text"
              value={forgotPasswordOtp}
              onChange={(e) => setForgotPasswordOtp(e.target.value)}
              placeholder="Enter OTP" 
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password" required pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"
                  title="Password must be at least 8 characters long and contain a mix of uppercase, lowercase letters, and numbers."
            />
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="Confirm New Password" required pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"
              title="Password must be at least 8 characters long and contain a mix of uppercase, lowercase letters, and numbers."
            />
            <button onClick={handleResetPasswordSubmit}>Reset Password</button>
            <button onClick={() => {
              setForgotPasswordOtp('');
              setShowResetPasswordDialog(false);
            }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
