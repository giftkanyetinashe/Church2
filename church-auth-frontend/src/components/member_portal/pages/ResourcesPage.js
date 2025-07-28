import React from 'react';
import './ResourcesPage.css'; 
import BackButton from '../BackButton';

// Mock Data - In a real app, this would come from an API
const mockResources = {
    sermonArchives: [
        { id: 's001', title: 'Foundations of Faith, Part 1', speaker: 'Pastor John', date: '2023-10-22', audioUrl: '#', videoUrl: '#', notesUrl: '/resources/sermon_notes_1.pdf' },
        { id: 's002', title: 'The Heart of a Servant', speaker: 'Pastor Jane', date: '2023-10-15', audioUrl: '#', videoUrl: '#', notesUrl: null },
        { id: 's003', title: 'Living in Community', speaker: 'Pastor John', date: '2023-10-08', audioUrl: '#', videoUrl: null, notesUrl: '/resources/sermon_notes_3.pdf' }
    ],
    bibleStudyNotes: [
        { id: 'bs01', title: 'Book of Romans - Chapter 1 Study Guide', series: 'Romans Study', fileUrl: '/resources/romans_study_1.pdf' },
        { id: 'bs02', title: 'Understanding the Parables', series: 'Topical Studies', fileUrl: '/resources/parables_study.pdf' }
    ],
    churchForms: [
        { id: 'cf01', title: 'Facility Rental Request Form', description: 'Request to use church facilities for an event.', fileUrl: '/resources/facility_request.pdf' },
        { id: 'cf02', title: 'Child Dedication Form', description: 'Sign up for our next child dedication service.', fileUrl: '/resources/child_dedication_form.pdf' }
    ]
};

const ResourcesPage = () => {
    // Note: To use PDFs like this, you would place them in your `public/resources` folder
    // The browser will then be able to access them directly via the URL.

    return (
        <div className="portal-page-container resources-page">
            <BackButton to="/portal">Back</BackButton>
            <h1>Resource Library</h1>
            <p className="resources-intro-text">
                Access recent sermons, Bible study materials, and important church documents all in one place.
            </p>

            {/* --- Sermon Archives Section --- */}
            <section className="resource-section">
                <h2><i className="fas fa-microphone-alt"></i> Sermon Archives</h2>
                <div className="sermon-list">
                    {mockResources.sermonArchives.map(sermon => (
                        <div key={sermon.id} className="sermon-item">
                            <div className="sermon-info">
                                <h4>{sermon.title}</h4>
                                <p>Speaker: {sermon.speaker} | Date: {new Date(sermon.date).toLocaleDateString()}</p>
                            </div>
                            <div className="sermon-links">
                                {sermon.audioUrl && <a href={sermon.audioUrl} title="Listen Audio" className="resource-btn audio"><i className="fas fa-headphones"></i></a>}
                                {sermon.videoUrl && <a href={sermon.videoUrl} title="Watch Video" className="resource-btn video"><i className="fas fa-video"></i></a>}
                                {sermon.notesUrl && <a href={sermon.notesUrl} title="Download Notes" className="resource-btn notes" target="_blank" rel="noopener noreferrer"><i className="fas fa-file-alt"></i></a>}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Bible Study Notes Section --- */}
            <section className="resource-section">
                <h2><i className="fas fa-book-open"></i> Bible Study Notes</h2>
                <div className="document-list">
                     {mockResources.bibleStudyNotes.map(doc => (
                        <a key={doc.id} href={doc.fileUrl} className="document-item" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-file-pdf"></i>
                            <div>
                                <h4>{doc.title}</h4>
                                <p>{doc.series}</p>
                            </div>
                            <span className="download-indicator"><i className="fas fa-download"></i></span>
                        </a>
                    ))}
                </div>
            </section>

             {/* --- Church Forms Section --- */}
            <section className="resource-section">
                <h2><i className="fas fa-folder-open"></i> Church Forms</h2>
                <div className="document-list">
                     {mockResources.churchForms.map(form => (
                        <a key={form.id} href={form.fileUrl} className="document-item" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-file-signature"></i>
                             <div>
                                <h4>{form.title}</h4>
                                <p>{form.description}</p>
                            </div>
                             <span className="download-indicator"><i className="fas fa-download"></i></span>
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ResourcesPage;