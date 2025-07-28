import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboardGroupsPage.css'; // We'll create this specific CSS file

// Mock Data - In a real app, this would come from an API
const mockAdminGroups = [
    { id: 'g001', name: 'Men\'s Bible Study', leader: 'John Doe', membersCount: 15, category: 'Adult Ministry', status: 'Active', meetingTime: 'Tuesdays 7:00 PM' },
    { id: 'g002', name: 'Women\'s Connect Group', leader: 'Jane Smith', membersCount: 22, category: 'Adult Ministry', status: 'Active', meetingTime: 'Wednesdays 10:00 AM' },
    { id: 'g003', name: 'Youth Group (High School)', leader: 'Mike Brown', membersCount: 35, category: 'Youth Ministry', status: 'Active', meetingTime: 'Fridays 6:30 PM' },
    { id: 'g004', name: 'Worship Team', leader: 'Sarah Lee', membersCount: 12, category: 'Worship Arts', status: 'Active', meetingTime: 'Thursdays 7:30 PM (Practice)' },
    { id: 'g005', name: 'Newcomers Welcome Team', leader: 'David Green', membersCount: 8, category: 'Hospitality', status: 'Recruiting', meetingTime: 'As Needed' },
];

const AdminDashboardGroupsPage = () => {
    const [groups, setGroups] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setGroups(mockAdminGroups);
        }, 500);
    }, []);

    const categories = ['All', ...new Set(mockAdminGroups.map(group => group.category))];

    const filteredGroups = groups.filter(group => {
        const matchesSearchTerm = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  (group.leader && group.leader.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = filterCategory === 'All' || group.category === filterCategory;
        return matchesSearchTerm && matchesCategory;
    });

    return (
        <div className="admin-groups-page-container"> {/* Updated class name */}
            <div className="page-header-controls">
                <h2>Manage Church Groups</h2>
                <div className="action-and-filters">
                    <input
                        type="text"
                        placeholder="Search groups or leaders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input-groups"
                    />
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="filter-select-groups"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <Link to="/dashboard/groups/add" className="btn btn-add-group">
                        <i className="fas fa-plus"></i> Add New Group
                    </Link>
                </div>
            </div>

            {filteredGroups.length > 0 ? (
                <div className="admin-groups-table-container"> {/* Updated class name */}
                    <table>
                        <thead>
                            <tr>
                                <th>Group Name</th>
                                <th>Leader</th>
                                <th>Category</th>
                                <th>Members</th>
                                <th>Meeting Time</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredGroups.map(group => (
                                <tr key={group.id}>
                                    <td>{group.name}</td>
                                    <td>{group.leader || 'N/A'}</td>
                                    <td>{group.category}</td>
                                    <td>{group.membersCount}</td>
                                    <td>{group.meetingTime || 'N/A'}</td>
                                    <td>
                                        <span className={`status-badge status-${group.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                            {group.status}
                                        </span>
                                    </td>
                                    <td className="actions-cell">
                                        <Link to={`/dashboard/groups/view/${group.id}`} className="action-btn view-btn" title="View Details">
                                            <i className="fas fa-eye"></i>
                                        </Link>
                                        <Link to={`/dashboard/groups/edit/${group.id}`} className="action-btn edit-btn" title="Edit Group">
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                        <button onClick={() => alert(`Simulate deleting group ${group.name}`)} className="action-btn delete-btn" title="Delete Group">
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="no-data-message">No groups found{ (searchTerm || filterCategory !== 'All') && ' matching your criteria'}.</p>
            )}
        </div>
    );
};

export default AdminDashboardGroupsPage;