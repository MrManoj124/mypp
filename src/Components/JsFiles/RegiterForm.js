import { useState ,useContext} from "react";   
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../../Context/AuthContext';
import {registerUser, googleLogin, facebookLogin} from '../../Services/Api';
import {validateEmail, checkPasswordStrength} from '../../Utils/Validation';
import '../CssFiles/RegisterForm.css';

function RegisterForm(){
    const[formData, setFormData]=useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
    });

    const [message, setMessage]=useState('');
    const [loading, setLoading]=useState(false);

    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setMessage('');

        if(formData.password !== formData.confirmPassword){
            setMessage('Passwords do not match!...');
            return;
        }

        if(formData.password.length<6){
            setMessage('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try{
            const response = await fetch('http:/localhost:5000/api/register',{
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({
                        name:formData.name,
                        email:formData.email,
                        password:formData.password
                    })
                });

                const data = await response.json();
                if (response.ok){
                    setMessage('Registration successful! Redirecting to login...');
                    if(data.token){
                        localStorage.setItem('token',data.token);
                        setTimeout(()=>{
                            onSwithToLogin();
                        },2000);
                    }
                }else{
                    setMessage(data.message|| 'Registration Failed');
                }
            }
        catch(error){
                setMessage('Error connecting to server');
            }finally{
                setLoading(false);
            }
    }
    return(
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">SignUp to get Started</p>
                </div>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div>
                    <label className="form-label">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange}
                    required className="form-input" placeholder="Enter your name"/>
                </div>
                <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                    required className="form-input" placeholder="Enter your Email"/>
                </div>

                <div className="form-group">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" value={formData.password}
                    onChange={handleChange} required className="form-input" placeholder="Enter your password" minLength="6"/>
                </div>

                <div className="form-group">
                    <label className="form-label">Confirm Password</label>
                    <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Confirm your password"
                    />
                </div>

                {message && (
                    <div className={`message ${message.includes('successful')?'message-success':'message-error'}`}>
                        {message}
                    </div>)}

                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading?'Creating...':'register'}
                    </button>
                </form>
                <div className="auth-footer">
                    <p className="footer-text">Already have an account?{''}
                        <button onClick={onSwithToLogin} className="link-button">
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}


export default RegisterForm;