import axios from 'axios';

const api = () => axios.create({ headers: { Accept: 'application/json' } });

export default api;
