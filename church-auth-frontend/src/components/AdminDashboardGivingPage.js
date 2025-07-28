import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboardGivingPage.css'; // We'll create this

// Mock Data
const mockContributions = [
    { id: 'c001', date: '2023-07-20', donorName: 'Alice Wonderland', amount: 100.00, fund: 'General Fund', paymentMethod: 'Check #123', batchId: 'B001', notes: 'Sunday Offering' },
    { id: 'c002', date: '2023-07-20', donorName: 'Bob The Builder', amount: 50.00, fund: 'Missions', paymentMethod: 'Cash', batchId: 'B001', notes: '' },
    { id: 'c003', date: '2023-07-22', donorName: 'Carol Danvers', amount: 250.00, fund: 'Building Fund', paymentMethod: 'Online Stripe', batchId: 'Online_0722', notes: 'Capital Campaign' },
    { id: 'c004', date: '2023-07-23', donorName: 'David Copperfield', amount: 75.00, fund: 'General Fund', paymentMethod: 'Check #456', batchId: 'B002', notes: 'Sunday Offering' },
    { id: 'c005', date: '2023-07-25', donorName: 'Alice Wonderland', amount: 20.00, fund: 'Benevolence', paymentMethod: 'Online PayPal', batchId: 'Online_0725', notes: 'Special Need' },
];

const mockFunds = ['All', 'General Fund', 'Missions', 'Building Fund', 'Benevolence', 'Youth Ministry'];
const mockPaymentMethods = ['All', 'Cash', 'Ecocash', 'Swipe', 'Online PayPal'];

const AdminDashboardGivingPage = () => {
    const [contributions, setContributions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterFund, setFilterFund] = useState('All');
    const [filterPaymentMethod, setFilterPaymentMethod] = useState('All');
    const [filterDateStart, setFilterDateStart] = useState('');
    const [filterDateEnd, setFilterDateEnd] = useState('');

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setContributions(mockContributions);
        }, 500);
    }, []);

    const filteredContributions = contributions.filter(c => {
        const matchesSearch = searchTerm === '' ||
            c.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (c.batchId && c.batchId.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (c.notes && c.notes.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesFund = filterFund === 'All' || c.fund === filterFund;
        const matchesPaymentMethod = filterPaymentMethod === 'All' || c.paymentMethod === filterPaymentMethod;

        let matchesDate = true;
        if (filterDateStart && filterDateEnd) {
            const contributionDate = new Date(c.date);
            matchesDate = contributionDate >= new Date(filterDateStart) && contributionDate <= new Date(filterDateEnd);
        } else if (filterDateStart) {
            matchesDate = new Date(c.date) >= new Date(filterDateStart);
        } else if (filterDateEnd) {
            matchesDate = new Date(c.date) <= new Date(filterDateEnd);
        }

        return matchesSearch && matchesFund && matchesPaymentMethod && matchesDate;
    });

    const totalGiving = filteredContributions.reduce((sum, c) => sum + c.amount, 0);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };

    return (
        <div className="admin-giving-page-container">
            <div className="page-header-controls">
                <h2>Manage Givings</h2>
                <div className="action-and-filters">
                    <Link to="/dashboard/giving/add-contribution" className="btn btn-add-contribution">
                        <i className="fas fa-plus"></i> Add Contribution
                    </Link>
                    <Link to="/dashboard/giving/manage-batches" className="btn btn-manage-batches">
                        <i className="fas fa-layer-group"></i> Manage Batches
                    </Link>
                </div>
            </div>

            <div className="filters-bar giving-filters-bar">
                <input
                    type="text"
                    placeholder="Search, Batch, Notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input-giving"
                />
                <select value={filterFund} onChange={(e) => setFilterFund(e.target.value)} className="filter-select-giving">
                    {mockFunds.map(fund => <option key={fund} value={fund}>{fund}</option>)}
                </select>
                <select value={filterPaymentMethod} onChange={(e) => setFilterPaymentMethod(e.target.value)} className="filter-select-giving">
                    {mockPaymentMethods.map(method => <option key={method} value={method}>{method}</option>)}
                </select>
                <div className="date-filter-group">
                    <label htmlFor="dateStart">From:</label>
                    <input type="date" id="dateStart" value={filterDateStart} onChange={e => setFilterDateStart(e.target.value)} />
                </div>
                 <div className="date-filter-group">
                    <label htmlFor="dateEnd">To:</label>
                    <input type="date" id="dateEnd" value={filterDateEnd} onChange={e => setFilterDateEnd(e.target.value)} />
                </div>
            </div>

            <div className="giving-summary">
                Showing {filteredContributions.length} contributions. Total: <strong>${totalGiving.toFixed(2)}</strong>
            </div>

            {filteredContributions.length > 0 ? (
                <div className="admin-giving-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Fund</th>
                                <th>Payment Method</th>
                                <th>Batch ID</th>
                                <th>Notes</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredContributions.map(c => (
                                <tr key={c.id}>
                                    <td>{formatDate(c.date)}</td>
                                    <td>
                                        <Link to={`/dashboard/members/view/${c.donorId || 'unknown'}`}>{c.donorName}</Link>
                                    </td>
                                    <td className="amount-column">${c.amount.toFixed(2)}</td>
                                    <td>{c.fund}</td>
                                    <td>{c.paymentMethod}</td>
                                    <td>{c.batchId || 'N/A'}</td>
                                    <td>{c.notes}</td>
                                    <td className="actions-cell">
                                        <Link to={`/dashboard/giving/view/${c.id}`} className="action-btn view-btn" title="View Contribution">
                                            <i className="fas fa-eye"></i>
                                        </Link>
                                        <Link to={`/dashboard/giving/edit/${c.id}`} className="action-btn edit-btn" title="Edit Contribution">
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                        {/* Delete might be more complex (e.g., only if batch not closed, audit trails) */}
                                        <button onClick={() => alert(`Simulate deleting contribution ${c.id}`)} className="action-btn delete-btn" title="Delete Contribution">
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="no-data-message">No contributions found matching your criteria.</p>
            )}
        </div>
    );
};

export default AdminDashboardGivingPage;
