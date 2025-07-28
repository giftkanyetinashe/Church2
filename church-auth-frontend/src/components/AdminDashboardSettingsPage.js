import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboardSettingsPage.css'; // We'll create this

const settingsCategories = [
    {
        name: 'General Configuration',
        icon: 'fas fa-church',
        settings: [
            { id: 'church-info', name: 'Church Information', description: 'Update your church name, address, contact details, and logo.', path: '/dashboard/settings/general/church-info' },
            { id: 'system-preferences', name: 'System Preferences', description: 'Set timezone, date/currency formats, and other global settings.', path: '/dashboard/settings/general/preferences' },
        ]
    },
    {
        name: 'User & Security Management',
        icon: 'fas fa-users-cog',
        settings: [
            { id: 'manage-users', name: 'Manage User Accounts', description: 'Add, edit, or disable user logins.', path: '/dashboard/settings/users/manage' },
            { id: 'roles-permissions', name: 'Roles & Permissions', description: 'Define user roles and their access levels.', path: '/dashboard/settings/users/roles' },
            { id: 'audit-log', name: 'Audit Log', description: 'View a log of system activities and changes.', path: '/dashboard/settings/security/audit-log' },
        ]
    },
    {
        name: 'Financial Settings',
        icon: 'fas fa-coins',
        settings: [
            { id: 'manage-funds', name: 'Manage Giving Funds', description: 'Define funds for donations (e.g., Tithe, Missions).', path: '/dashboard/settings/financial/funds' },
            { id: 'online-giving', name: 'Online Giving Setup', description: 'Configure payment gateway integrations (e.g., Stripe, PayPal).', path: '/dashboard/settings/financial/online-giving' },
            { id: 'statement-settings', name: 'Giving Statement Settings', description: 'Customize templates and options for giving statements.', path: '/dashboard/settings/financial/statements' },
        ]
    },
    {
        name: 'Module Settings', // A general category for other modules
        icon: 'fas fa-cogs',
        settings: [
            { id: 'membership-fields', name: 'Membership Custom Fields', description: 'Define custom fields for member profiles.', path: '/dashboard/settings/modules/membership' },
            { id: 'group-categories', name: 'Group Categories', description: 'Manage categories for your church groups.', path: '/dashboard/settings/modules/groups' },
            { id: 'event-settings', name: 'Event Settings', description: 'Default settings for event registration and categories.', path: '/dashboard/settings/modules/events' },
            { id: 'checkin-settings', name: 'Check-in System', description: 'Configure child check-in stations and label printers.', path: '/dashboard/settings/modules/checkin' },
        ]
    },
    // Add more categories like Communications, Integrations as needed
];

const AdminDashboardSettingsPage = () => {
    return (
        <div className="admin-settings-page-container">
            <div className="page-header-controls">
                <h2>System Settings</h2>
                {/* No actions here usually, it's a navigation hub */}
            </div>

            <div className="settings-categories-grid">
                {settingsCategories.map(category => (
                    <div key={category.name} className="settings-category-card">
                        <div className="category-header">
                            <i className={`${category.icon} category-icon`}></i>
                            <h3>{category.name}</h3>
                        </div>
                        <ul className="settings-list">
                            {category.settings.map(setting => (
                                <li key={setting.id}>
                                    <Link to={setting.path} className="setting-link">
                                        <h4>{setting.name}</h4>
                                        <p>{setting.description}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboardSettingsPage;