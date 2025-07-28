import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
// Optional: import './EventRegisterPage.css'; // Create this if you need specific styles

// Use the same mock data structure as EventsPage
const initialEvents = [
    { id: 'evt001', title: "Soul Winning", date: "2024-07-20", needsRegistration: true, isRegistrationOpen: true, isFull: false, registrationEndDate: "2024-07-18T23:59:00", capacity: 150, currentRegistrations: 75, fee: 0 },
    { id: 'evt002', title: "Youth Summer Camp", date: "2024-08-05", needsRegistration: true, isRegistrationOpen: true, isFull: false, registrationEndDate: "2024-07-30T23:59:00", capacity: 50, currentRegistrations: 25, fee: 150.00 },
];
// Mock logged-in user (in real app, from auth context)
const mockLoggedInUser = { userId: 'u123', name: 'Test User', email: 'test.user@example.com' };

const EventRegisterPage = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [isLoadingEvent, setIsLoadingEvent] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        numberOfAttendees: 1,
        phone: '', // Optional
        notes: '',   // Optional
    });

    useEffect(() => {
        setIsLoadingEvent(true);
        // Simulate fetching event data
        setTimeout(() => {
            const foundEvent = initialEvents.find(e => e.id === eventId);
            setEvent(foundEvent);
            // Pre-fill form with logged-in user's data (if available)
            if (mockLoggedInUser) {
                setFormData(prev => ({
                    ...prev,
                    name: mockLoggedInUser.name || '',
                    email: mockLoggedInUser.email || '',
                }));
            }
            setIsLoadingEvent(false);
        }, 300);
    }, [eventId]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? (parseInt(value, 10) || 1) : value, // Ensure number for attendees
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!event) {
            setError("Event details could not be loaded. Please try again.");
            return;
        }

        // Validations
        if (!formData.name.trim() || !formData.email.trim()) {
            setError("Name and Email are required.");
            return;
        }
        if (formData.numberOfAttendees < 1) {
            setError("Number of attendees must be at least 1.");
            return;
        }
        const remainingCapacity = event.capacity ? event.capacity - event.currentRegistrations : Infinity;
        if (formData.numberOfAttendees > remainingCapacity) {
            setError(`Cannot register ${formData.numberOfAttendees} attendees. Only ${remainingCapacity} spot(s) remaining.`);
            return;
        }


        setIsSubmitting(true);
        console.log("Submitting registration for event:", eventId, "Data:", formData);

        // Simulate API call for registration
        setTimeout(() => {
            // In a real app, update event.currentRegistrations in your data source
            alert(`Successfully registered ${formData.numberOfAttendees} attendee(s) for "${event.title}" (mock)!`);
            setIsSubmitting(false);
            navigate(`/portal/events/details/${eventId}`); // Or a "Thank You" page
        }, 1500);
    };

    if (isLoadingEvent) {
        return <div className="portal-page-container event-register-loading"><p>Loading event registration form...</p></div>;
    }

    if (!event) {
        return (
            <div className="portal-page-container event-register-not-found">
                <h1>Event Not Found</h1>
                <p>Cannot register for an event that doesn't exist or is no longer available.</p>
                <Link to="/portal/events" className="btn-portal btn-portal-secondary">Back to Events</Link>
            </div>
        );
    }

    const canRegister = event.needsRegistration &&
                        event.isRegistrationOpen &&
                        !event.isFull &&
                        new Date(event.registrationEndDate) >= new Date();

    if (!canRegister) {
         return (
            <div className="portal-page-container">
                <h1>Registration Not Available</h1>
                <p>
                    {event.isFull ? "Registration for this event is currently full." : "Registration for this event is not currently open or has ended."}
                </p>
                <Link to={`/portal/events/details/${eventId}`} className="btn-portal btn-portal-secondary">View Event Details</Link>
            </div>
        );
    }


    return (
        <div className="portal-page-container event-register-page"> {/* Style .event-register-page */}
            <h1>Register for: {event.title}</h1>
            <p className="event-date-time-reg"> {/* Style .event-date-time-reg */}
                {formatDate(event.date)}
                {event.time && ` at ${event.time}`}
            </p>

            {error && <div className="form-error-message portal-error">{error}</div>} {/* Style .portal-error */}

            <form onSubmit={handleSubmit} className="portal-form"> {/* Style .portal-form and .form-group */}
                <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number (Optional)</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="numberOfAttendees">Number of People Attending (including yourself) *</label>
                    <input type="number" id="numberOfAttendees" name="numberOfAttendees" min="1" value={formData.numberOfAttendees} onChange={handleChange} required />
                </div>

                {event.fee > 0 && (
                    <div className="event-fee-info"> {/* Style .event-fee-info */}
                        <p><strong>Event Fee:</strong> ${event.fee.toFixed(2)} per attendee.</p>
                        <p><strong>Total Amount Due:</strong> ${(event.fee * formData.numberOfAttendees).toFixed(2)}</p>
                        <small>(In a real application, payment processing would follow.)</small>
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="notes">Notes or Special Requests (Optional)</label>
                    <textarea id="notes" name="notes" rows="3" value={formData.notes} onChange={handleChange}></textarea>
                </div>

                <div className="form-actions" style={{ marginTop: '20px' }}> {/* Style .form-actions */}
                    <button type="submit" className="btn-portal btn-portal-primary btn-lg" disabled={isSubmitting}>
                        {isSubmitting ? 'Processing...' : 'Complete Registration'}
                    </button>
                    <Link to={`/portal/events/details/${eventId}`} className="btn-portal btn-portal-secondary" style={{marginLeft: '10px'}}>
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
};
// Helper (can be moved to a utils file)
const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric', month: 'long', day: 'numeric'
    });
};

export default EventRegisterPage;