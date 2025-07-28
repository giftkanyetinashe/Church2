import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboardReportsPage.css'; // Ensure this CSS file exists

const reportCategories = [
    {
        name: 'Membership Reports',
        icon: 'fas fa-users',
        reports: [
            { id: 'member-directory', name: 'Member Directory', description: 'View and export a list of all members.', path: '/dashboard/reports/membership/directory' },
            { id: 'new-members', name: 'New Members Report', description: 'List of members who joined within a specific period.', path: '/dashboard/reports/membership/new' },
            { id: 'birthdays-anniversaries', name: 'Birthdays & Anniversaries', description: 'Upcoming birthdays and anniversaries.', path: '/dashboard/reports/membership/celebrations' },
        ]
    },
    {
        name: 'Giving & Financial Reports',
        icon: 'fas fa-hand-holding-usd',
        reports: [
            { id: 'contribution-summary', name: 'Contribution Summary', description: 'Summary of giving by date, fund, or donor.', path: '/dashboard/reports/giving/summary' },
            { id: 'giving-trends', name: 'Giving Trends', description: 'Analyze giving patterns over time.', path: '/dashboard/reports/giving/trends' },
            { id: 'donor-statements', name: 'Donor Giving Statements', description: 'Generate individual or batch giving statements.', path: '/dashboard/reports/giving/statements' },
        ]
    },
    {
        name: 'Attendance Reports',
        icon: 'fas fa-calendar-check',
        reports: [
            { id: 'service-attendance', name: 'Service Attendance', description: 'Track attendance for services and events.', path: '/dashboard/reports/attendance/service' },
            { id: 'group-attendance', name: 'Group Attendance', description: 'Monitor attendance for small groups and classes.', path: '/dashboard/reports/attendance/group' },
            { id: 'first-time-guests', name: 'First-Time Guests', description: 'Identify and follow up with new visitors.', path: '/dashboard/reports/attendance/guests' },
        ]
    },
    {
        name: 'Groups & Ministries Reports',
        icon: 'fas fa-user-friends',
        reports: [
            { id: 'group-rosters', name: 'Group Rosters', description: 'View members for each group.', path: '/dashboard/reports/groups/rosters' },
            { id: 'group-engagement', name: 'Group Engagement Metrics', description: 'Analyze participation and growth in groups.', path: '/dashboard/reports/groups/engagement' },
        ]
    },
];

const AdminDashboardReportsPage = () => {
    return (
        <div className="admin-reports-page-container">
            <h2>Reports Dashboard</h2>
            <p>Select a report to generate:</p>
            <ul>
                <li>
                    <Link to="/dashboard/reports/membership/directory">Member Directory Report</Link>
                </li>
                <li>
                    <Link to="/dashboard/reports/giving/summary">Giving Summary Report</Link>
                </li>
                <li>
                    <Link to="/dashboard/reports/attendance/service">Service/Event Attendance Report</Link>
                </li>
            </ul>

            <div className="report-categories-grid">
                {reportCategories.map(category => (
                    <div key={category.name} className="report-category-card">
                        <div className="category-header">
                            <i className={`${category.icon} category-icon`}></i>
                            <h3>{category.name}</h3>
                        </div>
                        <ul className="report-list">
                            {category.reports.map(report => (
                                <li key={report.id}>
                                    <Link to={report.path} className="report-link">
                                        <h4>{report.name}</h4>
                                        <p>{report.description}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="custom-report-section">
                <h3>Need a Custom Report?</h3>
                <p>If you need data that isn't covered by the standard reports, you can often export raw data or use advanced search tools.</p>
                <button className="btn btn-export-data">
                    <i className="fas fa-file-export"></i> Export Data (Placeholder)
                </button>
            </div>
        </div>
    );
};

export default AdminDashboardReportsPage;