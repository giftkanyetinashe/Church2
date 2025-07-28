// src/components/member_portal/pages/PrayerPage.js
import React, { useState, useEffect } from 'react';
import './PrayerPage.css'; 
import BackButton from '../BackButton';

// Mock Data - In a real app, this would come from an API
const mockPrayerRequests = [
    { id: 'p001', name: 'John D.', text: 'Please pray for my upcoming job interview this Wednesday. That it goes well and I can provide for my family.', isPublic: true, prayerCount: 15, date: '2023-10-25T10:00:00Z' },
    { id: 'p002', name: 'Anonymous', text: 'Prayers for my mother, who is undergoing surgery next week. For the surgeons hands and for a quick recovery.', isPublic: true, prayerCount: 22, date: '2023-10-24T15:30:00Z' },
    { id: 'p003', name: 'Sarah K.', text: 'Private family matter needing guidance and peace.', isPublic: false, prayerCount: 0, date: '2023-10-23T11:00:00Z' }, // This one won't be shown on the wall
    { id: 'p004', name: 'Maria G.', text: 'Praise report! My son has been accepted into college. Thank you all for your prayers!', isPublic: true, prayerCount: 8, date: '2023-10-22T09:00:00Z' }
];

const PrayerPage = () => {
    const [requests, setRequests] = useState([]);
    const [newRequestText, setNewRequestText] = useState('');
    const [submitterName, setSubmitterName] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [prayedForIds, setPrayedForIds] = useState([]); // Tracks what the user has prayed for

    useEffect(() => {
        // Simulate fetching data
        // Sorting to show newest requests first
        setRequests(mockPrayerRequests.sort((a, b) => new Date(b.date) - new Date(a.date)));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newRequestText.trim()) {
            alert('Please enter a prayer request.');
            return;
        }

        const newRequest = {
            id: `p${Date.now()}`,
            name: submitterName.trim() || 'Anonymous',
            text: newRequestText,
            isPublic: isPublic,
            prayerCount: 0,
            date: new Date().toISOString()
        };

        // Add new request to the top of the list
        setRequests(prevRequests => [newRequest, ...prevRequests]);

        // Reset form
        setNewRequestText('');
        setSubmitterName('');
        setIsPublic(true);

        alert('Your prayer request has been submitted. If it was marked private, it will only be visible to our pastoral staff.');
    };

    const handlePrayClick = (requestId) => {
        // Update the prayer count
        setRequests(prevRequests =>
            prevRequests.map(req =>
                req.id === requestId ? { ...req, prayerCount: req.prayerCount + 1 } : req
            )
        );
        // Mark this request as "prayed for" by this user to disable the button
        setPrayedForIds(prevIds => [...prevIds, requestId]);
    };

    const publicRequests = requests.filter(req => req.isPublic);

    return (
        <div className="portal-page-container prayer-page">
            <BackButton to="/portal">Back</BackButton>
            <h1>Prayer Wall & Requests</h1>
            <p className="prayer-intro-text">
                Share your needs with our community or submit a private request for our pastoral team.
            </p>

            {/* --- Submission Form Card --- */}
            <div className="prayer-form-card">
                <h2>Share a Prayer Request</h2>
                <form onSubmit={handleSubmit} className="prayer-form">
                    <div className="portal-form-group">
                        <label htmlFor="prayer-text">Your Request</label>
                        <textarea
                            id="prayer-text"
                            rows="4"
                            placeholder="Share what's on your heart..."
                            value={newRequestText}
                            onChange={(e) => setNewRequestText(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="form-row">
                        <div className="portal-form-group">
                            <label htmlFor="submitter-name">Your Name (optional)</label>
                            <input
                                type="text"
                                id="submitter-name"
                                placeholder="Leave blank for 'Anonymous'"
                                value={submitterName}
                                onChange={(e) => setSubmitterName(e.target.value)}
                            />
                        </div>
                        <div className="portal-form-group public-toggle">
                            <input
                                type="checkbox"
                                id="is-public"
                                checked={isPublic}
                                onChange={(e) => setIsPublic(e.target.checked)}
                            />
                            <label htmlFor="is-public">Make this request public?</label>
                            <small>If unchecked, only staff will see this request.</small>
                        </div>
                    </div>
                    <button type="submit" className="btn-portal btn-portal-success">
                        Submit Request
                    </button>
                </form>
            </div>

            {/* --- Prayer Wall Section --- */}
            <div className="prayer-wall">
                <h2>Community Prayers</h2>
                <div className="prayer-grid">
                    {publicRequests.map(req => (
                        <div key={req.id} className="prayer-card">
                            <p className="prayer-text">{req.text}</p>
                            <div className="prayer-card-footer">
                                <p className="prayer-submitter">- {req.name}</p>
                                <div className="prayer-actions">
                                    <span className="prayer-count" title={`${req.prayerCount} people have prayed for this`}>
                                        <i className="fas fa-hands-praying"></i> {req.prayerCount}
                                    </span>
                                    <button
                                        className="btn-pray"
                                        onClick={() => handlePrayClick(req.id)}
                                        disabled={prayedForIds.includes(req.id)}
                                    >
                                        <i className="fas fa-hand-holding-heart"></i> I Prayed
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PrayerPage;