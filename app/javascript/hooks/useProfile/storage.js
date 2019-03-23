const storage = key => {
  const get = () => {
    if (!key) return null;
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  };
  return {
    get: get,
    set: value => {
      localStorage.setItem(key, JSON.stringify(value));
      return get();
    },
  };
};

export default storage;
