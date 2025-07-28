import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddGroupPage.css'; // Updated CSS import name

const AddGroupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        groupName: '',
        description: '',
        groupType: '',
        leaderNames: '',
        meetingDay: '',
        meetingTime: '',
        meetingFrequency: 'Weekly',
        meetingLocation: '',
        membershipType: 'Open',
        maxCapacity: '',
        childcareAvailable: 'No',
        groupImageURL: '',
        isActive: true,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (!formData.groupName.trim()) {
            setError('Group Name is required.');
            setIsLoading(false);
            return;
        }
        if (!formData.groupType) {
            setError('Group Type is required.');
            setIsLoading(false);
            return;
        }

        console.log('Submitting New Group Data:', formData);

        // --- Simulate API Call to Add Group ---
        // Replace with actual API call to Django backend later
        setTimeout(() => {
            alert(`Group "${formData.groupName}" added successfully (mock)!`);
            setIsLoading(false);
            navigate('/dashboard/groups'); // Navigate back to the groups list
        }, 1000);
    };

    return (
        <div className="add-group-page-container"> {/* Class name remains for consistency in CSS */}
            <div className="page-header-controls">
                <h2>Add New Group</h2>
                <Link to="/dashboard/groups" className="btn btn-cancel">
                    <i className="fas fa-times"></i> Cancel
                </Link>
            </div>

            {error && <div className="form-error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="add-group-form"> {/* Class name remains */}
                <div className="form-section">
                    <h3>Group Details</h3>
                    <div className="form-grid-col-1">
                        <div className="form-group">
                            <label htmlFor="groupName">Group Name *</label>
                            <input type="text" id="groupName" name="groupName" value={formData.groupName} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-grid-col-2">
                        <div className="form-group">
                            <label htmlFor="groupType">Group Type/Category *</label>
                            <select id="groupType" name="groupType" value={formData.groupType} onChange={handleChange} required>
                                <option value="">Select Type...</option>
                                <option value="Intercession">Intercession</option>
                                <option value="Praise and Worship">Praise and Worship</option>
                                <option value="Ministry Team">Ministry Team</option>
                                <option value="Class/Study">Class/Study</option>
                                <option value="Support Group">Support Group</option>
                                <option value="Interest Group">Interest Group</option>
                                <option value="Service Team">Service Team</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="leaderNames">Leader(s)</label>
                            <input type="text" id="leaderNames" name="leaderNames" placeholder="e.g., John Doe, Jane Smith" value={formData.leaderNames} onChange={handleChange} />
                            <small>Enter names separated by commas.</small>
                        </div>
                    </div>
                     <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Meeting Information</h3>
                    <div className="form-grid-col-3">
                        <div className="form-group">
                            <label htmlFor="meetingDay">Meeting Day</label>
                            <select id="meetingDay" name="meetingDay" value={formData.meetingDay} onChange={handleChange}>
                                <option value="">Select Day...</option>
                                <option value="Sunday">Sunday</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Varies">Varies</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="meetingTime">Meeting Time</label>
                            <input type="time" id="meetingTime" name="meetingTime" value={formData.meetingTime} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="meetingFrequency">Frequency</label>
                            <select id="meetingFrequency" name="meetingFrequency" value={formData.meetingFrequency} onChange={handleChange}>
                                <option value="Weekly">Weekly</option>
                                <option value="Bi-Weekly">Bi-Weekly (Every 2 Weeks)</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Twice a Month">Twice a Month</option>
                                <option value="Varies">Varies</option>
                            </select>
                        </div>
                    </div>
                     <div className="form-group">
                        <label htmlFor="meetingLocation">Meeting Location</label>
                        <input type="text" id="meetingLocation" name="meetingLocation" placeholder="e.g., Church Room 101, Online, Host's Home" value={formData.meetingLocation} onChange={handleChange} />
                    </div>
                </div>

                <div className="form-section">
                    <h3>Membership & Logistics</h3>
                    <div className="form-grid-col-3">
                        <div className="form-group">
                            <label htmlFor="membershipType">Membership Type</label>
                            <select id="membershipType" name="membershipType" value={formData.membershipType} onChange={handleChange}>
                                <option value="Open">Open (Anyone can join)</option>
                                <option value="ApprovalRequired">Approval Required</option>
                                <option value="Closed">Closed (Invite Only)</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="maxCapacity">Max Capacity (Optional)</label>
                            <input type="number" id="maxCapacity" name="maxCapacity" min="0" placeholder="e.g., 12" value={formData.maxCapacity} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="childcareAvailable">Childcare Provided?</label>
                            <select id="childcareAvailable" name="childcareAvailable" value={formData.childcareAvailable} onChange={handleChange}>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                                <option value="UponRequest">Upon Request</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Optional</h3>
                     <div className="form-grid-col-2">
                        <div className="form-group">
                            <label htmlFor="groupImageURL">Group Image URL (Optional)</label>
                            <input type="url" id="groupImageURL" name="groupImageURL" placeholder="https://example.com/image.jpg" value={formData.groupImageURL} onChange={handleChange} />
                        </div>
                        <div className="form-group form-group-checkbox">
                            <input type="checkbox" id="isActive" name="isActive" checked={formData.isActive} onChange={handleChange} />
                            <label htmlFor="isActive" className="checkbox-label">Group is Active</label>
                            <small>Uncheck if this group is currently not meeting or is on hold.</small>
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-submit-group" disabled={isLoading}>
                        {isLoading ? 'Adding Group...' : 'Add Group'}
                    </button>
                    <Link to="/dashboard/groups" className="btn btn-cancel-inline">Cancel</Link>
                </div>
            </form>
        </div>
    );
};

export default AddGroupPage;