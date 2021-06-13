import axios from 'axios'

const axioWithAuth = () => {
 const token = localStorage.getItem('token')

 return axios.create({
   baseURL: 'http//localhost:3000',
   headers:{
    authorization: token
 }})
}

export default axioWithAuth;
//Task List:
//Build and export a function used to send in our authorization token