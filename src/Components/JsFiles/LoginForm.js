import { useState } from "react";
import '../CssFiles/LoginForm.css';

function LoginForm({onSwithToRegister}){
  const [formData, setFromData]=useState({
    email:'' ,
    password:''
  });
  const [message, setMessage] =useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFromData ({...formData,[e.target.name] : e.target.value});
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try{
      const response = await fetch('http://localhost:5000/api/login', 
        {method : 'POST', headers : {'Content-Type':'application/json'},
         body:JSON.stringify(formData)});
      const data = await response.json();

      if(response.ok){
        setMessage('Login successful !');
        //To Store token and redirect
        localStorage.setItem('token', data.token);
        //Redirect to dashboard
        window.location.href='/dashboard';
      }
      else{
        setMessage(data.message || 'Login Failed');
      }
    }
    catch (error){
      setMessage('Error Connecting to server');
    }
    finally{ setLoading(false);
    }
  };


  return(
    <div className="auth-conatainer">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Login To your Account</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" placeholder="Enter your email"/>
          </div>
          <div className="form-gruop">
            <label className="form-label"> Password</label>
            <input type="password" name="password" value={formData.password}
            onChange={handleChange} required className="form-input" placeholder="Enter your password"/>
          </div>
          {message && (
            <div className={`message ${message.includes('successful')?
              'message-success' : 'message-error'}`}>{message}</div>
          )}
          <button type="submit" className="submit-button" disabled={loading}>{loading ? 'Logging in...':'Login'}</button>
        </form>
        <div className="forgot-password">
          <button className="forgot-button">Forgot password ? </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;