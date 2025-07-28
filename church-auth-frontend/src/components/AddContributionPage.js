import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AddContributionPage.css'; // We'll create this CSS file

// Mock data - In a real app, these would come from API or context
const mockDonors = [
    { id: 'm001', name: 'Alice Wonderland' },
    { id: 'm002', name: 'Bob The Builder' },
    { id: 'm003', name: 'Carol Danvers' },
    // Add more or fetch dynamically
];
const mockFunds = ['General Fund', 'Missions', 'Building Fund', 'Benevolence', 'Youth Ministry', 'Other'];
const mockPaymentMethods = ['Cash', 'Ecocash', 'Swipe'];
const mockBatches = [ // For assigning to an existing open batch
    { id: 'B001', name: 'Sunday Offering 2023-07-20 (Open)'},
    { id: 'B002', name: 'Sunday Offering 2023-07-23 (Open)'},
    // Add more or fetch dynamically
];


const AddContributionPage = () => {
    // const navigate = useNavigate();
    const [formData, setFormData] = useState({
        donorId: '', // Will store the selected donor's ID
        donorName: '', // For when donor is not in the system or for quick entry
        isAnonymous: false,
        contributionDate: new Date().toISOString().split('T')[0], // Default to today
        amount: '',
        fund: '',
        paymentMethod: '',
        checkNumber: '',
        transactionId: '', // For online payments or card terminal
        notes: '',
        batchId: '', // Assign to an existing open batch, or create new later
    });

    const [donors, setDonors] = useState([]); // For searchable donor dropdown
    const [filteredDonors, setFilteredDonors] = useState([]);
    const [donorSearchTerm, setDonorSearchTerm] = useState('');
    const [showDonorDropdown, setShowDonorDropdown] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate fetching donors
        setDonors(mockDonors);
        setFilteredDonors(mockDonors); // Initially show all
    }, []);

    useEffect(() => {
        if (donorSearchTerm) {
            setFilteredDonors(
                donors.filter(donor =>
                    donor.name.toLowerCase().includes(donorSearchTerm.toLowerCase())
                )
            );
        } else {
            setFilteredDonors(donors);
        }
    }, [donorSearchTerm, donors]);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleDonorSearchChange = (e) => {
        setDonorSearchTerm(e.target.value);
        handleChange({ target: { name: 'donorName', value: e.target.value } }); // Update donorName for non-selected entries
        setFormData(prev => ({ ...prev, donorId: '' })); // Clear selected donorId if typing
        setShowDonorDropdown(true);
    };

    const handleSelectDonor = (donor) => {
        setFormData(prevData => ({
            ...prevData,
            donorId: donor.id,
            donorName: donor.name, // Pre-fill donorName
        }));
        setDonorSearchTerm(donor.name); // Update search term to selected donor
        setShowDonorDropdown(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Basic Validations
        if (formData.isAnonymous === false && !formData.donorName.trim() && !formData.donorId) {
            setError('Donor Name is required unless contribution is anonymous.');
            setIsLoading(false);
            return;
        }
        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            setError('A valid Amount is required.');
            setIsLoading(false);
            return;
        }
        if (!formData.fund) {
            setError('Fund is required.');
            setIsLoading(false);
            return;
        }
        if (!formData.paymentMethod) {
            setError('Payment Method is required.');
            setIsLoading(false);
            return;
        }

        const submissionData = { ...formData };
        if (submissionData.isAnonymous) {
            submissionData.donorId = null; // Or specific ID for anonymous
            submissionData.donorName = 'Anonymous';
        }


        console.log('Submitting New Contribution Data:', submissionData);

        // --- Simulate API Call to Add Contribution ---
        setTimeout(() => {
            alert(`Contribution of $${formData.amount} from ${formData.isAnonymous ? 'Anonymous' : formData.donorName} added successfully (mock)!`);
            setIsLoading(false);
            // navigate('/dashboard/giving'); // Or to a success/batch page
            // For now, let's clear the form for another entry
            setFormData({
                donorId: '', donorName: '', isAnonymous: false,
                contributionDate: new Date().toISOString().split('T')[0],
                amount: '', fund: '', paymentMethod: '',
                checkNumber: '', transactionId: '', notes: '', batchId: '',
            });
            setDonorSearchTerm('');
        }, 1000);
    };

    return (
        <div className="add-contribution-page-container">
            <div className="page-header-controls">
                <h2>Add Contribution</h2>
                <Link to="/dashboard/giving" className="btn btn-cancel">
                    <i className="fas fa-arrow-left"></i> Back to Givings
                </Link>
            </div>

            {error && <div className="form-error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="add-contribution-form">
                {/* Donor Section */}
                <div className="form-section">
                    <h3>Donor Information</h3>
                    <div className="form-group donor-search-group">
                        <label htmlFor="donorName">Donor Name (or Search)</label>
                        <input
                            type="text"
                            id="donorName"
                            name="donorName"
                            placeholder="Type to search or enter new name"
                            value={formData.isAnonymous ? 'Anonymous' : donorSearchTerm}
                            onChange={handleDonorSearchChange}
                            onFocus={() => setShowDonorDropdown(true)}
                            // onBlur={() => setTimeout(() => setShowDonorDropdown(false), 150)} // Delay to allow click
                            disabled={formData.isAnonymous}
                            autoComplete="off"
                        />
                        {showDonorDropdown && !formData.isAnonymous && filteredDonors.length > 0 && (
                            <ul className="donor-dropdown">
                                {filteredDonors.map(donor => (
                                    <li key={donor.id} onClick={() => handleSelectDonor(donor)}>
                                        {donor.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                         <small>If donor is not listed, type full name and proceed.</small>
                    </div>
                     <div className="form-group form-group-checkbox">
                        <input type="checkbox" id="isAnonymous" name="isAnonymous" checked={formData.isAnonymous} onChange={handleChange} />
                        <label htmlFor="isAnonymous" className="checkbox-label">Anonymous Contribution</label>
                    </div>
                </div>

                {/* Contribution Details Section */}
                <div className="form-section">
                    <h3>Contribution Details</h3>
                    <div className="form-grid-col-3">
                        <div className="form-group">
                            <label htmlFor="contributionDate">Date *</label>
                            <input type="date" id="contributionDate" name="contributionDate" value={formData.contributionDate} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount">Amount ($) *</label>
                            <input type="number" id="amount" name="amount" min="0.01" step="0.01" placeholder="0.00" value={formData.amount} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fund">Fund *</label>
                            <select id="fund" name="fund" value={formData.fund} onChange={handleChange} required>
                                <option value="">Select Fund...</option>
                                {mockFunds.map(fund => <option key={fund} value={fund}>{fund}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="form-grid-col-3">
                        <div className="form-group">
                            <label htmlFor="paymentMethod">Payment Method *</label>
                            <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
                                <option value="">Select Method...</option>
                                {mockPaymentMethods.map(method => <option key={method} value={method}>{method}</option>)}
                            </select>
                        </div>
                        {formData.paymentMethod === 'Check' && (
                            <div className="form-group">
                                <label htmlFor="checkNumber">Check Number</label>
                                <input type="text" id="checkNumber" name="checkNumber" value={formData.checkNumber} onChange={handleChange} />
                            </div>
                        )}
                        {(formData.paymentMethod.includes('Credit Card') || formData.paymentMethod.includes('Online')) && (
                             <div className="form-group">
                                <label htmlFor="transactionId">Transaction ID (Optional)</label>
                                <input type="text" id="transactionId" name="transactionId" value={formData.transactionId} onChange={handleChange} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Batching and Notes Section */}
                <div className="form-section">
                    <h3>Batching & Notes</h3>
                     <div className="form-grid-col-2">
                        <div className="form-group">
                            <label htmlFor="batchId">Assign to Batch (Optional)</label>
                            <select id="batchId" name="batchId" value={formData.batchId} onChange={handleChange}>
                                <option value="">Select Existing Batch or Leave Blank</option>
                                {mockBatches.map(batch => <option key={batch.id} value={batch.id}>{batch.name}</option>)}
                            </select>
                            <small>If not selected, can be assigned later or create a new batch.</small>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="notes">Notes (Optional)</label>
                        <textarea id="notes" name="notes" rows="3" value={formData.notes} onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-submit-contribution" disabled={isLoading}>
                        {isLoading ? 'Saving Contribution...' : 'Save Contribution'}
                    </button>
                    {/* <button type="submit" name="saveAndNew" className="btn btn-secondary" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save & Add Another'}
                    </button> */}
                    <Link to="/dashboard/giving" className="btn btn-cancel-inline">Cancel</Link>
                </div>
            </form>
        </div>
    );
};

export default AddContributionPage;