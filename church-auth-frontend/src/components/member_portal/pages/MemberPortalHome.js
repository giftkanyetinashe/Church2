// src/components/member_portal/pages/MemberPortalHome.js
import React from 'react';
import { Link } from 'react-router-dom';
import './MemberPortalHome.css'; // We'll create a dedicated CSS file for this page

// Mock Data - In a real app, this would come from an API call based on the logged-in user
const memberData = {
    upcomingEvent: {
        name: "Annual Church Picnic",
        date: "2023-10-28",
        time: "11:00 AM",
        location: "City Park, Pavilion 3",
        isRegistered: true,
        id: 'evt001'
    },
    upcomingGroupMeeting: {
        name: "Men's Breakfast Study",
        date: "2023-10-21",
        time: "8:00 AM",
        location: "Fellowship Hall",
        id: 'grp001'
    },
    recentGiving: {
        lastAmount: 100.00,
        lastDate: "2023-10-01",
        ytdTotal: 1250.00,
        pledgeGoal: 2000.00
    },
    recentAnnouncements: [
        { id: 1, title: "Youth Winter Camp sign-ups are now open!", link: "/portal/events/evt005" },
        { id: 2, title: "New sermon series 'Foundations' starting this Sunday.", link: "#" }
    ]
};

const MemberPortalHome = () => {

    const givingProgress = memberData.recentGiving.ytdTotal / memberData.recentGiving.pledgeGoal * 100;

    return (
        <div className="portal-home-container">
            {/* Page title is often handled by the layout or could be here */}
            <h1>My Dashboard</h1>

            <div className="dashboard-grid">
                {/* --- Quick Actions Card --- */}
                <div className="dashboard-card quick-actions-card">
                    <h2>Quick Actions</h2>
                    <div className="quick-actions-buttons">
                        <Link to="/portal/giving/donate" className="btn-portal btn-portal-success">
                            <i className="fas fa-hand-holding-dollar"></i> Give Now
                        </Link>
                        <Link to="/portal/events" className="btn-portal">
                            <i className="fas fa-calendar-alt"></i> Find an Event
                        </Link>
                         <Link to="/portal/groups" className="btn-portal">
                            <i className="fas fa-users"></i> Find a Group
                        </Link>
                        <Link to="/portal/giving" className="btn-portal btn-portal-secondary">
                            <i className="fas fa-receipt"></i> Giving Statement
                        </Link>
                    </div>
                </div>

                {/* --- Upcoming Engagements Card --- */}
                <div className="dashboard-card upcoming-engagements-card">
                    <h2>Your Next Steps</h2>
                    {memberData.upcomingEvent && (
                        <div className="engagement-item">
                            <i className="fas fa-calendar-check icon-event"></i>
                            <div>
                                <strong>Upcoming Event:</strong>
                                <p><Link to={`/portal/events/${memberData.upcomingEvent.id}`}>{memberData.upcomingEvent.name}</Link></p>
                                <small>{new Date(memberData.upcomingEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} @ {memberData.upcomingEvent.time}</small>
                            </div>
                        </div>
                    )}
                     {memberData.upcomingGroupMeeting && (
                        <div className="engagement-item">
                            <i className="fas fa-user-friends icon-group"></i>
                            <div>
                                <strong>Next Group Meeting:</strong>
                                <p><Link to={`/portal/groups/${memberData.upcomingGroupMeeting.id}`}>{memberData.upcomingGroupMeeting.name}</Link></p>
                                <small>{new Date(memberData.upcomingGroupMeeting.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} @ {memberData.upcomingGroupMeeting.time}</small>
                            </div>
                        </div>
                    )}
                    {!memberData.upcomingEvent && !memberData.upcomingGroupMeeting && (
                        <p>You have no upcoming registered events or group meetings. <Link to="/portal/events">Find an event to join!</Link></p>
                    )}
                </div>

                {/* --- Giving Snapshot Card --- */}
                <div className="dashboard-card giving-snapshot-card">
                    <h2>Giving Snapshot</h2>
                    <div className="giving-details">
                        <p>Last gift of <strong>${memberData.recentGiving.lastAmount.toFixed(2)}</strong> on {new Date(memberData.recentGiving.lastDate).toLocaleDateString()}</p>
                        <div className="giving-progress">
                            <label htmlFor="giving-bar">Yearly Giving Progress</label>
                            <div className="progress-bar-container">
                                <div className="progress-bar-fill" style={{ width: `${givingProgress > 100 ? 100 : givingProgress}%` }}></div>
                            </div>
                            <div className="progress-bar-text">
                                <span>${memberData.recentGiving.ytdTotal.toFixed(2)}</span>
                                <span>Goal: ${memberData.recentGiving.pledgeGoal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Announcements Card --- */}
                <div className="dashboard-card announcements-card">
                    <h2>Announcements</h2>
                    <ul className="announcements-list">
                        {memberData.recentAnnouncements.map(ann => (
                            <li key={ann.id}>
                                <Link to={ann.link}>{ann.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default MemberPortalHome;