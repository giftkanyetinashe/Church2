import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddEventPage.css'; // We'll create this CSS file

const AddEventPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        eventName: '',
        description: '',
        category: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        isAllDay: false,
        locationName: '', // e.g., "Main Sanctuary", "Online via Zoom"
        locationAddress: '', // Optional physical address
        eventImageURL: '',
        enableRegistration: false,
        registrationStartDate: '',
        registrationEndDate: '',
        capacity: '',
        eventFee: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        status: 'Draft', // Default to Draft
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // If 'All Day' is checked, clear end time or handle as needed
        if (name === 'isAllDay' && checked) {
            setFormData(prevData => ({ ...prevData, endTime: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Basic Validations
        if (!formData.eventName.trim()) {
            setError('Event Name is required.');
            setIsLoading(false);
            return;
        }
        if (!formData.category) {
            setError('Event Category is required.');
            setIsLoading(false);
            return;
        }
        if (!formData.startDate || !formData.startTime) {
            setError('Start Date and Start Time are required.');
            setIsLoading(false);
            return;
        }
        if (formData.enableRegistration && (!formData.registrationStartDate || !formData.registrationEndDate)) {
            setError('Registration Start and End Dates are required if registration is enabled.');
            setIsLoading(false);
            return;
        }


        console.log('Submitting New Event Data:', formData);

        // --- Simulate API Call to Add Event ---
        // Replace with actual API call to Django backend later
        setTimeout(() => {
            alert(`Event "${formData.eventName}" added successfully (mock)!`);
            setIsLoading(false);
            navigate('/dashboard/events'); // Navigate back to the events list
        }, 1000);
    };

    return (
        <div className="add-event-page-container">
            <div className="page-header-controls">
                <h2>Add New Event</h2>
                <Link to="/dashboard/events" className="btn btn-cancel">
                    <i className="fas fa-times"></i> Cancel
                </Link>
            </div>

            {error && <div className="form-error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="add-event-form">
                <div className="form-section">
                    <h3>Event Basics</h3>
                    <div className="form-group">
                        <label htmlFor="eventName">Event Name *</label>
                        <input type="text" id="eventName" name="eventName" value={formData.eventName} onChange={handleChange} required />
                    </div>
                    <div className="form-grid-col-2">
                        <div className="form-group">
                            <label htmlFor="category">Category *</label>
                            <select id="category" name="category" value={formData.category} onChange={handleChange} required>
                                <option value="">Select Category...</option>
                                <option value="Worship Service">Worship Service</option>
                                <option value="Small Group">Small Group Meeting</option>
                                <option value="Ministry Team">Ministry Team Meeting</option>
                                <option value="Class/Study">Class/Study</option>
                                <option value="Conference">Conference</option>
                                <option value="Outreach">Outreach Event</option>
                                <option value="Fellowship">Fellowship Event</option>
                                <option value="Youth Ministry">Youth Ministry</option>
                                <option value="Childrens Ministry">Children's Ministry</option>
                                <option value="Special Event">Special Event</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select id="status" name="status" value={formData.status} onChange={handleChange}>
                                <option value="Draft">Draft (Save but don't publish)</option>
                                <option value="Published">Published (Visible to members/public)</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" rows="5" value={formData.description} onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Date & Time</h3>
                    <div className="form-grid-col-2">
                        <div className="form-group">
                            <label htmlFor="startDate">Start Date *</label>
                            <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="startTime">Start Time *</label>
                            <input type="time" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-grid-col-2">
                        <div className="form-group">
                            <label htmlFor="endDate">End Date (Optional)</label>
                            <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} disabled={formData.isAllDay} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endTime">End Time (Optional)</label>
                            <input type="time" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} disabled={formData.isAllDay || !formData.endDate} />
                        </div>
                    </div>
                    <div className="form-group form-group-checkbox">
                        <input type="checkbox" id="isAllDay" name="isAllDay" checked={formData.isAllDay} onChange={handleChange} />
                        <label htmlFor="isAllDay" className="checkbox-label">All Day Event</label>
                        <small>If checked, only Start Date is required. End Date/Time will be ignored or set for the full day.</small>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Location</h3>
                    <div className="form-group">
                        <label htmlFor="locationName">Location Name/Platform</label>
                        <input type="text" id="locationName" name="locationName" placeholder="e.g., Main Sanctuary, Fellowship Hall, Online via Zoom" value={formData.locationName} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="locationAddress">Physical Address (If applicable)</label>
                        <input type="text" id="locationAddress" name="locationAddress" placeholder="e.g., 123 Church St, Anytown, ST 12345" value={formData.locationAddress} onChange={handleChange} />
                    </div>
                </div>

                <div className="form-section">
                    <h3>Registration (Optional)</h3>
                    <div className="form-group form-group-checkbox">
                        <input type="checkbox" id="enableRegistration" name="enableRegistration" checked={formData.enableRegistration} onChange={handleChange} />
                        <label htmlFor="enableRegistration" className="checkbox-label">Enable Online Registration</label>
                    </div>
                    {formData.enableRegistration && (
                        <>
                            <div className="form-grid-col-2">
                                <div className="form-group">
                                    <label htmlFor="registrationStartDate">Registration Starts *</label>
                                    <input type="datetime-local" id="registrationStartDate" name="registrationStartDate" value={formData.registrationStartDate} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="registrationEndDate">Registration Ends *</label>
                                    <input type="datetime-local" id="registrationEndDate" name="registrationEndDate" value={formData.registrationEndDate} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-grid-col-2">
                                <div className="form-group">
                                    <label htmlFor="capacity">Capacity Limit (Optional)</label>
                                    <input type="number" id="capacity" name="capacity" min="0" placeholder="e.g., 100" value={formData.capacity} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="eventFee">Event Fee (USD, Optional)</label>
                                    <input type="number" id="eventFee" name="eventFee" min="0" step="0.01" placeholder="e.g., 10.00" value={formData.eventFee} onChange={handleChange} />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                 <div className="form-section">
                    <h3>Contact & Optional Info</h3>
                    <div className="form-grid-col-3">
                        <div className="form-group">
                            <label htmlFor="contactName">Contact Person (Optional)</label>
                            <input type="text" id="contactName" name="contactName" value={formData.contactName} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contactEmail">Contact Email (Optional)</label>
                            <input type="email" id="contactEmail" name="contactEmail" value={formData.contactEmail} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contactPhone">Contact Phone (Optional)</label>
                            <input type="tel" id="contactPhone" name="contactPhone" value={formData.contactPhone} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="eventImageURL">Event Image URL (Optional)</label>
                        <input type="url" id="eventImageURL" name="eventImageURL" placeholder="https://example.com/event-banner.jpg" value={formData.eventImageURL} onChange={handleChange} />
                    </div>
                </div>


                <div className="form-actions">
                    <button type="submit" className="btn btn-submit-event" disabled={isLoading}>
                        {isLoading ? 'Adding Event...' : 'Add Event'}
                    </button>
                    <Link to="/dashboard/events" className="btn btn-cancel-inline">Cancel</Link>
                </div>
            </form>
        </div>
    );
};

export default AddEventPage;
