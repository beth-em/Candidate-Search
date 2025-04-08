import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface.tsx';
import { searchGithub, searchGithubUser } from '../api/API.tsx';

// Function to display a list of candidates, savedCandidates and a current candidate.
const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Fetch candidates from GitHub and view their full profiles
  useEffect(() => {
    console.log('Token:', import.meta.env.VITE_GITHUB_TOKEN);

    // First, get a list of Github users
    const fetchCandidates = async () => {
      try {
      const users = await searchGithub();
      if (!users.length) {
        console.error("No users returned from GitHub.");
        return;
      }

      // Second, Use usernames from that list to fetch full user profiles
      const profiles = await Promise.all(
        users.slice(0, 10).map((user: any) => searchGithubUser(user.login))
      );
      console.log('Profiles returned:', profiles);   // debugging API data

      // Third, convert API data into 'Candidate' objects
      const formatted: Candidate[] = profiles.map((profile: any) => ({
        name: profile.name || 'N/A',
        username: profile.login,
        location: profile.location || 'Unknown',
        avatar: profile.avatar_url,
        email: profile.email,
        html_url: profile.html_url,
        company: profile.company,
      }));

      // Then, save to state
      setCandidates(formatted);
    } catch (error) {
      console.error("Error fetching candiddates:", error)
    }
  };

    fetchCandidates();
  }, []);

  // Fetch saved candidates from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedCandidates');
    if (saved) setSavedCandidates(JSON.parse(saved));
  }, []);

  const currentCandidate = candidates[currentIndex];
  
  // Function to save the current candidate to the saved list and move on to the next candidate
  const handleSave = () => {
    const updated = [...savedCandidates, currentCandidate];
    setSavedCandidates(updated);
    localStorage.setItem('savedCandidates', JSON.stringify(updated));
    setCurrentIndex((prev) => prev + 1);
  };

  const handleSkip = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <section className="home">
      <h1>Candidate Search</h1>
      {currentCandidate ? (
        <div className="card">
          <img src={currentCandidate.avatar} alt={currentCandidate.username} />
          <h2>{currentCandidate.name} <em> ({currentCandidate.username})</em></h2>
          <p>Location: {currentCandidate.location}</p>
          <p>Company: {currentCandidate.company || 'N/A'}</p>
          <p>Email: {currentCandidate.email || 'N/A'}</p>
          <p>
            <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </p>
          <div className="buttons">
            <button onClick={handleSkip} style={{background: 'red' }}>-</button>
            <button onClick={handleSave} style={{ background: 'green' }}>+</button>
          </div>
        </div>
    ) : (
      <p>No more candidates to show.</p>
    )}
    </section>
  );
};

export default CandidateSearch;
