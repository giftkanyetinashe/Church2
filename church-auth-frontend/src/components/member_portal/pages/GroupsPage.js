import React, { useState, useEffect } from 'react'; // Added useState, useEffect
import { Link } from 'react-router-dom';
import BackButton from '../BackButton';
// Optional: import './GroupsPage.css'; if you create specific styles

// Enhanced mock data
const initialPortalGroups = [
    {
        id: 'g001', // Use string IDs
        name: "Men's Bible Study",
        schedule: "Tuesdays at 7:00 PM",
        meetingFrequency: "Weekly",
        location: "Church Fellowship Hall",
        leader: "John P. & Mark L.",
        contactEmail: "mensgroup@example.com",
        description: "A weekly study for men to grow in faith and fellowship through scripture and discussion.",
        longDescription: "Dive deep into the Word of God with fellow brothers in Christ. Our Men's Bible Study meets weekly to explore biblical truths, discuss their application to daily life, and support one another in prayer and accountability. Whether you're new to Bible study or have been studying for years, you're welcome here.",
        category: "Bible Study",
        targetAudience: "Men",
        childcareAvailable: false,
        isAcceptingNewMembers: true,
        groupImageURL: "https://via.placeholder.com/600x200?text=Men's+Study"
    },
    {
        id: 'g002',
        name: "Women's Connect Group",
        schedule: "Wednesdays at 10:00 AM",
        meetingFrequency: "Weekly",
        location: "Room 201 (Childcare in Nursery)",
        leader: "Jane S. & Sarah K.",
        contactEmail: "womensconnect@example.com",
        description: "Connect with other women for support, prayer, and study in a welcoming environment.",
        longDescription: "This group provides a safe and nurturing space for women of all ages to connect, share life, study God's Word, and pray for one another. We aim to build strong relationships and encourage each other on our faith journeys. Childcare is provided.",
        category: "Connect Group",
        targetAudience: "Women",
        childcareAvailable: true,
        isAcceptingNewMembers: true,
        groupImageURL: "https://via.placeholder.com/600x200?text=Women's+Connect"
    },
    {
        id: 'g003',
        name: "Young Adults Hangout",
        schedule: "Fridays at 7:30 PM (Bi-Weekly)",
        meetingFrequency: "Bi-Weekly",
        location: "Varies (Check weekly email)",
        leader: "Mike B.",
        contactEmail: "youngadults@example.com",
        description: "A casual group for young adults (18-30) to hang out, build community, and discuss life and faith.",
        longDescription: "Looking to connect with other young adults? Join us for our bi-weekly hangouts! Activities vary from game nights and movie discussions to service projects and topical studies. It's a great way to make friends and grow together.",
        category: "Social Group",
        targetAudience: "Young Adults (18-30)",
        childcareAvailable: false,
        isAcceptingNewMembers: true,
    },
    {
        id: 'g004',
        name: "Alpha Course (Full)",
        schedule: "Mondays at 6:30 PM",
        meetingFrequency: "Weekly (10 weeks)",
        location: "Online via Zoom",
        leader: "Pastor Lee",
        description: "Explore the basics of the Christian faith. This session is currently full.",
        longDescription: "The Alpha Course is an opportunity for anyone to explore the Christian faith in a relaxed, non-judgmental setting. Each session involves a meal (virtual for online), a short talk, and small group discussion. This particular session is full, but please check for future course dates.",
        category: "Discipleship Course",
        targetAudience: "Anyone exploring faith",
        childcareAvailable: false,
        isAcceptingNewMembers: false, // Group is full or not accepting new members
    }
];


const GroupsPage = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        // In a real app, fetch groups data
        setGroups(initialPortalGroups);
    }, []);

    return (
        <div className="portal-page-container">
            <BackButton to="/portal">Back</BackButton>
            <h1>Connect Groups</h1>
            <p>Find a group to grow with, serve alongside, and do life together.</p>
            {groups.length > 0 ? (
                <div className="card-list"> {/* Ensure .card-list is styled */}
                    {groups.map(group => (
                        <div key={group.id} className="card-item"> {/* Ensure .card-item is styled */}
                            <h3>{group.name}</h3>
                            <p><strong>Schedule:</strong> {group.schedule}</p>
                            <p><strong>Leader(s):</strong> {group.leader}</p>
                            <p className="group-short-description">{group.description}</p> {/* Style .group-short-description */}
                            <div className="group-item-actions"> {/* Style .group-item-actions */}
                                <Link to={`/portal/groups/details/${group.id}`} className="btn-portal btn-portal-secondary">
                                   <i className="fas fa-info-circle" style={{marginRight: '5px'}}></i> Learn More
                                </Link>
                                {group.isAcceptingNewMembers && (
                                     <Link to={`/portal/groups/join/${group.id}`} className="btn-portal btn-portal-primary">
                                        <i className="fas fa-user-plus" style={{marginRight: '5px'}}></i> Request to Join
                                     </Link>
                                )}
                                {!group.isAcceptingNewMembers && (
                                    <button className="btn-portal btn-portal-disabled" disabled>
                                        Currently Full / Closed
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No groups available at this time. Check back soon!</p>
            )}
        </div>
    );
};
export default GroupsPage;