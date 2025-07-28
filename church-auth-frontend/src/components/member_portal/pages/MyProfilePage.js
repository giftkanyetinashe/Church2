import React, { useState, useEffect,  } from 'react';
import './MyProfilePage.css';
import BackButton from '../BackButton';

// Mock Data - now more church-specific
const mockProfileData = {
    firstName: 'Valued',
    lastName: 'Member',
    birthDate: '1990-01-01',
    email: 'member@example.com',
    phoneMobile: '555-123-4567',
    addressStreet: '123 Church St, Anytown, TX',
    membershipStatus: 'Active Member',
    joinDate: '2018-05-12',
    maritalStatus: 'Married',
    allergies: 'Peanuts (anaphylactic)',
    spiritualGifts: ['Teaching', 'Hospitality'],
    family: [
        { id: 'f002', name: 'Jane Member', relationship: 'Spouse' },
        { id: 'f003', name: 'Sam Member', relationship: 'Child' },
        { id: 'f004', name: 'Lily Member', relationship: 'Child' },
    ]
};

const MyProfilePage = () => {
    const [profile, setProfile] = useState({ ...mockProfileData });
    const [isLoading, setIsLoading] = useState(false);

    // This would fetch data in a real app
    useEffect(() => {}, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log('Updating church profile with:', profile);
        setTimeout(() => {
            setIsLoading(false);
            alert('Profile updated successfully! (mock)');
        }, 1000);
    };

    return (
        <div className="portal-page-container my-profile-page">
            <BackButton to="/portal">Back</BackButton>
            <div className="profile-header">
                <div className="profile-avatar">
                    <span>{profile.firstName.charAt(0)}</span>
                    <button className="change-photo-btn" title="Change Photo"><i className="fas fa-camera"></i></button>
                </div>
                <div className="profile-welcome">
                    <h1>{profile.firstName} {profile.lastName}'s Profile</h1>
                    <p>Keeping your information current helps us serve you and your family better.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                {/* --- Personal & Contact Information Card --- */}
                <div className="profile-card">
                    <h2>Personal & Contact Details</h2>
                    <div className="profile-form-grid">
                        <div className="portal-form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" name="firstName" value={profile.firstName} onChange={handleChange} />
                        </div>
                        <div className="portal-form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" name="lastName" value={profile.lastName} onChange={handleChange} />
                        </div>
                        <div className="portal-form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" value={profile.email} onChange={handleChange} />
                        </div>
                        <div className="portal-form-group">
                            <label htmlFor="phoneMobile">Mobile Phone</label>
                            <input type="tel" id="phoneMobile" name="phoneMobile" value={profile.phoneMobile} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="portal-form-group">
                        <label htmlFor="addressStreet">Mailing Address</label>
                        <input type="text" id="addressStreet" name="addressStreet" value={profile.addressStreet} onChange={handleChange} />
                    </div>
                </div>

                {/* --- Church Information Card --- */}
                <div className="profile-card">
                    <h2>Church Information</h2>
                    <div className="profile-form-grid">
                        <div className="portal-form-group">
                            <label htmlFor="membershipStatus">Membership Status</label>
                            <input type="text" id="membershipStatus" name="membershipStatus" value={profile.membershipStatus} onChange={handleChange} readOnly />
                        </div>
                         <div className="portal-form-group">
                            <label htmlFor="joinDate">Member Since</label>
                            <input type="text" id="joinDate" name="joinDate" value={new Date(profile.joinDate).toLocaleDateString()} readOnly />
                        </div>
                         <div className="portal-form-group">
                            <label htmlFor="birthDate">Birth Date</label>
                            <input type="date" id="birthDate" name="birthDate" value={profile.birthDate} onChange={handleChange} />
                        </div>
                        <div className="portal-form-group">
                            <label htmlFor="maritalStatus">Marital Status</label>
                            <select id="maritalStatus" name="maritalStatus" value={profile.maritalStatus} onChange={handleChange}>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Widowed">Widowed</option>
                            </select>
                        </div>
                    </div>
                    <div className="portal-form-group">
                        <label htmlFor="allergies">Allergies or Important Medical Notes</label>
                        <textarea id="allergies" name="allergies" rows="2" placeholder="e.g., Peanut allergy, Diabetic, etc." value={profile.allergies} onChange={handleChange}></textarea>
                        <small>This information is confidential and used for safety at church events.</small>
                    </div>
                </div>

                {/* --- Family Members Card (Read-Only) --- */}
                <div className="profile-card">
                    <h2>My Family</h2>
                    <p className="card-subtitle">To make changes to your family structure, please contact the church office.</p>
                    <div className="family-list">
                        {profile.family && profile.family.map(person => (
                            <div key={person.id} className="family-member-item">
                                <i className="fas fa-user-circle"></i>
                                <span className="family-member-name">{person.name}</span>
                                <span className="family-member-relationship">{person.relationship}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Form Submission Action --- */}
                <div className="profile-actions-footer">
                     <button type="submit" className="btn-portal btn-portal-success" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Profile Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MyProfilePage;