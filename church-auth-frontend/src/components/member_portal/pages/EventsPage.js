import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../BackButton';

// --- Move initialEvents outside the component ---
const initialEventsData = [
    {
        id: 'evt001',
        title: "Community Picnic",
        date: "2024-07-20",
        time: "12:00 PM - 4:00 PM",
        location: "City Park Pavilion",
        description: "Join us for fun, food, and fellowship at the annual church picnic!",
        fullDescription: "Join us for our Annual Church Picnic! Fun for the whole family with games, food, and fellowship. Please bring a dish to share (last names A-M: Salads/Sides, N-Z: Desserts). The church will provide hot dogs, burgers, and drinks. We can't wait to see you there!",
        category: 'Church-Wide',
        contactName: 'Sarah Miller',
        contactEmail: 'sarah.m@example.com',
        needsRegistration: true,
        isRegistrationOpen: true,
        isFull: false,
        registrationEndDate: "2024-07-18T23:59:00",
        capacity: 150,
        currentRegistrations: 75,
        fee: 0,
        eventImageURL: 'https://via.placeholder.com/600x200?text=Picnic+Fun'
    },
    {
        id: 'evt002',
        title: "Youth Summer Camp",
        date: "2024-08-05",
        time: "Drop-off 9 AM (Aug 5) - Pick-up 3 PM (Aug 9)",
        location: "Mountain View Camp",
        description: "An exciting week of activities, learning, and growth for our youth (Grades 6-12).",
        fullDescription: "Our Youth Summer Camp is packed with adventure, inspiring messages, worship, and opportunities to build lasting friendships. Campers will enjoy outdoor activities, team challenges, and engaging sessions designed to deepen their faith. All meals and lodging included.",
        category: 'Youth Ministry',
        contactName: 'Pastor Dave',
        contactEmail: 'dave.y@example.com',
        needsRegistration: true,
        isRegistrationOpen: true,
        isFull: false,
        registrationEndDate: "2024-07-30T23:59:00",
        capacity: 50,
        currentRegistrations: 25,
        fee: 150.00,
        eventImageURL: 'https://via.placeholder.com/600x200?text=Youth+Camp'
    },
    {
        id: 'evt003',
        title: "Worship Night",
        date: "2024-07-28",
        time: "7:00 PM",
        location: "Main Sanctuary",
        description: "Join us for an uplifting evening of worship and prayer.",
        fullDescription: "A special night dedicated to worship, prayer, and seeking God's presence together as a church family. Childcare will be provided for ages 0-5. All are welcome, no registration required.",
        category: 'Worship',
        needsRegistration: false,
        eventImageURL: 'https://via.placeholder.com/600x200?text=Worship+Night'
    },
    {
        id: 'evt004',
        title: "Registration Full Event",
        date: "2024-09-01",
        time: "10:00 AM",
        location: "Room 101",
        description: "This popular workshop is currently full.",
        fullDescription: "This workshop on [Topic] filled up quickly! We hope to offer it again in the future. Please check back for updates.",
        category: 'Workshop',
        needsRegistration: true,
        isRegistrationOpen: true,
        isFull: true,
        registrationEndDate: "2024-08-28T23:59:00",
        capacity: 20,
        currentRegistrations: 20,
        fee: 10.00,
    },
];

const EventsPage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Now useEffect doesn't depend on a variable from its own scope for this
        setEvents(initialEventsData);
    }, []); // Empty dependency array is now correct for this initialization

    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            return new Date(dateString).toLocaleDateString(undefined, {
                year: 'numeric', month: 'long', day: 'numeric'
            });
        } catch (e) {
            return dateString; // Fallback if date is not standard
        }
    };

    return (
        <div className="portal-page-container">
            <BackButton to="/portal">Back</BackButton>
            <h1>Upcoming Events</h1>
            <p>Find out what's happening and how you can get involved.</p>
            {events.length > 0 ? (
                <div className="card-list">
                    {events.map(event => {
                        const canRegister = event.needsRegistration &&
                                            event.isRegistrationOpen &&
                                            !event.isFull &&
                                            new Date(event.registrationEndDate) >= new Date();
                        const registrationClosedOrNotOpen = event.needsRegistration && (!event.isRegistrationOpen || new Date(event.registrationEndDate) < new Date());

                        return (
                            <div key={event.id} className="card-item">
                                <h3>{event.title}</h3>
                                <p><strong>Date:</strong> {formatDate(event.date)}</p>
                                <p><strong>Time:</strong> {event.time}</p>
                                <p><strong>Location:</strong> {event.location}</p>
                                <p className="event-short-description">{event.description}</p>
                                <div className="event-item-actions">
                                    <Link to={`/portal/events/details/${event.id}`} className="btn-portal btn-portal-secondary">
                                        <i className="fas fa-info-circle" style={{marginRight: '5px'}}></i> View Details
                                    </Link>
                                    {event.needsRegistration && canRegister && (
                                        <Link to={`/portal/events/register/${event.id}`} className="btn-portal btn-portal-primary">
                                            <i className="fas fa-edit" style={{marginRight: '5px'}}></i> Register Now
                                        </Link>
                                    )}
                                    {event.needsRegistration && event.isFull && !canRegister && (
                                        <button className="btn-portal btn-portal-disabled" disabled>
                                            Registration Full
                                        </button>
                                    )}
                                    {event.needsRegistration && registrationClosedOrNotOpen && !event.isFull && (
                                        <button className="btn-portal btn-portal-disabled" disabled>
                                            Registration Closed
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>No upcoming events posted at this time.</p>
            )}
        </div>
    );
};

export default EventsPage;