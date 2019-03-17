import axios from 'axios';

const fetchUserProfile = async () => {
  const response = await axios.get('/api/v1/profiles');
  return response.data;
};

export { fetchUserProfile };
export default { fetchUserProfile };
