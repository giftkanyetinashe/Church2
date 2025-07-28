import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AddMemberPage.css'; // We'll create this CSS file

const AddMemberPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        preferredName: '',
        email: '',
        phoneMobile: '',
        phoneHome: '',
        addressStreet: '',
        addressCity: '',
        addressState: '',
        addressZip: '',
        birthDate: '',
        gender: '',
        maritalStatus: '',
        joinDate: '',
        membershipStatus: 'Visitor', // Default status
        notes: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Basic Validation (more robust validation should be added)
        if (!formData.firstName || !formData.lastName) {
            setError('First Name and Last Name are required.');
            setIsLoading(false);
            return;
        }

        console.log('Submitting New Member Data:', formData);

        // --- Simulate API Call ---
        // In a real app, you would post this data to your backend API:
        // try {
        //     const response = await fetch('/api/members', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json', /* Add Auth Token */ },
        //         body: JSON.stringify(formData),
        //     });
        //     if (!response.ok) {
        //         const errData = await response.json();
        //         throw new Error(errData.message || 'Failed to add member');
        //     }
        //     const newMember = await response.json();
        //     console.log('Member added successfully:', newMember);
        //     navigate(`/dashboard/members/view/${newMember.id}`); // Or back to members list
        // } catch (err) {
        //     setError(err.message);
        // } finally {
        //     setIsLoading(false);
        // }

        // Mock success
        setTimeout(() => {
            alert('Member added successfully (mock)!');
            setIsLoading(false);
            navigate('/dashboard/members'); // Navigate back to the members list
        }, 1000);
    };

    return (
        <div className="add-member-page-container">
            <div className="page-header-controls">
                <h2>Add New Member</h2>
                <Link to="/dashboard/members" className="btn btn-cancel">
                    <i className="fas fa-times"></i> Cancel
                </Link>
            </div>

            {error && <div className="form-error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="add-member-form">
                <div className="form-section">
                    <h3>Basic Information</h3>
                    <div className="form-grid-col-2">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name *</label>
                            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name *</label>
                            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="middleName">Middle Name/Initial</label>
                            <input type="text" id="middleName" name="middleName" value={formData.middleName} onChange={handleChange} />
                        </div>
                      
                    </div>
                </div>

                <div className="form-section">
                    <h3>Contact Information</h3>
                    <div className="form-grid-col-2">
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneMobile">Mobile Phone</label>
                            <input type="tel" id="phoneMobile" name="phoneMobile" value={formData.phoneMobile} onChange={handleChange} />
                        </div>
                         <div className="form-group">
                            <label htmlFor="phoneHome">Home Phone</label>
                            <input type="tel" id="phoneHome" name="phoneHome" value={formData.phoneHome} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group"> {/* Address fields usually span full width or have more complex grid */}
                        <label htmlFor="addressStreet">Street Address</label>
                        <input type="text" id="addressStreet" name="addressStreet" value={formData.addressStreet} onChange={handleChange} />
                    </div>
                    <div className="form-grid-col-3">
                        <div className="form-group">
                            <label htmlFor="addressCity">City</label>
                            <input type="text" id="addressCity" name="addressCity" value={formData.addressCity} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="addressState">State/Province</label>
                            <input type="text" id="addressState" name="addressState" value={formData.addressState} onChange={handleChange} />
                        </div>
                       
                    </div>
                </div>


                <div className="form-section">
                    <h3>Personal & Church Details</h3>
                     <div className="form-grid-col-2">
                        <div className="form-group">
                            <label htmlFor="birthDate">Birth Date</label>
                            <input type="date" id="birthDate" name="birthDate" value={formData.birthDate} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                                <option value="">Select...</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                               
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="maritalStatus">Marital Status</label>
                            <select id="maritalStatus" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
                                <option value="">Select...</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Widowed">Widowed</option>
                            </select>
                        </div>
                         <div className="form-group">
                            <label htmlFor="joinDate">Join Date</label>
                            <input type="date" id="joinDate" name="joinDate" value={formData.joinDate} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="membershipStatus">Membership Status</label>
                            <select id="membershipStatus" name="membershipStatus" value={formData.membershipStatus} onChange={handleChange}>
                                <option value="Visitor">Visitor</option>
                                <option value="Believer">Believer</option>
                                <option value="Elder">Elder</option>
                                <option value="Deacon">Deacon</option>
                                <option value="Child">Child (Non-Member)</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Notes</h3>
                    <div className="form-group">
                        <label htmlFor="notes">Additional Notes</label>
                        <textarea id="notes" name="notes" rows="4" value={formData.notes} onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-submit-member" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save New Member'}
                    </button>
                    <Link to="/dashboard/members" className="btn btn-cancel-inline">Cancel</Link>
                </div>
            </form>
        </div>
    );
};

export default AddMemberPage;