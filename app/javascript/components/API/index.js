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

const loginAsUser = async ({ handle }) => {
  const response = await axios.post(
    '/api/v1/profiles/sign_in',
    { handle },
    {
      headers: { Accept: 'application/json' },
    }
  );
  return response;
};

const createUserProfile = async playerData => {
  const response = await axios.post(
    '/api/v1/profiles',
    { player: playerData },
    {
      headers: { Accept: 'application/json' },
    }
  );
  return response;
};

const updateUserProfile = async ({data}) => {
  const response = await axios.put(
    `/api/v1/profiles/${data.id}`,
    { player: data },
    {
      headers: { Accept: 'application/json' },
    }
  );
  return response;
};

export { fetchUserProfile };
export { createUserProfile };
export { updateUserProfile };
export { loginAsUser };
export default {
  fetchUserProfile,
  createUserProfile,
  updateUserProfile,
  loginAsUser,
};
