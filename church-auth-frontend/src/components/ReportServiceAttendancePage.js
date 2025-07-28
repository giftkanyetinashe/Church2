import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ReportServiceAttendancePage.css'; // We'll create this

// Mock Data - In a real app, this would come from API calls
const mockServices = [ // List of services/event types admin can select
    { id: 'srv001', name: 'Sunday Morning Worship' },
    { id: 'srv002', name: 'Wednesday Evening Bible Study' },
    { id: 'evt001', name: 'Annual Church Picnic (2023-07-20)' }, // Example of a specific event instance
    { id: 'evt002', name: 'Youth Summer Camp (Aug 5-9, 2023)' },
];

const mockAttendanceData = { // Keyed by serviceId_date (or just serviceId for recurring)
    'srv001_2023-07-16': { total: 120, attendees: [{id: 'm001', name: 'Alice W.'}, {id: 'm002', name: 'Bob B.'}, /* ...118 more */] },
    'srv001_2023-07-23': { total: 115, attendees: [{id: 'm001', name: 'Alice W.'}, {id: 'm004', name: 'David C.'}, /* ...113 more */] },
    'evt001_2023-07-20': { total: 75, attendees: [/* ...75 attendees */] },
};


const ReportServiceAttendancePage = () => {
    const [selectedServiceId, setSelectedServiceId] = useState('');
    const [startDate, setStartDate] = useState(''); // For date range
    const [endDate, setEndDate] = useState('');   // For date range
    const [reportData, setReportData] = useState(null); // To store fetched/filtered attendance
    const [isLoading, setIsLoading] = useState(false);
    const [availableServices, setAvailableServices] = useState([]);

    useEffect(() => {
        // Simulate fetching available services/event instances for the dropdown
        setAvailableServices(mockServices);
    }, []);

    const handleGenerateReport = (e) => {
        e.preventDefault();
        if (!selectedServiceId) {
            alert("Please select a service or event.");
            return;
        }
        setIsLoading(true);
        setReportData(null); // Clear previous report

        console.log("Generating report for service:", selectedServiceId, "Dates:", startDate, "to", endDate);

        // --- Simulate API call to fetch attendance data ---
        // In a real app, you'd send selectedServiceId, startDate, endDate to the backend
        setTimeout(() => {
            // Mock filtering/fetching logic:
            let fetchedData = [];
            if (selectedServiceId.startsWith('evt')) { // Specific event instance
                const eventDate = mockServices.find(s => s.id === selectedServiceId)?.name.match(/\((.*?)\)/)?.[1];
                const dataKey = `${selectedServiceId}_${eventDate}`; // Construct key based on event name for mock
                if(mockAttendanceData[dataKey]) {
                     fetchedData.push({ date: eventDate, ...mockAttendanceData[dataKey] });
                }
            } else { // Recurring service, potentially over a date range
                Object.keys(mockAttendanceData).forEach(key => {
                    const [srvId, date] = key.split('_');
                    if (srvId === selectedServiceId) {
                        const attendanceDate = new Date(date);
                        const reportStartDate = startDate ? new Date(startDate) : null;
                        const reportEndDate = endDate ? new Date(endDate) : null;

                        let dateMatch = true;
                        if(reportStartDate && reportEndDate) dateMatch = attendanceDate >= reportStartDate && attendanceDate <= reportEndDate;
                        else if (reportStartDate) dateMatch = attendanceDate >= reportStartDate;
                        else if (reportEndDate) dateMatch = attendanceDate <= reportEndDate;

                        if (dateMatch) {
                           fetchedData.push({ date: date, ...mockAttendanceData[key] });
                        }
                    }
                });
            }

            setReportData({
                serviceName: availableServices.find(s => s.id === selectedServiceId)?.name || 'Unknown Service',
                data: fetchedData.sort((a,b) => new Date(a.date) - new Date(b.date)), // Sort by date
                totalOverallAttendance: fetchedData.reduce((sum, item) => sum + item.total, 0),
                uniqueAttendees: new Set(fetchedData.flatMap(item => item.attendees.map(att => att.id))).size // Simple unique count
            });
            setIsLoading(false);
        }, 1000);
    };

    const formatDateForDisplay = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    return (
        <div className="report-service-attendance-container">
            <div className="page-header-controls">
                <h2>Service/Event Attendance Report</h2>
                <Link to="/dashboard/reports" className="btn btn-secondary">
                    <i className="fas fa-arrow-left"></i> Back to Reports
                </Link>
            </div>

            <form onSubmit={handleGenerateReport} className="report-filters-form">
                <div className="filter-grid">
                    <div className="form-group">
                        <label htmlFor="selectedServiceId">Select Service/Event *</label>
                        <select
                            id="selectedServiceId"
                            value={selectedServiceId}
                            onChange={(e) => setSelectedServiceId(e.target.value)}
                            required
                        >
                            <option value="">-- Choose a Service/Event --</option>
                            {availableServices.map(service => (
                                <option key={service.id} value={service.id}>{service.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="startDate">Start Date (Optional)</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endDate">End Date (Optional)</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-actions-report">
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                        {isLoading ? 'Generating...' : 'Generate Report'}
                    </button>
                    {reportData && (
                        <button type="button" onClick={() => alert("Print/Export functionality to be implemented!")} className="btn btn-outline">
                            <i className="fas fa-print"></i> Print/Export
                        </button>
                    )}
                </div>
            </form>

            {isLoading && <div className="loading-indicator"><p>Loading report data...</p></div>}

            {reportData && !isLoading && (
                <div className="report-results-section">
                    <h3>Report for: {reportData.serviceName}</h3>
                    {startDate || endDate ? (
                        <p className="report-date-range">
                            Date Range: {startDate ? formatDateForDisplay(startDate) : 'Beginning of time'} to {endDate ? formatDateForDisplay(endDate) : 'Present'}
                        </p>
                    ) : (
                         <p className="report-date-range">
                            {reportData.data.length === 1 && reportData.data[0].date.includes('-') ? `For Date: ${formatDateForDisplay(reportData.data[0].date)}` : 'All Available Dates'}
                        </p>
                    )}


                    <div className="report-summary-metrics">
                        <div><strong>Total Occurrences Displayed:</strong> {reportData.data.length}</div>
                        <div><strong>Total Overall Attendance:</strong> {reportData.totalOverallAttendance}</div>
                        {/* <div><strong>Unique Attendees (Across Occurrences):</strong> {reportData.uniqueAttendees}</div> */}
                    </div>

                    {reportData.data.length > 0 ? (
                        <div className="attendance-details-table">
                            <h4>Attendance Breakdown by Date:</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Total Attended</th>
                                        {/* Add more columns like 'First Timers', 'Children' if data exists */}
                                        <th>Attendees (Sample)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData.data.map((item, index) => (
                                        <tr key={index}>
                                            <td>{formatDateForDisplay(item.date)}</td>
                                            <td>{item.total}</td>
                                            <td>
                                                {item.attendees.slice(0, 5).map(att => att.name).join(', ')}
                                                {item.attendees.length > 5 ? '...' : ''}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No attendance data found for the selected criteria.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ReportServiceAttendancePage;
