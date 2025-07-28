import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MembersPage.css';

const MembersPage = () => {
    const navigate = useNavigate();
    const members = [
        { id: 'm001', name: 'Alice Wonderland', status: 'Active' },
        { id: 'm002', name: 'Bob The Builder', status: 'Inactive' },
    ];

    return (
        <div className="members-page-container">
            <div className="members-header">
                <h2>Members</h2>
                <div className="members-actions">
                    <Link to="/dashboard/members/add" className="btn btn-add-member">
                        <i className="fas fa-plus"></i> Add Member
                    </Link>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search members..."
                    />
                </div>
            </div>

            <div className="members-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member) => (
                            <tr key={member.id}>
                                <td>{member.name}</td>
                                <td>
                                    <span
                                        className={`status-badge status-${member.status.toLowerCase()}`}
                                    >
                                        {member.status}
                                    </span>
                                </td>
                                <td className="actions-cell">
                                    <button
                                        className="action-btn view-btn"
                                        onClick={() =>
                                            navigate(`/dashboard/members/view/${member.id}`)
                                        }
                                    >
                                        <i className="fas fa-eye"></i>
                                    </button>
                                    <button
                                        className="action-btn edit-btn"
                                        onClick={() =>
                                            console.log(`Edit ${member.id}`)
                                        }
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        className="action-btn delete-btn"
                                        onClick={() =>
                                            console.log(`Delete ${member.id}`)
                                        }
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MembersPage;