import axios from 'axios';

// added a proxy to the package json to support cookies
const instance = axios.create({
    baseURL: 'https://localhost:4000/'
});

export default instance;
