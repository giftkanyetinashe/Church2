import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

// Optional: import './EventDetailsPage.css'; // Create this if you need specific styles

// Use the same mock data structure as EventsPage for consistency
// In a real app, you'd fetch this specific event by ID
const initialEvents = [
    { id: 'evt001', title: "Soul Winning", date: "2024-07-20", time: "12:00 PM - 4:00 PM", location: "City Park Pavilion", description: "Short desc...", fullDescription: "Join us for our Annual Church Picnic! Fun for the whole family...", category: 'Church-Wide', contactName: 'Sarah Miller', contactEmail: 'sarah.m@example.com', needsRegistration: true, isRegistrationOpen: true, isFull: false, registrationEndDate: "2024-07-18T23:59:00", capacity: 150, currentRegistrations: 75, fee: 0, eventImageURL: 'https://via.placeholder.com/600x200?text=Picnic+Fun' },
    { id: 'evt002', title: "Youth Summer Camp", date: "2024-08-05", time: "Drop-off 9 AM (Aug 5) - Pick-up 3 PM (Aug 9)", location: "Mountain View Camp", description: "Short desc...", fullDescription: "Our Youth Summer Camp is packed with adventure...", category: 'Youth Ministry', contactName: 'Pastor Dave', contactEmail: 'dave.y@example.com', needsRegistration: true, isRegistrationOpen: true, isFull: false, registrationEndDate: "2024-07-30T23:59:00", capacity: 50, currentRegistrations: 25, fee: 150.00, eventImageURL: 'https://via.placeholder.com/600x200?text=Youth+Camp' },
    { id: 'evt003', title: "Worship Night", date: "2024-07-28", time: "7:00 PM", location: "Main Sanctuary", description: "Short desc...", fullDescription: "A special night dedicated to worship...", category: 'Worship', needsRegistration: false, eventImageURL: 'https://via.placeholder.com/600x200?text=Worship+Night' },
    { id: 'evt004', title: "Sold Out Workshop", date: "2024-09-01", time: "10:00 AM", location: "Room 101", description: "This popular workshop is currently full.", fullDescription: "This workshop on [Topic] filled up quickly! We hope to offer it again in the future. Please check back for updates.", category: 'Workshop', needsRegistration: true, isRegistrationOpen: true, isFull: true, registrationEndDate: "2024-08-28T23:59:00", capacity: 20, currentRegistrations: 20, fee: 10.00 },
];

const EventDetailsPage = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        // Simulate API call to fetch specific event
        setTimeout(() => {
            const foundEvent = initialEvents.find(e => e.id === eventId);
            setEvent(foundEvent);
            setIsLoading(false);
        }, 300);
    }, [eventId]);

    const formatDate = (dateString) => { // Replicated for consistency
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    if (isLoading) {
        return <div className="portal-page-container event-details-loading"><p>Loading event details...</p></div>;
    }

    if (!event) {
        return (
            <div className="portal-page-container event-details-not-found">
                <h1>Event Not Found</h1>
                <p>The event you are looking for could not be found.</p>
                <Link to="/portal/events" className="btn-portal btn-portal-secondary">Back to Events</Link>
            </div>
        );
    }

    const canRegister = event.needsRegistration &&
                        event.isRegistrationOpen &&
                        !event.isFull &&
                        new Date(event.registrationEndDate) >= new Date();
    const registrationClosedOrNotOpen = event.needsRegistration && (!event.isRegistrationOpen || new Date(event.registrationEndDate) < new Date());


    return (
        <div className="portal-page-container event-details-page"> {/* Style .event-details-page */}
            {event.eventImageURL && (
                <img src={event.eventImageURL} alt={event.title} className="event-details-banner" />
            )}
            <h1>{event.title}</h1>

            <div className="event-meta-info"> {/* Style .event-meta-info */}
                <p><i className="fas fa-calendar-alt"></i> <strong>Date:</strong> {formatDate(event.date)}</p>
                <p><i className="fas fa-clock"></i> <strong>Time:</strong> {event.time}</p>
                <p><i className="fas fa-map-marker-alt"></i> <strong>Location:</strong> {event.location}</p>
                {event.category && <p><i className="fas fa-tag"></i> <strong>Category:</strong> {event.category}</p>}
            </div>

            <div className="event-description-section"> {/* Style .event-description-section */}
                <h3>About This Event</h3>
                <p className="full-description" style={{ whiteSpace: 'pre-wrap' }}>{event.fullDescription || event.description}</p>
            </div>

            {event.needsRegistration && (
                <div className="event-registration-actions-details"> {/* Style this section */}
                    <h3>Registration</h3>
                    {canRegister && (
                        <>
                            <p>Registration is open for this event.</p>
                            {event.capacity && <p>Spaces available: {event.capacity - event.currentRegistrations} / {event.capacity}</p>}
                            {event.fee > 0 && <p><strong>Fee:</strong> ${event.fee.toFixed(2)} per person</p>}
                            <Link to={`/portal/events/register/${event.id}`} className="btn-portal btn-portal-primary btn-lg">
                                <i className="fas fa-edit"></i> Register Now
                            </Link>
                        </>
                    )}
                    {event.isFull && (
                        <p className="registration-status-message registration-full">This event is currently full.</p>
                    )}
                    {registrationClosedOrNotOpen && !event.isFull && (
                        <p className="registration-status-message">Registration for this event is closed or has not yet opened.</p>
                    )}
                </div>
            )}

            {(event.contactName || event.contactEmail) && (
                <div className="event-contact-info"> {/* Style .event-contact-info */}
                    <h3>Questions?</h3>
                    <p>Contact {event.contactName || 'the event organizer'}
                        {event.contactEmail && <> via email at <a href={`mailto:${event.contactEmail}`}>{event.contactEmail}</a></>}.
                    </p>
                </div>
            )}

            <div className="event-details-nav-actions" style={{ marginTop: '30px' }}>
                <button onClick={() => navigate(-1)} className="btn-portal btn-portal-secondary">
                    <i className="fas fa-arrow-left"></i> Back
                </button>
            </div>
        </div>
    );
};

export default EventDetailsPage;