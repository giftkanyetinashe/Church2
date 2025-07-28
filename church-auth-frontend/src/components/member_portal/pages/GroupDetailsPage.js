import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
// Optional: import './GroupDetailsPage.css'; // Create this CSS file

// Use the same mock data structure as GroupsPage.js for consistency
const initialPortalGroups = [
    { id: 'g001', name: "Men's Bible Study", schedule: "Tuesdays at 7:00 PM", meetingFrequency: "Weekly", location: "Church Fellowship Hall", leader: "John P. & Mark L.", contactEmail: "mensgroup@example.com", description: "Short desc...", longDescription: "Dive deep into the Word of God...", category: "Bible Study", targetAudience: "Men", childcareAvailable: false, isAcceptingNewMembers: true, groupImageURL: "https://via.placeholder.com/600x200?text=Men's+Study" },
    { id: 'g002', name: "Women's Connect Group", schedule: "Wednesdays at 10:00 AM", meetingFrequency: "Weekly", location: "Room 201 (Childcare in Nursery)", leader: "Jane S. & Sarah K.", contactEmail: "womensconnect@example.com", description: "Short desc...", longDescription: "This group provides a safe space...", category: "Connect Group", targetAudience: "Women", childcareAvailable: true, isAcceptingNewMembers: true, groupImageURL: "https://via.placeholder.com/600x200?text=Women's+Connect" },
    // ... include other mock groups from GroupsPage.js
    { id: 'g004', name: "Alpha Course (Full)", schedule: "Mondays at 6:30 PM", meetingFrequency: "Weekly (10 weeks)", location: "Online via Zoom", leader: "Pastor Lee", description: "Explore the basics of the Christian faith. This session is currently full.", longDescription: "The Alpha Course is an opportunity for anyone to explore the Christian faith... This particular session is full.", category: "Discipleship Course", targetAudience: "Anyone exploring faith", childcareAvailable: false, isAcceptingNewMembers: false },
];


const GroupDetailsPage = () => {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const [group, setGroup] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        // Simulate API call to fetch specific group
        setTimeout(() => {
            const foundGroup = initialPortalGroups.find(g => g.id === groupId);
            setGroup(foundGroup);
            setIsLoading(false);
        }, 300);
    }, [groupId]);

    if (isLoading) {
        return <div className="portal-page-container group-details-loading"><p>Loading group details...</p></div>;
    }

    if (!group) {
        return (
            <div className="portal-page-container group-details-not-found">
                <h1>Group Not Found</h1>
                <p>The group you are looking for could not be found.</p>
                <Link to="/portal/groups" className="btn-portal btn-portal-secondary">Back to Groups</Link>
            </div>
        );
    }

    return (
        <div className="portal-page-container group-details-page"> {/* Style .group-details-page */}
            {group.groupImageURL && (
                <img src={group.groupImageURL} alt={group.name} className="group-details-banner" />
            )}
            <h1>{group.name}</h1>

            <div className="group-meta-info"> {/* Style .group-meta-info */}
                <p><i className="fas fa-calendar-alt"></i> <strong>Schedule:</strong> {group.schedule} ({group.meetingFrequency})</p>
                <p><i className="fas fa-map-marker-alt"></i> <strong>Location:</strong> {group.location}</p>
                <p><i className="fas fa-user-tie"></i> <strong>Leader(s):</strong> {group.leader}</p>
                {group.category && <p><i className="fas fa-tag"></i> <strong>Category:</strong> {group.category}</p>}
                {group.targetAudience && <p><i className="fas fa-users"></i> <strong>Audience:</strong> {group.targetAudience}</p>}
                <p><i className="fas fa-baby-carriage"></i> <strong>Childcare:</strong> {group.childcareAvailable ? 'Available' : 'Not Available'}</p>
            </div>

            <div className="group-description-section"> {/* Style .group-description-section */}
                <h3>About This Group</h3>
                <p className="full-description" style={{ whiteSpace: 'pre-wrap' }}>{group.longDescription || group.description}</p>
            </div>

            {group.isAcceptingNewMembers && (
                <div className="group-join-action-details"> {/* Style this */}
                    <h3>Interested in Joining?</h3>
                    <p>This group is currently accepting new members.</p>
                    <Link to={`/portal/groups/join/${group.id}`} className="btn-portal btn-portal-primary btn-lg">
                        <i className="fas fa-user-plus"></i> Request to Join This Group
                    </Link>
                </div>
            )}
            {!group.isAcceptingNewMembers && (
                 <div className="group-join-action-details">
                    <h3>Joining Information</h3>
                    <p className="registration-status-message">This group is currently not accepting new members or is full. Please contact the leader for more information.</p>
                 </div>
            )}


            {(group.contactEmail) && (
                <div className="group-contact-info"> {/* Style .group-contact-info */}
                    <h3>Questions?</h3>
                    <p>Contact the group leader{group.leader && ` (${group.leader})` } via email at <a href={`mailto:${group.contactEmail}`}>{group.contactEmail}</a>.
                    </p>
                </div>
            )}

            <div className="group-details-nav-actions" style={{ marginTop: '30px' }}>
                <button onClick={() => navigate(-1)} className="btn-portal btn-portal-secondary">
                    <i className="fas fa-arrow-left"></i> Back
                </button>
            </div>
        </div>
    );
};

export default GroupDetailsPage;