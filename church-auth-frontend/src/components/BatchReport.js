// src/components/BatchReport.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BatchReport.css'; // Dedicated CSS for printing
import { formatCurrency } from '../utils/formatting';

// In a real app, you would fetch this. For now, we need the data here too.
    const mockBatchDetails = {
    'B001': { batch: { id: 'B001', name: 'Sunday Offering 2023-10-29', dateCreated: '2023-10-29', currency: 'USD', status: 'Closed', countedTotal: 1250.50 }, contributions: [ { id: 'c101', memberName: 'John Smith', memberId: 'm003', fund: 'General Tithes', method: 'Swipe', checkNumber: '456', amount: 200.00 }, { id: 'c102', memberName: 'Peter Jones', memberId: 'm004', fund: 'General Tithes', method: 'Cash', checkNumber: null, amount: 50.00 }, { id: 'c103', memberName: 'Anonymous Giver', memberId: null, fund: 'Loose Offering', method: 'Cash', checkNumber: null, amount: 1000.50 } ] },
    'B002': { batch: { id: 'B002', name: 'SWIPE Machine 2023-10-29', dateCreated: '2023-10-29', currency: 'ZiG', status: 'Closed', countedTotal: 450.00 }, contributions: [ { id: 'c201', memberName: 'SWIPE Machine Summary', memberId: null, fund: 'General Tithes', method: 'Credit/Debit (POS)', checkNumber: null, amount: 450.00 } ] },
    'B003': { batch: { id: 'B003', name: 'Youth Fundraiser', dateCreated: '2023-10-20', currency: 'ZiG', status: 'Closed', countedTotal: 50000.00 }, contributions: [ { id: 'c301', memberName: 'Jane Doe', memberId: 'm002', fund: 'Youth Fund', method: 'Cash', checkNumber: null, amount: 15000.00 }, { id: 'c302', memberName: 'John Smith', memberId: 'm003', fund: 'Youth Fund', method: 'Cash', checkNumber: null, amount: 35000.00 } ] },
    'B004': { batch: { id: 'B004', name: 'Sunday Offering 2023-11-05', dateCreated: '2023-11-05', currency: 'USD', status: 'Open', countedTotal: 975.00 }, contributions: [ { id: 'c001', memberName: 'Jane Doe', memberId: 'm002', fund: 'General Tithes', method: 'Check', checkNumber: '123', amount: 100.00 }, { id: 'c002', memberName: 'John Smith', memberId: 'm003', fund: 'Missions Fund', method: 'Cash', checkNumber: null, amount: 25.00 }, { id: 'c003', memberName: 'Anonymous Giver', memberId: null, fund: 'Loose Offering', method: 'Cash', checkNumber: null, amount: 750.00 } ] }
};

const BatchReport = () => {
    const { batchId } = useParams();
    const data = mockBatchDetails[batchId];

    // This effect runs after the component renders
    useEffect(() => {
        // Give the browser a moment to render before printing
        setTimeout(() => {
            window.print();
            // Optional: close the window after printing dialog is handled
            window.onafterprint = window.close;
        }, 500);
    }, []); // Empty array ensures this runs only once

    if (!data) {
        return <div>Report data not found for batch ID: {batchId}</div>;
    }

    const enteredTotal = data.contributions.reduce((total, c) => total + c.amount, 0);

    return (
        <div className="report-container">
            <header className="report-header">
                <div className="church-info">
                    <h1>Your Church Name</h1>
                    <p>123 Ministry Lane, Anytown, USA</p>
                </div>
                <h2>Contribution Batch Report</h2>
            </header>

            <section className="batch-summary">
                <div><strong>Batch Name:</strong> {data.batch.name}</div>
                <div><strong>Batch Date:</strong> {new Date(data.batch.dateCreated).toLocaleDateString()}</div>
                <div><strong>Batch Status:</strong> {data.batch.status}</div>
            </section>

            <section className="contributions-table">
                <table>
                    <thead>
                        <tr>
                            <th>Member Name</th>
                            <th>Fund</th>
                            <th>Method</th>
                            <th>Check #</th>
                            <th className="amount">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.contributions.map(c => (
                            <tr key={c.id}>
                                <td>{c.memberName}</td>
                                <td>{c.fund}</td>
                                <td>{c.method}</td>
                                <td>{c.checkNumber || 'N/A'}</td>
                                <td className="amount">{formatCurrency(c.amount, data.batch.currency)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="4" className="footer-label">Entered Total:</td>
                            <td className="amount">{formatCurrency(enteredTotal, data.batch.currency)}</td>
                        </tr>
                        <tr>
                            <td colSpan="4" className="footer-label">Counted Total:</td>
                            <td className="amount">{formatCurrency(data.batch.countedTotal, data.batch.currency)}</td>
                        </tr>
                    </tfoot>
                </table>
            </section>

            <footer className="report-footer">
                <p>Report generated on: {new Date().toLocaleString()}</p>
            </footer>
        </div>
    );
};

export default BatchReport;