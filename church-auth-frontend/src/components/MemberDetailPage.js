import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './MemberDetailPage.css'; // We'll create this CSS file

// Mock Data - In a real app, this would come from an API based on memberId
const mockMembers = [
    { id: 'm001', name: 'Alice Wonderland', email: 'alice@example.com', phone: '555-0101', address: '123 Rabbit Hole Lane, Wonderland', joinDate: '2022-03-15', birthDate: '1990-05-20', status: 'Active', gender: 'Female', maritalStatus: 'Single', photoUrl: 'https://via.placeholder.com/150/FFA07A/000000?Text=Alice', notes: 'Loves to worship the Lord through singing.' },
    { id: 'm002', name: 'Bob The Builder', email: 'bob@example.com', phone: '555-0102', address: '456 Fixit Ave, Builderville', joinDate: '2021-11-20', birthDate: '1985-10-10', status: 'Active', gender: 'Male', maritalStatus: 'Married', photoUrl: 'https://via.placeholder.com/150/ADD8E6/000000?Text=Bob', notes: 'Can he fix it? Yes, he can!' },
    // Add more mock members if needed, or ensure m001 & m002 exist in your MembersPage mock data
];

const MemberDetailPage = () => {
    const { memberId } = useParams();
    const navigate = useNavigate();
    const [member, setMember] = useState(null);
    const [activeTab, setActiveTab] = useState('profile'); // Default to profile tab
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        // Simulate API call to fetch member details
        setTimeout(() => {
            const foundMember = mockMembers.find(m => m.id === memberId);
            if (foundMember) {
                setMember(foundMember);
            } else {
                setError(new Error('Member not found.'));
            }
            setIsLoading(false);
        }, 500);
    }, [memberId]);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    if (isLoading) {
        return <div className="member-detail-container"><p>Loading member details...</p></div>;
    }

    if (error) {
        return (
            <div className="member-detail-container">
                <p className="error-message">Error: {error.message}</p>
                <Link to="/dashboard/members" className="btn">Back to Members List</Link>
            </div>
        );
    }

    if (!member) { // Should be caught by error state, but good to have
        return <div className="member-detail-container"><p>Member not found.</p></div>;
    }

    return (
        <div className="member-detail-container">
            <div className="member-detail-header">
                <div className="member-photo">
                    <img src={member.photoUrl || 'https://via.placeholder.com/150?text=No+Photo'} alt={member.name} />
                </div>
                <div className="member-info-summary">
                    <h1>{member.name}</h1>
                    <p><i className="fas fa-envelope"></i> {member.email}</p>
                    <p><i className="fas fa-phone"></i> {member.phone}</p>
                    <p><i className="fas fa-map-marker-alt"></i> {member.address || 'N/A'}</p>
                </div>
                <div className="member-actions-header">
                    <Link to={`/dashboard/members/edit/${member.id}`} className="btn btn-edit-member">
                        <i className="fas fa-edit"></i> Edit Member
                    </Link>
                    <button onClick={() => navigate(-1)} className="btn btn-back">
                        <i className="fas fa-arrow-left"></i> Back
                    </button>
                </div>
            </div>

            <div className="member-detail-tabs">
                <button
                    className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => handleTabClick('profile')}>
                    Profile
                </button>
                <button
                    className={`tab-btn ${activeTab === 'family' ? 'active' : ''}`}
                    onClick={() => handleTabClick('family')}>
                    Family
                </button>
                <button
                    className={`tab-btn ${activeTab === 'groups' ? 'active' : ''}`}
                    onClick={() => handleTabClick('groups')}>
                    Groups
                </button>
                <button
                    className={`tab-btn ${activeTab === 'giving' ? 'active' : ''}`}
                    onClick={() => handleTabClick('giving')}>
                    Giving
                </button>
                <button
                    className={`tab-btn ${activeTab === 'attendance' ? 'active' : ''}`}
                    onClick={() => handleTabClick('attendance')}>
                    Attendance
                </button>
                <button
                    className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
                    onClick={() => handleTabClick('notes')}>
                    Notes
                </button>
            </div>

            <div className="member-detail-tab-content">
                {activeTab === 'profile' && (
                    <div className="profile-details">
                        <h3>Personal Information</h3>
                        <div className="detail-grid">
                            <div className="detail-item"><strong>Full Name:</strong><span>{member.name}</span></div>
                            <div className="detail-item"><strong>Status:</strong><span className={`status-badge status-${member.status.toLowerCase()}`}>{member.status}</span></div>
                            <div className="detail-item"><strong>Email:</strong><span>{member.email}</span></div>
                            <div className="detail-item"><strong>Phone:</strong><span>{member.phone}</span></div>
                            <div className="detail-item"><strong>Address:</strong><span>{member.address || 'N/A'}</span></div>
                            <div className="detail-item"><strong>Gender:</strong><span>{member.gender || 'N/A'}</span></div>
                            <div className="detail-item"><strong>Birth Date:</strong><span>{member.birthDate ? new Date(member.birthDate).toLocaleDateString() : 'N/A'}</span></div>
                            <div className="detail-item"><strong>Marital Status:</strong><span>{member.maritalStatus || 'N/A'}</span></div>
                            <div className="detail-item"><strong>Join Date:</strong><span>{new Date(member.joinDate).toLocaleDateString()}</span></div>
                        </div>
                         {member.notes && (
                            <>
                                <h3 className="notes-heading">General Notes</h3>
                                <p className="member-notes">{member.notes}</p>
                            </>
                        )}
                    </div>
                )}
                {activeTab === 'family' && <p>Family information for {member.name} will go here (e.g., spouse, children).</p>}
                {activeTab === 'groups' && <p>Groups {member.name} is part of will be listed here.</p>}
                {activeTab === 'giving' && <p>Giving history for {member.name} will be displayed here.</p>}
                {activeTab === 'attendance' && <p>Attendance records for {member.name} will be shown here.</p>}
                {activeTab === 'notes' && (
                    <div>
                        <h3>Member Specific Notes</h3>
                        <textarea placeholder="Add new notes here..." rows="5"></textarea>
                        <button className="btn btn-save-note">Save Note</button>
                        <p>Existing specific notes for {member.name} (e.g., pastoral care, interactions) will be listed here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MemberDetailPage;