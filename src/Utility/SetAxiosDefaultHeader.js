import axios from "axios"

const setDefaultHeader = (token) => {
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}

export default setDefaultHeader;