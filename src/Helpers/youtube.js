import axios from 'axios'
const KEY = 'AIzaSyCWS8UDR4PalTl8mXEBVSCcWHavA9QRb1Y'

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params:{
        part:'snippet',
        maxResult:10,
        key: KEY
    }

})