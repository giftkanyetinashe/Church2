import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthForm.css'; // Shared styles

// const logoUrl = '/atom-logo.png'; // Example

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        // --- Basic Validation ---
        if (!email || !password || !confirmPassword) {
            setError('All fields are required.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // --- Mock API Call ---
        console.log('Registration attempt:', { email, password });
        // In a real app, you would make an API call here
        // For example:
        // api.register(email, password)
        //   .then(response => {
        //     alert('Registration successful! Please login.');
        //     navigate('/login');
        //   })
        //   .catch(err => {
        //     setError(err.message || 'Registration failed. Please try again.');
        //   });

        // Simulate success and redirect (replace with actual logic)
        alert('Registration successful (mock)!');
        navigate('/login'); // Redirect to login after successful registration
    };

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper">
                {/* <img src={logoUrl} alt="Atom Church Logo" className="auth-logo" /> */}
                <div className="auth-logo" style={{fontSize: '2em', fontWeight: 'bold', color: '#007bff'}}>CMS</div> {/* Placeholder Logo */}
                <h1>Register</h1>
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
                            autoComplete="new-password"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                    </div>
                    <button type="submit" className="auth-submit-btn">
                        Register
                    </button>
                </form>
                <div className="auth-links">
                    <p>
                        <Link to="/login">Already have an account? Login</Link>
                    </p>
                </div>
                <div className="auth-footer">
                    © {new Date().getFullYear()} Church Management Software. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;