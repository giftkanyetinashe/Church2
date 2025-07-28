// src/components/DashboardPage.js
import React, { useState, useEffect } from 'react'; // Added useState, useEffect
import { Link, NavLink, useNavigate, Outlet, useLocation } from 'react-router-dom'; // Added NavLink, useLocation
import './Dashboard.css';
// Make sure you have Font Awesome linked

// DashboardOverview remains the same as you provided it
export const DashboardOverview = () => {
    const stats = [
        { id: 1, title: "Total Active Members", value: "1,250", icon: "fas fa-users", type: "members", link: "/dashboard/members" },
        { id: 2, title: "Avg. Weekly Attendance", value: "875", icon: "fas fa-calendar-check", type: "attendance", link: "/dashboard/reports/attendance/service" },
        { id: 3, title: "Last Month's Giving", value: "$15,300", icon: "fas fa-hand-holding-dollar", type: "giving", link: "/dashboard/giving" },
        { id: 4, title: "Active Small Groups", value: "28", icon: "fas fa-user-friends", type: "events", link: "/dashboard/groups" },
    ];
    const mockRecentActivity = [
        { id: 'act001', type: 'new_member', text: 'John Doe completed new member registration.', timestamp: '2 hours ago', link: '/dashboard/members/view/m_john_doe' },
        { id: 'act002', type: 'event_reminder', text: 'Registration for "Youth Summer Camp" closes in 3 days.', timestamp: '8 hours ago', link: '/dashboard/events/view/e_youth_camp' },
        { id: 'act003', type: 'giving_batch', text: 'Financial Batch B20230728 was closed with a total of $2,350.', timestamp: '1 day ago', link: '/dashboard/giving/manage-batches' },
        { id: 'act004', type: 'new_group', text: 'A new "Prayer Warriors" group was created.', timestamp: '2 days ago', link: '/dashboard/groups/view/g_prayer_warriors' },
        { id: 'act005', type: 'first_visitor', text: 'The Miller family (3 visitors) attended for the first time.', timestamp: '3 days ago', link: '/dashboard/members/followup/f_miller_family'},
    ];
    const attendanceData = { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'This Week'], values: [850, 865, 830, 880, 875] };
    const givingData = { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], values: [12000, 13500, 11500, 14000, 15300, 14800] };

    return (
        <>
            <section className="stats-cards-grid">
                {stats.map(stat => (
                    <Link key={stat.id} to={stat.link || '#'} className="stat-card-link">
                        <div className="stat-card">
                            <div className={`stat-card-icon ${stat.type}`}>
                                <i className={stat.icon}></i>
                            </div>
                            <div className="stat-card-info">
                                <h3>{stat.title}</h3>
                                <p>{stat.value}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </section>
            <section className="dashboard-section key-metrics-overview">
                <h2>Key Metrics Overview</h2>
                <div className="charts-grid">
                    <div className="chart-container">
                        <h4>Weekly Attendance Trend</h4>
                        <div className="chart-placeholder large">
                            <p>Attendance: {attendanceData.values.join(', ')}</p>
                            <small>(Line/Bar chart showing attendance over last 5 weeks)</small>
                        </div>
                    </div>
                    <div className="chart-container">
                        <h4>Monthly Giving Trend</h4>
                        <div className="chart-placeholder large">
                            <p>Giving: ${givingData.values.join(', $')}</p>
                            <small>(Line/Bar chart showing giving over last 6 months)</small>
                        </div>
                    </div>
                    <div className="chart-container small-metric">
                        <h4>New Connections</h4>
                        <div className="metric-box">
                            <p className="metric-value">12</p>
                            <p className="metric-label">New Members This Month</p>
                        </div>
                        <div className="metric-box">
                            <p className="metric-value">25</p>
                            <p className="metric-label">First-Time Visitors Last Sunday</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="dashboard-section recent-activity">
                <h2>Recent Activity</h2>
                {mockRecentActivity.length > 0 ? (
                    <ul className="activity-feed-list">
                        {mockRecentActivity.map(activity => (
                            <li key={activity.id} className={`activity-item type-${activity.type}`}>
                                <div className="activity-icon">
                                    {activity.type === 'new_member' && <i className="fas fa-user-plus"></i>}
                                    {activity.type === 'event_reminder' && <i className="fas fa-calendar-alt"></i>}
                                    {activity.type === 'giving_batch' && <i className="fas fa-donate"></i>}
                                    {activity.type === 'new_group' && <i className="fas fa-users"></i>}
                                    {activity.type === 'first_visitor' && <i className="fas fa-street-view"></i>}
                                    {!['new_member', 'event_reminder', 'giving_batch', 'new_group', 'first_visitor'].includes(activity.type) && <i className="fas fa-info-circle"></i>}
                                </div>
                                <div className="activity-content">
                                    <p className="activity-text">
                                        {activity.link ? <Link to={activity.link}>{activity.text}</Link> : activity.text}
                                    </p>
                                    <span className="activity-timestamp">{activity.timestamp}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No recent activity to display.</p>
                )}
                <div className="view-all-activity">
                    <Link to="/dashboard/activity-log">View All Activity (Placeholder)</Link>
                </div>
            </section>
        </>
    );
};


const DashboardPage = () => {
    const navigate = useNavigate();
    const location = useLocation(); // For closing sidebar on navigation
    const userName = "Admin User";
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false); // State for mobile sidebar

    const handleLogout = () => {
        console.log('User logged out');
        setIsMobileSidebarOpen(false); // Close sidebar if open
        navigate('/login');
    };

    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    // Close mobile sidebar when the route (location) changes
    useEffect(() => {
        setIsMobileSidebarOpen(false);
    }, [location]);

    // Get current main path for dynamic H1 (optional)
    const getCurrentPageTitle = () => {
        const path = location.pathname.split('/dashboard/')[1] || 'overview';
        if (path === 'overview') return `Welcome back, ${userName}!`;
        return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '); // Capitalize first letter
    };


    return (
        <div className="dashboard-layout">
            {/* Hamburger Button - Visible only on mobile via CSS */}
            <button
                className="mobile-nav-toggle"
                onClick={toggleMobileSidebar}
                aria-label="Toggle navigation"
                aria-expanded={isMobileSidebarOpen}
            >
                <i className={`fas ${isMobileSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>

            {/* Sidebar */}
            <aside className={`sidebar ${isMobileSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <Link to="/dashboard" className="sidebar-logo" onClick={() => setIsMobileSidebarOpen(false)}>CMS</Link>
                    {/* Close button inside sidebar for mobile */}
                    <button className="sidebar-close-btn" onClick={toggleMobileSidebar} aria-label="Close navigation">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        {/* Using NavLink for automatic 'active' class */}
                        <li><NavLink to="/dashboard" end onClick={toggleMobileSidebar} className={({isActive}) => isActive ? "active" : ""}><i className="fas fa-tachometer-alt nav-icon"></i> Dashboard</NavLink></li>
                        <li><NavLink to="/dashboard/members" onClick={toggleMobileSidebar} className={({isActive}) => isActive ? "active" : ""}><i className="fas fa-users nav-icon"></i> Members</NavLink></li>
                        <li><NavLink to="/dashboard/groups" onClick={toggleMobileSidebar} className={({isActive}) => isActive ? "active" : ""}><i className="fas fa-user-friends nav-icon"></i> Groups</NavLink></li>
                        <li><NavLink to="/dashboard/events" onClick={toggleMobileSidebar} className={({isActive}) => isActive ? "active" : ""}><i className="fas fa-calendar-days nav-icon"></i> Events</NavLink></li>
                        <li><NavLink to="/dashboard/giving" onClick={toggleMobileSidebar} className={({isActive}) => isActive ? "active" : ""}><i className="fas fa-donate nav-icon"></i> Giving</NavLink></li>
                        <li><NavLink to="/dashboard/reports" onClick={toggleMobileSidebar} className={({isActive}) => isActive ? "active" : ""}><i className="fas fa-chart-pie nav-icon"></i> Reports</NavLink></li>
                        <li><NavLink to="/dashboard/settings" onClick={toggleMobileSidebar} className={({isActive}) => isActive ? "active" : ""}><i className="fas fa-cog nav-icon"></i> Settings</NavLink></li>
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="logout-button-link">
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            </aside>

            {/* Overlay for when mobile sidebar is open */}
            {isMobileSidebarOpen && <div className="mobile-sidebar-overlay open" onClick={toggleMobileSidebar}></div>}


            {/* Main Content Area */}
            <main className="main-content">
                <header className="dashboard-header">
                    {/* H1 is now dynamic based on the page, falling back to welcome message */}
                    <h1>{getCurrentPageTitle()}</h1>
                    <div className="user-actions">
                        <button onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</button>
                    </div>
                </header>
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardPage;