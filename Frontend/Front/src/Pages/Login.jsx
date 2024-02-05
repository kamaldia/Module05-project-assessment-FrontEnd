import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const Login = () => {

  const [login, setLogin] = useState({
    username: '',
    password: '',
  });

  const [signUp, setSignUp] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const [showLogin, setShowLogin] = useState(true);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    if (!showLogin) {
      setSignUp({ ...signUp, [e.target.name]: e.target.value });
    }
    setLogin({ ...login, [e.target.name]: e.target.value });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(login);
    try {
      const response = await axios.post('http://localhost:8000/api/user/login', login, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const { token } = response.data;
      if (token) {
        sessionStorage.setItem('jwt', token)
        navigate('/products');
      }
    } catch (error) {
      const errorMessage = error || 'Login failed. Please try again.'
      toast.error(errorMessage);
    }
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/user/register', signUp, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setSignUp({
        username: '',
        password: '',
        confirmPassword: '',
      });
      toast.success('Sign up successful!', {
        autoClose: 2500,
      });
      setShowLogin(true);
    } catch (error) {
      // console.error(error.response.data)
      const errorMessage = error || 'Sign up failed. Please try again.'
      toast.error(errorMessage);
    }
  }

  return (
    <>
      {showLogin ? (
        <section>
          <div className='login-wrapper'>
            <div className="login-body">
              <h1>Log In</h1>
              <form className='login-form' onSubmit={handleLogin}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id='username'
                  name="username"
                  value={login.username}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="password">Password</label>
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    id='password'
                    name="password"
                    value={login.password}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="password-visibility-toggle" onClick={handleShowPassword}>
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                <button type="submit">LOG IN</button>
                <p className='dont-have-account'>Don't have an account? <button type='button' onClick={(e) => {e.preventDefault(); setShowLogin(false);}}>Sign Up</button></p>
              </form>
            </div>
          </div>
          <ToastContainer />
        </section>
      ) : (
        <section>
          <div className="login-wrapper">
            <div className="login-body">
              <h1 className='sign-up-heading'>Sign Up</h1>
              <form className='login-form' onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id='username'
                  name="username"
                  value={signUp.username}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="password">Password</label>
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    id='password'
                    name="password"
                    value={signUp.password}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="password-visibility-toggle" onClick={handleShowPassword}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    id='confirmPassword'
                    name="confirmPassword"
                    value={signUp.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="password-visibility-toggle" onClick={handleShowPassword}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <button type="submit" >SIGN UP</button>
              </form>
            </div>
          </div>
          <ToastContainer />
        </section>
      )
      }
    </>
  );
};

export default Login;