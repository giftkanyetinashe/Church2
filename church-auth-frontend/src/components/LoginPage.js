// src/components/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate is correctly imported
import './AuthForm.css';

// const logoUrl = '/atom-logo.png';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Correctly declared

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        console.log('Login attempt:', { email, password, rememberMe });

        // Simulate success and redirect (replace with actual logic)
        alert('Login successful (mock)!');
        // **UNCOMMENT or implement navigation here**
        // For example, to navigate to a dashboard page:
        navigate('/dashboard'); // Or any other route you want to go to after login
        // If you don't have a /dashboard route yet, you can comment this line out again
        // or navigate back to login or register for testing:
        // navigate('/register');
    };

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper">
                <div className="auth-logo" style={{fontSize: '2em', fontWeight: 'bold', color: '#007bff'}}>CMS</div>
                <h1>Login</h1>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    <div className="auth-options">
                        <div className="checkbox-group">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="rememberMe">Remember me?</label>
                        </div>
                    </div>
                    <button type="submit" className="auth-submit-btn">
                        Login
                    </button>
                </form>
                <div className="auth-links">
                    <p>
                        <Link to="/forgot-password">Forgot your password?</Link>
                    </p>
                    <p>
                        <Link to="/register">Register as a new user</Link>
                    </p>
                </div>
                <div className="auth-footer">
                    © {new Date().getFullYear()} Church Management Software. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default LoginPage;