import axios from 'axios';

const fetchUserProfile = async id => {
  const response = await axios
    .get(`/api/v1/profiles/${id}`, {
      // TODO: set derault for all calls
      headers: { Accept: 'application/json' },
    })
    .catch(() => {
      return createUserProfile();
    });
  return response;
};

const createUserProfile = async () => {
  const response = await axios.post(
    '/api/v1/profiles',
    {},
    {
      headers: { Accept: 'application/json' },
    }
  );
  return response;
};

const updateUserProfile = async ({ data: { handle, id } }) => {
  const response = await axios.put(
    `/api/v1/profiles/${id}`,
    { player: { handle } },
    {
      headers: { Accept: 'application/json' },
    }
  );
  return response;
};

export { fetchUserProfile };
export { createUserProfile };
export { updateUserProfile };
export default { fetchUserProfile, createUserProfile, updateUserProfile };
