import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboardEventsPage.css'; // We'll create this specific CSS file

// Mock Data - In a real app, this would come from an API
const mockAdminEvents = [
    { id: 'e001', name: 'Annual Church Picnic', date: '2023-07-20', time: '12:00 PM - 4:00 PM', location: 'City Park Pavilion A', category: 'Church-Wide', status: 'Published', registrations: 75, capacity: 150 },
    { id: 'e002', name: 'Youth Summer Camp Registration', date: '2023-08-05', time: 'All Week (Aug 5-9)', location: 'Mountain View Camp', category: 'Youth Ministry', status: 'Published', registrations: 42, capacity: 50 },
    { id: 'e003', name: 'Leadership Training Seminar', date: '2023-09-10', time: '9:00 AM - 1:00 PM', location: 'Fellowship Hall', category: 'Leadership', status: 'Draft', registrations: 0, capacity: 30 },
    { id: 'e004', name: 'Worship Night', date: '2023-07-28', time: '7:00 PM', location: 'Main Sanctuary', category: 'Worship', status: 'Published', registrations: 120, capacity: 300 },
    { id: 'e005', name: 'New Members Class - Session 1', date: '2023-08-12', time: '10:00 AM - 11:30 AM', location: 'Room 101', category: 'Discipleship', status: 'Published', registrations: 12, capacity: 20 },
];

const AdminDashboardEventsPage = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setEvents(mockAdminEvents);
        }, 500);
    }, []);

    const categories = ['All', ...new Set(mockAdminEvents.map(event => event.category))];
    const statuses = ['All', ...new Set(mockAdminEvents.map(event => event.status))];

    const filteredEvents = events.filter(event => {
        const matchesSearchTerm = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  event.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || event.category === filterCategory;
        const matchesStatus = filterStatus === 'All' || event.status === filterStatus;
        return matchesSearchTerm && matchesCategory && matchesStatus;
    });

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };

    return (
        <div className="admin-events-page-container">
            <div className="page-header-controls">
                <h2>Manage Church Events</h2>
                <div className="action-and-filters">
                    <Link to="/dashboard/events/add" className="btn btn-add-event">
                        <i className="fas fa-plus"></i> Add New Event
                    </Link>
                </div>
            </div>

            <div className="filters-bar">
                 <input
                    type="text"
                    placeholder="Search events or locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input-events"
                />
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="filter-select-events"
                >
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="filter-select-events"
                >
                    {statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
                {/* Add Date Range Filter component here later if needed */}
            </div>


            {filteredEvents.length > 0 ? (
                <div className="admin-events-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Event Name</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Location</th>
                                <th>Category</th>
                                <th>Registrations</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEvents.map(event => (
                                <tr key={event.id}>
                                    <td>{event.name}</td>
                                    <td>{formatDate(event.date)}</td>
                                    <td>{event.time}</td>
                                    <td>{event.location}</td>
                                    <td>{event.category}</td>
                                    <td>{event.registrations} / {event.capacity || 'N/A'}</td>
                                    <td>
                                        <span className={`status-badge status-${event.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                            {event.status}
                                        </span>
                                    </td>
                                    <td className="actions-cell">
                                        <Link to={`/dashboard/events/view/${event.id}`} className="action-btn view-btn" title="View Details & Registrations">
                                            <i className="fas fa-eye"></i>
                                        </Link>
                                        <Link to={`/dashboard/events/edit/${event.id}`} className="action-btn edit-btn" title="Edit Event">
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                        <button onClick={() => alert(`Simulate deleting event ${event.name}`)} className="action-btn delete-btn" title="Delete Event">
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="no-data-message">No events found{ (searchTerm || filterCategory !== 'All' || filterStatus !== 'All') && ' matching your criteria'}.</p>
            )}
        </div>
    );
};

export default AdminDashboardEventsPage;