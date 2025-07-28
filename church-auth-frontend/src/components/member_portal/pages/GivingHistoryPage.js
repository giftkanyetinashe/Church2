import React from 'react';
import BackButton from '../BackButton';

const GivingHistoryPage = () => {
    // Mock data for demonstration
    const history = [
        { date: '2023-05-15', fund: 'General Fund', amount: 50.00, type: 'Online' },
        { date: '2023-04-20', fund: 'Missions', amount: 25.00, type: 'Check' },
        { date: '2023-04-01', fund: 'Building Fund', amount: 100.00, type: 'Online - Recurring' },
    ];

    return (
        <div className="portal-page-container">
            <BackButton to="/portal/giving">Back</BackButton>
            <h1>My Giving History</h1>
            <p>Review your past contributions. For official tax statements, please contact the church office or look for an annual statement option.</p>
            {history.length > 0 ? (
                <table className="giving-history-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Fund</th>
                            <th>Type</th>
                            <th className="amount">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item, index) => (
                            <tr key={index}>
                                <td>{item.date}</td>
                                <td>{item.fund}</td>
                                <td>{item.type}</td>
                                <td className="amount">${item.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No giving history found.</p>
            )}
            <button className="btn-portal btn-portal-secondary mt-3">
                <i className="fas fa-file-download" style={{marginRight: '5px'}}></i> Download Annual Statement (Placeholder)
            </button>
        </div>
    );
};
export default GivingHistoryPage;