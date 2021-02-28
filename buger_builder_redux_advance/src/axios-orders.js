import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://udemy-max-learn-react-default-rtdb.firebaseio.com/'
});

export default instance;