import React from 'react';
import BackButton from '../BackButton';

const DonateFormPage = () => {
    return (
        <div className="portal-page-container">
             <BackButton to="/portal/giving">Back</BackButton>
            <h1>Make a Payment</h1>
            <p>Luke 6:38 "Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap. For with the measure you use, it will be measured to you." </p>
            <form>
                <div className="portal-form-group">
                    <label htmlFor="donateAmount">Amount ($):</label>
                    <input type="number" id="donateAmount" min="1" step="any" placeholder="e.g., 50.00" />
                </div>
                <div className="portal-form-group">
                    <label htmlFor="donateFund">Designate to Fund:</label>
                    <select id="donateFund">
                        <option value="general">General Fund</option>
                        <option value="missions">Missions</option>
                        <option value="building">Building Fund</option>
                        <option value="benevolence">Benevolence</option>
                    </select>
                </div>
                <div className="portal-form-group">
                    <label htmlFor="donateFrequency">Frequency:</label>
                    <select id="donateFrequency">
                        <option value="one-time">One-time</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>
                {/* Add payment fields (Stripe Elements, PayPal, etc.) here */}
                <div className="portal-form-group">
                    <label>Payment Information:</label>
                    <div style={{border: '1px dashed #ccc', padding: '20px', textAlign: 'center', color: '#777'}}>
                        (Secure Payment Fields - e.g., Ecocash, Zimswitch - would go here)
                    </div>
                </div>
                <button type="submit" className="btn-portal btn-portal-success">Submit Payment</button>
            </form>
        </div>
    );
};
export default DonateFormPage;