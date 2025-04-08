import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

// Function to display all candidates and allow users to review saved candidates and remove (reject) from the list
const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedCandidates');
    if (saved) setSavedCandidates(JSON.parse(saved));
  }, []);

  const handleReject = (username: string) => {
    const updated = savedCandidates.filter(c => c.username !== username);
    setSavedCandidates(updated);
    localStorage.setItem('savedCandidates', JSON.stringify(updated));
  };

  return (
    <section className="saved">
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.username}>
                <td>
                  <img
                    src={candidate.avatar}
                    alt={candidate.username}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                </td>
                <td>
                  {candidate.name} <em>({candidate.username})</em>
                </td>
                <td>{candidate.location}</td>
                <td>{candidate.email || 'N/A'}</td>
                <td>{candidate.company || 'N/A'}</td>
                <td>-- bio placeholder --</td>
                <td>
                  <button
                    onClick={() => handleReject(candidate.username)}
                    style={{
                      background: 'crimson',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0.3rem 0.6rem',
                      cursor: 'pointer',
                    }}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No saved candidates to display.</p>
      )}
    </section>
  );
};

export default SavedCandidates;
