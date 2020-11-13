import axios from 'axios';

const api = axios.create({baseURL: 'https://caixinha20.herokuapp.com'});
// const api = axios.create({baseURL: 'https://localhost:3001/'});

export default api;