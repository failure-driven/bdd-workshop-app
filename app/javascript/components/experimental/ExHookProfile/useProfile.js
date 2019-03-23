import { useState, useEffect } from 'react';
import api from './api';
import storage from './storage';

const LOCAL_STORAGE_KEY = 'player';

const useProfile = () => {
  const profileStorage = storage(LOCAL_STORAGE_KEY);

  const [profile, setProfile] = useState();

  const createProfile = () => {
    return api()
      .post('/api/v1/profiles')
      .then(response => {
        setProfile(profileStorage.set(response.data));
      });
  };

  const fetchProfile = () => {
    const { id } = profileStorage.get() || {};
    if (!id) return createProfile();
    return api()
      .get(`/api/v1/profiles/${id}`)
      .then(response => setProfile(profileStorage.set(response.data)));
  };

  const getOrCreateProfile = () => {
    fetchProfile().catch(() => createProfile());
  };

  useEffect(() => {
    getOrCreateProfile();
  }, []);

  return { profile };
};

export default useProfile;
