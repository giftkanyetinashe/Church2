// src/components/member_portal/pages/MyGivingPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../BackButton'; // Assuming you have this component
import './MyGivingPage.css'; // We'll create a dedicated CSS file

// Mock Data - In a real app, this would be fetched from an API
const mockGivingData = {
    summary: {
        ytd: 1250.00,
        lastGiftAmount: 100.00,
        lastGiftDate: '2023-10-01',
    },
    recentTransactions: [
        { id: 'g001', date: '2023-10-01', fund: 'General Tithes', amount: 100.00, type: 'Credit Card' },
        { id: 'g002', date: '2023-09-17', fund: 'Missions Fund', amount: 50.00, type: 'Credit Card' },
        { id: 'g003', date: '2023-09-03', fund: 'General Tithes', amount: 100.00, type: 'Credit Card' },
        { id: 'g004', date: '2023-08-20', fund: 'Building Fund', amount: 250.00, type: 'Bank Transfer' },
    ]
};

const MyGivingPage = () => {
    const [givingData, setGivingData] = useState({ summary: {}, recentTransactions: [] });

    useEffect(() => {
        // Simulate API fetch
        setGivingData(mockGivingData);
    }, []);

    return (
        <div className="portal-page-container my-giving-page">
            <BackButton to="/portal">Back</BackButton>
            <div className="giving-header">
                <div className="giving-header-text">
                    <h1>My Giving</h1>
                    <p className="giving-intro-text">
                        "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." - 2 Corinthians 9:7
                    </p>
                </div>
                <div className="giving-header-actions">
                    <Link to="/portal/giving/donate" className="btn-portal btn-portal-success">
                        <i className="fas fa-hand-holding-dollar"></i> Give Now
                    </Link>
                </div>
            </div>

            {/* --- Giving Summary Cards --- */}
            <div className="giving-summary-grid">
                <div className="summary-card">
                    <h4>Year-to-Date Giving</h4>
                    <p className="summary-value">${givingData.summary.ytd?.toFixed(2) || '0.00'}</p>
                </div>
                <div className="summary-card">
                    <h4>Most Recent Gift</h4>
                    <p className="summary-value">${givingData.summary.lastGiftAmount?.toFixed(2) || '0.00'}</p>
                    <small>on {givingData.summary.lastGiftDate ? new Date(givingData.summary.lastGiftDate).toLocaleDateString() : 'N/A'}</small>
                </div>
                <div className="summary-card statements-card">
                    <h4>Giving Statements</h4>
                    <p>Access your official records for tax purposes.</p>
                    <Link to="/portal/giving/history" className="btn-portal btn-portal-secondary">
                        View Statements
                    </Link>
                </div>
            </div>
            
            {/* --- Recent Transactions Table --- */}
            <div className="recent-transactions">
                <h2>Recent Contributions</h2>
                <div className="transactions-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Fund</th>
                                <th>Payment Method</th>
                                <th className="amount-col">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {givingData.recentTransactions.map(t => (
                                <tr key={t.id}>
                                    <td>{new Date(t.date).toLocaleDateString()}</td>
                                    <td>{t.fund}</td>
                                    <td>{t.type}</td>
                                    <td className="amount-col">${t.amount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 <div className="view-all-history">
                    <Link to="/portal/giving/history">View Complete Giving History →</Link>
                </div>
            </div>
        </div>
    );
};

export default MyGivingPage;