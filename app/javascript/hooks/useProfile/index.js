import { useState, useEffect } from 'react';
import api from './api';
import storage from './storage';

const LOCAL_STORAGE_KEY = 'player';

const useProfile = () => {
  const profileStorage = storage(LOCAL_STORAGE_KEY);
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);

  const fetchProfile = () => {
    const profile = profileStorage.get() || {};
    const { id } = profile;
    if (!id) {
      setLoading(false);
      return null;
    }
    return api()
      .get(`/api/v1/profiles/${id}`)
      .then(response => {
        setLoading(false);
        setProfile(response.data);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  return { profile, loading };
};

export default useProfile;
