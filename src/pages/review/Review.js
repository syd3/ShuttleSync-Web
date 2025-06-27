import React, { useState } from 'react';
import './Review.css';
import Sidebar from '../../Sidebar';

// Dummy data for reviews
const initialReviews = [
  {
    id: 1,
    userPhoto: 'https://i.imgflip.com/7fx6ag.png',
    user: 'Juan Tamad',
    rating: 5,
    title: 'Great Service',
    content: 'The shuttle was on time and the driver was friendly.',
    date: '5/28/2025',
  },
  {
    id: 2,
    userPhoto: 'https://i.imgflip.com/7fx6ag.png',
    user: 'Pridyider',
    rating: 4,
    title: 'Good Experience',
    content: 'Clean vehicle and smooth ride.',
    date: '5/27/2025',
  },
  {
    id: 3,
    userPhoto: 'https://i.imgflip.com/7fx6ag.png',
    user: 'MAry grace piattos',
    rating: 3,
    title: 'Average',
    content: 'It was okay, but the shuttle was a bit late.asdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
    date: '5/26/2025',
  },
];

function Review() {
  const [reviews] = useState(initialReviews);
  const [selectedReview, setSelectedReview] = useState(null); // For modal

  //placeholder for export to PDF
  const handleExportPDF = () => {
    //export ot pdf functionality
    alert('wala pa');
  };

  //for truncate comment ...
  const truncate = (str, n) => (str.length > n ? str.slice(0, n) + '...' : str);

  return (
    <>
      <Sidebar className={selectedReview ? 'sidebar-disabled' : ''} />
      <div className="review-page" style={{ marginLeft: 240 }}>
        <section className="review-section">
          <div className="review-table-header">
            <h2>Feedbacks Table</h2>
            <button className="export-pdf-btn" onClick={handleExportPDF}>
              <span className="export-icon">⭳</span> Export to PDF
            </button>
          </div>
          <div className="table-scroll">
            <table className="review-table">
              <thead>
                <tr>
                  <th>User Photo</th>
                  <th>User</th>
                  <th>Rating</th>
                  <th>Title</th>
                  <th>Comment</th>
                  <th>Date Created</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(r => (
                  <tr key={r.id} onClick={() => setSelectedReview(r)} style={{ cursor: 'pointer' }}>
                    <td><img src={r.userPhoto} alt="user" className="user-photo" /></td>
                    <td>{r.user}</td>
                    <td>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} style={{ color: i < r.rating ? '#FFD600' : '#e0e0e0', fontSize: '1.2rem' }}>★</span>
                      ))}
                    </td>
                    <td>{r.title}</td>
                    <td className="review-comment-cell">{truncate(r.content, 40)}</td>
                    <td>{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* Full Comment Modal */}
        {selectedReview && (
          <div className="modal-overlay" onClick={() => setSelectedReview(null)}>
            <div className="modal review-modal" onClick={e => e.stopPropagation()}>
              <h1 style={{ margin: 0, fontSize: '2.2rem', color: '#FFD600', textAlign: 'center' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ color: i < selectedReview.rating ? '#FFD600' : '#e0e0e0' }}>★</span>
                ))}
              </h1>
              <h2 style={{ margin: '0.5rem 0 0.7rem 0', textAlign: 'center' }}>{selectedReview.title}</h2>
              <div style={{ marginBottom: '1rem', color: '#222', textAlign: 'center' }}>
                <strong>User:</strong> {selectedReview.user} &nbsp;|&nbsp; <strong>Date:</strong> {selectedReview.date}
              </div>
              <div className="review-modal-content">{selectedReview.content}</div>
              <div className="modal-actions">
                <button onClick={() => setSelectedReview(null)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Review;