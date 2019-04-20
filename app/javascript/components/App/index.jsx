import React from 'react';
import Navigation from '../../components/Navigation';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../../components/Routes';
import Messages from '../../components/Messages';
import useProfile from '../../hooks/useProfile';
import OurSpinner from '../OurSpinner';

const App = () => {
  const { profile, loading, fetchProfile } = useProfile();

  return (
    <BrowserRouter>
      <>
        <Navigation profile={profile} loading={loading} />
        <Messages />
        {loading ? (
          <OurSpinner />
        ) : (
          <Routes profile={profile} fetchProfile={fetchProfile} />
        )}
      </>
    </BrowserRouter>
  );
};

export default App;
