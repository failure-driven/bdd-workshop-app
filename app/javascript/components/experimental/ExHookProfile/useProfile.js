import { useState } from 'react';

const useProfile = () => {
  const [profile, setProfile] = useState();
  return { profile, setProfile };
};

export default useProfile;
