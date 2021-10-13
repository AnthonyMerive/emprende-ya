import axios from 'axios'
const KEY = 'AIzaSyA04H3CTBfn8GEg_TumjEKsQyaC8c_-yr4'

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params:{
        part:'snippet',
        maxResult:10,
        key: KEY
    }

})