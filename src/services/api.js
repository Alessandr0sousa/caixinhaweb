import axios from 'axios';

const api = axios.create({baseURL: 'https://caixinha20.herokuapp.com'});

export default api;