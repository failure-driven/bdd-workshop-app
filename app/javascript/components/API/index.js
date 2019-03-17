import axios from 'axios';

const fetchUserProfile = async id => {
  const response = await axios
    .get(`/api/v1/profiles/${id}.json`, {
      headers: { 'Content-Type': 'application/json' },
    })
    .catch(() => {
      return createUserProfile();
    });
  return response;
};

const createUserProfile = async () => {
  const response = await axios.post('/api/v1/profiles.json', {
    headers: { 'Content-Type': 'application/json' },
  });
  return response;
};

export { fetchUserProfile };
export { createUserProfile };
export default { fetchUserProfile, createUserProfile };
