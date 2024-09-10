import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Home.css'; // Custom styles for the Home page
import WorkoutEntryForm from './WorkoutEntryForm';
import Graph from './Graph';

function Home() {
    const location = useLocation();
    const navigate = useNavigate(); // Hook for programmatic navigation
    const username = location.state?.username || 'Guest'; // Fallback to 'Guest' if no username

    const [activeTab, setActiveTab] = useState('home'); // Default tab
    const [isPopupVisible, setPopupVisible] = useState(false); // State to manage popup visibility

    // Function to extract initials from the username
    const getUsernameInitials = (name) => {
        return name.split(' ').map(n => n[0].toUpperCase()).join('');
    }

    // Handle popup visibility
    const togglePopup = () => setPopupVisible(!isPopupVisible);

    // Handle logout and redirect
    const handleLogout = () => {
        // Perform any necessary cleanup (e.g., remove tokens, clear state, etc.)
        sessionStorage.removeItem('UserId'); // Remove UserId from sessionStorage
        console.log('User logged out and session storage cleared');
        // Redirect to sign-in page
        navigate('/signin');
    }

    return (
        <div className="home-container">
            {/* Header Bar */}
            <header className="header-bar">
                <nav className="nav-options">
                    <ul>
                        <li className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}>Home</li>
                        <li className={activeTab === 'workout' ? 'active' : ''} onClick={() => setActiveTab('workout')}>Workout Entry</li>
                        <li className={activeTab === 'graphs' ? 'active' : ''} onClick={() => setActiveTab('graphs')}>Graphs</li>
                    </ul>
                </nav>
                <div className="user-initials" onClick={togglePopup}>
                    <span>{getUsernameInitials(username)}</span>
                    {isPopupVisible && (
                        <div className="popup">
                            <p>{username}</p>
                            <button className="logout-button" onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </header>

            {/* Content Area */}
            <div className="content-area">
                {activeTab === 'home' && <h1>Welcome to Home Page</h1>}
                {activeTab === 'workout' && (
                <div>
                    <WorkoutEntryForm />
                </div>
                )}
                {activeTab === 'graphs' && (<div><Graph /></div>)}
            </div>
        </div>
    );
}

export default Home;
