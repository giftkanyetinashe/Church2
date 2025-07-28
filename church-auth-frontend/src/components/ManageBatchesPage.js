
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ManageBatchesPage.css';
import { formatCurrency } from '../utils/formatting';

// --- REVISED Mock Data ---
const mockBatchesData = [
    { id: 'B001', name: 'Sunday Offering 2023-10-29', dateCreated: '2023-10-29', currency: 'USD', status: 'Closed', itemCount: 35, countedTotal: 1250.50, enteredTotal: 1250.50, enteredBy: 'Admin User', dateClosed: '2023-10-30' },
    { id: 'B002', name: 'SWIPE Machine 2023-10-29', dateCreated: '2023-10-29', currency: 'ZiG', status: 'Closed', itemCount: 1, countedTotal: 450.00, enteredTotal: 450.00, enteredBy: 'System', dateClosed: '2023-10-29' },
    { id: 'B003', name: 'Youth Fundraiser', dateCreated: '2023-10-20', currency: 'ZiG', status: 'Closed', itemCount: 50, countedTotal: 50000.00, enteredTotal: 50000.00, enteredBy: 'Admin User', dateClosed: '2023-10-21'},
    { id: 'B004', name: 'Sunday Offering 2023-11-05', dateCreated: '2023-11-05', currency: 'USD', status: 'Open', itemCount: 28, countedTotal: 975.00, enteredTotal: 875.00, enteredBy: 'Finance Team', dateClosed: null },
];


const ManageBatchesPage = () => {
    const [batches, setBatches] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // State for new batch form
    const [newBatchName, setNewBatchName] = useState('');
    const [newBatchDate, setNewBatchDate] = useState(new Date().toISOString().split('T')[0]);
    const [newBatchCountedTotal, setNewBatchCountedTotal] = useState('');
    const [newBatchCurrency, setNewBatchCurrency] = useState('USD');

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setBatches(mockBatchesData);
            setIsLoading(false);
        }, 300);
    }, []);

    const handleCreateBatch = (e) => {
        e.preventDefault();
        if (!newBatchName.trim() || !newBatchCountedTotal) {
            alert("Batch name and Counted Total are required.");
            return;
        }

        const newBatch = {
            id: `B${Date.now()}`,
            name: newBatchName,
            dateCreated: newBatchDate,
            currency: newBatchCurrency,
            status: 'Open',
            itemCount: 0,
            countedTotal: parseFloat(newBatchCountedTotal),
            enteredTotal: 0.00,
            enteredBy: 'Current User'
        };
        setBatches(prev => [newBatch, ...prev]);

        setShowCreateModal(false);
        setNewBatchName('');
        setNewBatchDate(new Date().toISOString().split('T')[0]);
        setNewBatchCountedTotal('');
        setNewBatchCurrency('USD');
        alert(`Batch "${newBatch.name}" created. You would now be navigated to the entry page.`);
    };

    // RESTORED from your original component
    const handleCloseBatch = (batchId, batchName) => {
        if(window.confirm(`Are you sure you want to close batch "${batchName}"? This usually finalizes the contributions within it.`)){
            console.log("Closing batch:", batchId);
            setBatches(prev => prev.map(b => b.id === batchId ? {...b, status: 'Closed', dateClosed: new Date().toISOString().split('T')[0]} : b));
            alert(`Batch "${batchName}" closed successfully (mock).`);
        }
    };

    // RESTORED from your original component
     const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };


    if (isLoading) {
        return <div className="manage-batches-page-container"><p>Loading batches...</p></div>;
    }

    return (
        <div className="manage-batches-page-container">
            <div className="page-header-controls">
                <h2>Manage Contribution Batches</h2>
                <div className="action-buttons">
                    <button onClick={() => setShowCreateModal(true)} className="btn btn-primary">
                        <i className="fas fa-plus"></i> Create New Batch
                    </button>
                    <Link to="/dashboard/giving" className="btn btn-secondary" style={{marginLeft: '10px'}}>
                        Back to Giving
                    </Link>
                </div>
            </div>

            {batches.length > 0 ? (
                <div className="batches-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Batch Name</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Entered Amount</th>
                                <th>Counted Amount</th>
                                <th>Difference</th>
                                <th>Items</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {batches.map(batch => {
                                const difference = batch.enteredTotal - batch.countedTotal;
                                return (
                                    <tr key={batch.id}>
                                        <td><Link to={`/dashboard/giving/batch/${batch.id}`}>{batch.name}</Link></td>
                                        <td>{formatDate(batch.dateCreated)}</td>
                                        <td>
                                            <span className={`status-badge status-batch-${batch.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                                {batch.status}
                                            </span>
                                        </td>
                                        <td>{formatCurrency(batch.enteredTotal, batch.currency)}</td>
                                        <td>{formatCurrency(batch.countedTotal, batch.currency)}</td>
                                        <td>
                                            <span className={difference !== 0 ? 'difference-error' : 'difference-ok'}>
                                                {formatCurrency(difference, batch.currency)}
                                            </span>
                                        </td>
                                        <td>{batch.itemCount}</td>
                                        
                                        {/* --- CORRECTED AND FINAL ACTIONS CELL --- */}
                                        <td className="actions-cell">
                                            <Link
                                                to={`/dashboard/giving/batch/${batch.id}`}
                                                className="action-btn view-btn"
                                                title={batch.status === 'Open' ? 'Enter Contributions' : 'View Batch'}
                                            >
                                                {batch.status === 'Open' ? <i className="fas fa-edit"></i> : <i className="fas fa-eye"></i>}
                                            </Link>
                                            
                                            {/* ===== THIS IS THE UPDATED PRINT BUTTON ===== */}
                                            <Link
                                                to={`/dashboard/giving/batch/${batch.id}/print`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="action-btn print-btn"
                                                title="Print Batch Report"
                                            >
                                                <i className="fas fa-print"></i>
                                            </Link>
                                            
                                            {batch.status === 'Open' && (
                                                <>
                                                    <button
                                                        onClick={() => handleCloseBatch(batch.id, batch.name)}
                                                        className="action-btn close-btn"
                                                        title="Close Batch"
                                                    >
                                                        <i className="fas fa-lock"></i>
                                                    </button>
                                                    <button
                                                        onClick={() => alert(`Simulate deleting batch ${batch.id}`)}
                                                        className="action-btn delete-btn"
                                                        title="Delete Batch"
                                                    >
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            ) : ( <p className="no-data-message">No batches found. Click "Create New Batch" to get started.</p> )}

            {showCreateModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Create New Batch</h3>
                        <form onSubmit={handleCreateBatch}>
                            <div className="form-group">
                                <label htmlFor="newBatchName">Batch Name *</label>
                                <input type="text" id="newBatchName" value={newBatchName} onChange={(e) => setNewBatchName(e.target.value)} placeholder="e.g., Sunday 9am Service" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="batchDate">Batch Date *</label>
                                <input type="date" id="batchDate" value={newBatchDate} onChange={(e) => setNewBatchDate(e.target.value)} required />
                            </div>
                             <div className="form-group">
                                <label htmlFor="countedTotal">Total Counted Amount *</label>
                                <input type="number" id="countedTotal" step="0.01" value={newBatchCountedTotal} onChange={(e) => setNewBatchCountedTotal(e.target.value)} placeholder="e.g., 1250.50" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="currency">Currency *</label>
                                <select id="currency" value={newBatchCurrency} onChange={(e) => setNewBatchCurrency(e.target.value)} required>
                                    <option value="USD">USD - United States Dollar</option>
                                    <option value="ZWG">ZWG - ZiG</option>
                                    <option value="ZAR">RAND - South African Rand</option>
                                    <option value="GBP">GBP - British Pound</option>
                                    <option value="EUR">EUR - Euro</option>
                                </select>
                            </div>
                            <div className="modal-actions">
                                <button type="button" onClick={() => setShowCreateModal(false)} className="btn btn-secondary">Cancel</button>
                                <button type="submit" className="btn btn-primary">Create & Enter Batch</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageBatchesPage;