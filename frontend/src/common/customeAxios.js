import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
//   baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
baseURL: 'http://localhost:8000'
});

// Alter defaults after instance has been created
instance.defaults.headers.common["Authorization"] = localStorage.getItem('_cisco.auth_token');
instance.defaults.headers.common["Content-Type"] = "application/json";

export default instance;