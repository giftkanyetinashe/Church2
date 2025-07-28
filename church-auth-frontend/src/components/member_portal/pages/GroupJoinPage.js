import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// Optional: import './GroupJoinPage.css'; // Create this CSS file

// Use the same mock data structure
const initialPortalGroups = [
    { id: 'g001', name: "Men's Bible Study", leader: "John P. & Mark L.", isAcceptingNewMembers: true },
    { id: 'g002', name: "Women's Connect Group", leader: "Jane S. & Sarah K.", isAcceptingNewMembers: true },
    // ...
];
// Mock logged-in user
const mockLoggedInUser = { userId: 'u123', name: 'Test User', email: 'test.user@example.com' };

const GroupJoinPage = () => {
    const { groupId } = useParams();
    const [group, setGroup] = useState(null);
    const [isLoadingGroup, setIsLoadingGroup] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(''); // For user to send a message
    const [submissionStatus, setSubmissionStatus] = useState(''); // 'success', 'error', ''

    useEffect(() => {
        setIsLoadingGroup(true);
        // Simulate fetching group data
        setTimeout(() => {
            const foundGroup = initialPortalGroups.find(g => g.id === groupId);
            setGroup(foundGroup);
            setIsLoadingGroup(false);
        }, 300);
    }, [groupId]);

    const handleSubmitJoinRequest = (e) => {
        e.preventDefault();
        if (!group) return;

        setIsSubmitting(true);
        setSubmissionStatus('');
        console.log(`Submitting join request for group: ${group.name} (ID: ${groupId})`);
        console.log(`User: ${mockLoggedInUser.name}, Message: ${message}`);

        // Simulate API call
        setTimeout(() => {
            // This is where you'd send the request to the backend.
            // The backend would then notify the group leader.
            setSubmissionStatus('success');
            setIsSubmitting(false);
            // Optionally, clear message or redirect after a delay
            // navigate(`/portal/groups/details/${groupId}`);
        }, 1500);
    };

    if (isLoadingGroup) {
        return <div className="portal-page-container group-join-loading"><p>Loading group information...</p></div>;
    }

    if (!group) {
        return (
            <div className="portal-page-container group-join-not-found">
                <h1>Group Not Found</h1>
                <p>Cannot request to join a group that doesn't exist.</p>
                <Link to="/portal/groups" className="btn-portal btn-portal-secondary">Back to Groups</Link>
            </div>
        );
    }

    if (!group.isAcceptingNewMembers) {
        return (
            <div className="portal-page-container">
                <h1>Not Accepting New Members</h1>
                <p>This group, "{group.name}", is currently not accepting new member requests. Please check back later or contact the group leader.</p>
                <Link to={`/portal/groups/details/${groupId}`} className="btn-portal btn-portal-secondary">View Group Details</Link>
            </div>
        );
    }


    return (
        <div className="portal-page-container group-join-page"> {/* Style .group-join-page */}
            <h1>Request to Join: {group.name}</h1>
            <p>Led by: {group.leader}</p>

            {submissionStatus === 'success' ? (
                <div className="submission-success-message portal-success"> {/* Style .portal-success */}
                    <p><i className="fas fa-check-circle"></i> Your request to join "{group.name}" has been sent to the group leader(s)!</p>
                    <p>They will be in touch with you soon regarding next steps.</p>
                    <Link to={`/portal/groups/details/${groupId}`} className="btn-portal btn-portal-secondary" style={{marginRight: '10px'}}>View Group Details</Link>
                    <Link to="/portal/groups" className="btn-portal btn-portal-secondary">Back to All Groups</Link>
                </div>
            ) : (
                <form onSubmit={handleSubmitJoinRequest} className="portal-form"> {/* Style .portal-form */}
                    <p>Your name ({mockLoggedInUser.name}) and email ({mockLoggedInUser.email}) will be sent to the group leader(s) with your request.</p>
                    <div className="form-group">
                        <label htmlFor="message">Message to Leader(s) (Optional)</label>
                        <textarea
                            id="message"
                            rows="4"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="e.g., I'm interested in learning more, any specific requirements for joining?"
                        ></textarea>
                    </div>
                    <div className="form-actions" style={{ marginTop: '20px' }}>
                        <button type="submit" className="btn-portal btn-portal-primary btn-lg" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending Request...' : 'Send Join Request'}
                        </button>
                        <Link to={`/portal/groups/details/${groupId}`} className="btn-portal btn-portal-secondary" style={{marginLeft: '10px'}}>
                            Cancel
                        </Link>
                    </div>
                </form>
            )}
        </div>
    );
};

export default GroupJoinPage;