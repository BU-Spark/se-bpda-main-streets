import axios from "axios";
const baseURL = 'https://se-bpda-main-streets.herokuapp.com/api/map'
// const baseURL = '/api/map'

const getBostonBoundary = async () => {
    const res = await axios.get(`${baseURL}/boundary`)
    return res.data
}

const getBostonDistricts = async () => {
    const res = await axios.get(`${baseURL}/districts`)
    return res.data
}

export default {
    getBostonBoundary,
    getBostonDistricts
}
