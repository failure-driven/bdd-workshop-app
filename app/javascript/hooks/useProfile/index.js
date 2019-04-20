import { useState, useEffect } from 'react';
import api from './api';
import storage from './storage';
import messageBus from '../../utils/messageBus';

const LOCAL_STORAGE_KEY = 'player';

const useProfile = () => {
  const profileStorage = storage(LOCAL_STORAGE_KEY);
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);

  const localStorageId = () => {
    const profile = profileStorage.get() || {};
    const { id } = profile;
    return id;
  };

  const fetchProfile = (id = localStorageId()) => {
    if (!id) {
      setLoading(false);
      setProfile(undefined);
      return null;
    }
    return api()
      .get(`/api/v1/profiles/${id}`)
      .then(response => {
        setProfile(response.data);
        setLoading(false);
      })
      .catch(({ response: { status, statusText } }) => {
        messageBus.error([status, statusText].join(' - '));
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, loading, fetchProfile };
};

export default useProfile;
