import React, { useState, useEffect } from 'react';
import BackButton from '../BackButton';
import './ServePage.css'; 

// Mock Data for Serving Opportunities
const mockOpportunities = [
    {
        id: 'serve01',
        title: "Children's Ministry Helper",
        ministry: 'Kids',
        commitment: 'Weekly',
        time: 'Sunday Mornings (9 AM or 11 AM service)',
        description: 'Assist lead teachers with activities, crafts, and supervision for children ages 5-10. Help create a fun and safe environment for kids to learn about faith.',
        requirements: 'Background check required. Must love working with children.',
    },
    {
        id: 'serve02',
        title: 'First Impressions Greeter',
        ministry: 'Hosting',
        commitment: 'Twice a Month',
        time: 'Sunday Mornings (30 mins before service)',
        description: 'Be the first friendly face our guests and members see! Welcome people at the main entrance, hand out bulletins, and answer basic questions.',
        requirements: 'A warm smile and a welcoming attitude.',
    },
    {
        id: 'serve03',
        title: 'Worship Team Vocalist',
        ministry: 'Worship',
        commitment: 'Weekly',
        time: 'Thursday evening rehearsals & Sunday services',
        description: 'Use your musical talents to help lead the congregation in worship. Both lead and background vocalists are needed.',
        requirements: 'Audition required. Must be able to harmonize.',
    },
    {
        id: 'serve04',
        title: 'Parking Lot Team',
        ministry: 'Hospitality',
        commitment: 'Once a Month',
        time: 'Sunday Mornings (45 mins before and 15 mins after service)',
        description: 'Help direct traffic and ensure a smooth and safe parking experience for everyone attending our services, rain or shine.',
        requirements: 'Willingness to serve outdoors.',
    },
    {
        id: 'serve05',
        title: 'Youth Group Small Group Leader',
        ministry: 'Youth',
        commitment: 'Weekly',
        time: 'Wednesday Evenings (6:30 PM - 8:30 PM)',
        description: 'Invest in the lives of middle and high school students by leading a small group discussion, building relationships, and being a positive role model.',
        requirements: 'Background check required. Passion for mentoring students.',
    }
];

const ServePage = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        // Simulate API fetch
        setOpportunities(mockOpportunities);
    }, []);

    const handleInterestClick = (opportunityTitle) => {
        // In a real app, this would trigger an API call to notify a leader
        // or open a more detailed application form.
        alert(`Thank you for your interest in the "${opportunityTitle}" team! A ministry leader will be in touch with you soon.`);
    };

    const filteredOpportunities = opportunities.filter(op => {
        if (filter === 'All') return true;
        return op.ministry === filter;
    });

    // Get unique ministry categories for filter buttons
    const ministries = ['All', ...new Set(opportunities.map(op => op.ministry))];

    return (
        <div className="portal-page-container serve-page">
            <BackButton to="/portal">Back</BackButton>
            <h1>Serving Opportunities</h1>
            <p className="serve-intro-text">
                Find a place to use your gifts and make a difference. Serving is a great way to grow in your faith and build relationships.
            </p>

            {/* --- Filter Section --- */}
            <div className="serve-filters">
                <span>Filter by Ministry:</span>
                <div className="filter-buttons">
                    {ministries.map(ministry => (
                        <button
                            key={ministry}
                            className={`filter-btn ${filter === ministry ? 'active' : ''}`}
                            onClick={() => setFilter(ministry)}
                        >
                            {ministry}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- Opportunities Grid --- */}
            <div className="opportunity-grid">
                {filteredOpportunities.length > 0 ? (
                    filteredOpportunities.map(op => (
                        <div key={op.id} className="opportunity-card">
                            <div className={`ministry-tag tag-${op.ministry.toLowerCase()}`}>{op.ministry}</div>
                            <h3>{op.title}</h3>
                            <p className="opportunity-description">{op.description}</p>
                            <div className="opportunity-details">
                                <p><strong>Commitment:</strong> {op.commitment}</p>
                                <p><strong>When:</strong> {op.time}</p>
                                <p><strong>Requirements:</strong> {op.requirements}</p>
                            </div>
                            <button
                                className="btn-portal btn-portal-success btn-express-interest"
                                onClick={() => handleInterestClick(op.title)}
                            >
                                <i className="fas fa-heart"></i> I'm Interested
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No opportunities found for the selected filter. Please try another category.</p>
                )}
            </div>
        </div>
    );
};

export default ServePage;