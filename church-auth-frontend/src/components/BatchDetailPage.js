// src/components/BatchDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './BatchDetailPage.css';
import { formatCurrency } from '../utils/formatting';

// Your mock data is correct
const mockBatchDetails = {
    'B001': { batch: { id: 'B001', name: 'Sunday Offering 2023-10-29', dateCreated: '2023-10-29', currency: 'USD', status: 'Closed', countedTotal: 1250.50 }, contributions: [ { id: 'c101', memberName: 'John Smith', memberId: 'm003', fund: 'General Tithes', method: 'Swipe', checkNumber: '456', amount: 200.00 }, { id: 'c102', memberName: 'Peter Jones', memberId: 'm004', fund: 'General Tithes', method: 'Cash', checkNumber: null, amount: 50.00 }, { id: 'c103', memberName: 'Anonymous Giver', memberId: null, fund: 'Loose Offering', method: 'Cash', checkNumber: null, amount: 1000.50 } ] },
    'B002': { batch: { id: 'B002', name: 'SWIPE Machine 2023-10-29', dateCreated: '2023-10-29', currency: 'ZiG', status: 'Closed', countedTotal: 450.00 }, contributions: [ { id: 'c201', memberName: 'SWIPE Machine Summary', memberId: null, fund: 'General Tithes', method: 'Credit/Debit (POS)', checkNumber: null, amount: 450.00 } ] },
    'B003': { batch: { id: 'B003', name: 'Youth Fundraiser', dateCreated: '2023-10-20', currency: 'ZiG', status: 'Closed', countedTotal: 50000.00 }, contributions: [ { id: 'c301', memberName: 'Jane Doe', memberId: 'm002', fund: 'Youth Fund', method: 'Cash', checkNumber: null, amount: 15000.00 }, { id: 'c302', memberName: 'John Smith', memberId: 'm003', fund: 'Youth Fund', method: 'Cash', checkNumber: null, amount: 35000.00 } ] },
    'B004': { batch: { id: 'B004', name: 'Sunday Offering 2023-11-05', dateCreated: '2023-11-05', currency: 'USD', status: 'Open', countedTotal: 975.00 }, contributions: [ { id: 'c001', memberName: 'Jane Doe', memberId: 'm002', fund: 'General Tithes', method: 'Check', checkNumber: '123', amount: 100.00 }, { id: 'c002', memberName: 'John Smith', memberId: 'm003', fund: 'Missions Fund', method: 'Cash', checkNumber: null, amount: 25.00 }, { id: 'c003', memberName: 'Anonymous Giver', memberId: null, fund: 'Loose Offering', method: 'Cash', checkNumber: null, amount: 750.00 } ] }
};

const mockMembers = [
    { id: 'm002', name: 'Jane Doe' },
    { id: 'm003', name: 'John Smith' },
    { id: 'm004', name: 'Peter Jones' },
];


const BatchDetailPage = () => {
    const { batchId } = useParams();
    const [batchDetails, setBatchDetails] = useState(null);
    const [contributions, setContributions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedMember, setSelectedMember] = useState('');
    const [amount, setAmount] = useState('');
    const [fund, setFund] = useState('General Tithes');
    const [method, setMethod] = useState('Cash');
    const [checkNumber, setCheckNumber] = useState('');
    
    useEffect(() => {
        console.log(`Fetching data for batch: ${batchId}`);
        setIsLoading(true);
        setTimeout(() => {
            if (mockBatchDetails[batchId]) {
                const data = JSON.parse(JSON.stringify(mockBatchDetails[batchId]));
                setBatchDetails(data.batch);
                setContributions(data.contributions);
            } else {
                console.error(`Batch with id ${batchId} not found in mock data.`);
            }
            setIsLoading(false);
        }, 500);
    }, [batchId]);

    const handleAddContribution = (e) => {
        e.preventDefault();
        if (!amount || !selectedMember || parseFloat(amount) <= 0) {
            alert('Please select a member and enter a valid, positive amount.');
            return;
        }

        const member = mockMembers.find(m => m.id === selectedMember);
        const newContribution = {
            id: `c${Date.now()}`,
            memberName: selectedMember === 'anonymous' ? 'Anonymous Giver' : member.name,
            memberId: selectedMember,
            fund,
            method,
            checkNumber: method === 'Check' ? checkNumber : null,
            amount: parseFloat(amount),
        };

        setContributions(prev => [newContribution, ...prev]);
        setSelectedMember('');
        setAmount('');
        setFund('General Tithes');
        setMethod('Cash');
        setCheckNumber('');
        document.getElementById('member-select')?.focus();
    };

    const handleDeleteContribution = (contributionId) => {
        if (window.confirm('Are you sure you want to delete this contribution entry?')) {
            setContributions(prev => prev.filter(c => c.id !== contributionId));
        }
    };

    const handleCloseBatch = () => {
        if (!isReconciled) {
            alert('Cannot close batch. The entered total must match the counted total.');
            return;
        }
        if (window.confirm('Are you sure you want to close this batch? This action cannot be undone.')) {
            setBatchDetails(prev => ({ ...prev, status: 'Closed' }));
            alert(`Batch "${batchDetails.name}" has been closed.`);
        }
    };

    const enteredTotal = contributions.reduce((total, contrib) => total + contrib.amount, 0);
    const difference = enteredTotal - (batchDetails?.countedTotal || 0);
    const isReconciled = Math.abs(difference) < 0.001;

    if (isLoading) {
        return <div className="admin-page-container"><p>Loading batch details...</p></div>;
    }

    if (!batchDetails) {
        return (
            <div className="admin-page-container">
                <h1>Batch Not Found</h1>
                <p>Could not find details for batch ID: {batchId}.</p>
                <Link to="/dashboard/giving/manage-batches" className="btn btn-secondary">
                    Back to Batches List
                </Link>
            </div>
        );
    }

    return (
        <div className="admin-page-container batch-detail-page">
            <div className="batch-page-header">
                <div className="batch-titles">
                    <Link to="/dashboard/giving/manage-batches" className="back-link">
                        ← Back to Batches
                    </Link>
                    <h1>{batchDetails.name}</h1>
                    <p>
                        Date: {new Date(batchDetails.dateCreated).toLocaleDateString()} | 
                        Status: <span className={`status-badge status-batch-${batchDetails.status.toLowerCase()}`}>{batchDetails.status}</span>
                    </p>
                </div>
                <div className="batch-reconciliation-summary">
                    <div className={`summary-box ${isReconciled ? 'ok' : 'error'}`}>
                        <span>Difference</span>
                        <p>{formatCurrency(difference, batchDetails.currency)}</p>
                    </div>
                     <div className="summary-box">
                        <span>Entered Total</span>
                        <p>{formatCurrency(enteredTotal, batchDetails.currency)}</p>
                    </div>
                     <div className="summary-box">
                        <span>Counted Total</span>
                        {/* ----- THIS IS THE CORRECTED LINE ----- */}
                        <p>{formatCurrency(batchDetails.countedTotal, batchDetails.currency)}</p>
                    </div>
                    <button className="btn btn-primary" disabled={!isReconciled || batchDetails.status === 'Closed'} onClick={handleCloseBatch}>
                       {batchDetails.status === 'Closed' ? 'Batch Closed' : 'Close Batch'}
                    </button>
                </div>
            </div>

            {batchDetails.status === 'Open' && (
                <div className="entry-form-container">
                    <h3>Add Contribution to Batch</h3>
                    <form onSubmit={handleAddContribution} className="entry-form">
                        <div className="form-group member-search">
                            <label>Member *</label>
                            <select id="member-select" value={selectedMember} onChange={(e) => setSelectedMember(e.target.value)} required>
                                <option value="" disabled>Select a member...</option>
                                <option value="anonymous">Anonymous / Loose</option>
                                {mockMembers.map(member => (
                                    <option key={member.id} value={member.id}>{member.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group amount-input">
                            <label>Amount *</label>
                            <input type="number" step="0.01" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                        </div>
                         <div className="form-group fund-select">
                            <label>Fund</label>
                            <select value={fund} onChange={(e) => setFund(e.target.value)}>
                                <option>General Tithes</option>
                                <option>Missions Fund</option>
                                <option>Building Fund</option>
                            </select>
                        </div>
                         <div className="form-group method-select">
                            <label>Method</label>
                            <select value={method} onChange={(e) => setMethod(e.target.value)}>
                                <option>Cash</option>
                                <option>Check</option>
                                <option>Credit/Debit (POS)</option>
                            </select>
                        </div>
                        {method === 'Check' && (
                            <div className="form-group check-input">
                                <label>Check #</label>
                                <input type="text" placeholder="Check Number" value={checkNumber} onChange={(e) => setCheckNumber(e.target.value)} />
                            </div>
                        )}
                        <button type="submit" className="btn-add-contribution">
                            Add Entry
                        </button>
                    </form>
                </div>
            )}
            
            <div className="batch-entries-list">
                <h3>Contributions in this Batch ({contributions.length})</h3>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Member</th>
                                <th>Fund</th>
                                <th>Method</th>
                                <th>Check #</th>
                                <th style={{ textAlign: 'right' }}>Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contributions.map(c => (
                                <tr key={c.id}>
                                    <td>{c.memberName}</td>
                                    <td>{c.fund}</td>
                                    <td>{c.method}</td>
                                    <td>{c.checkNumber || 'N/A'}</td>
                                    <td style={{ textAlign: 'right' }}>{formatCurrency(c.amount, batchDetails.currency)}</td>
                                    <td className="actions-cell">
                                        <button className="action-btn edit-btn" title="Edit" disabled={batchDetails.status === 'Closed'}>
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            className="action-btn delete-btn"
                                            title="Delete"
                                            onClick={() => handleDeleteContribution(c.id)}
                                            disabled={batchDetails.status === 'Closed'}
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BatchDetailPage;