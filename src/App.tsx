import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileForm from './components/ProfileForm';
import ProfilePage from './components/ProfilePage';
import NotFoundPage from './components/NotFoundPage';
import Navbar from './components/Navbar';
import { ProfileProvider } from './context/ProfileContext';

const App: React.FC = () => {
  return (
    <ProfileProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/profile-form" element={<ProfileForm />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ProfileProvider>
  );
};

export default App;
