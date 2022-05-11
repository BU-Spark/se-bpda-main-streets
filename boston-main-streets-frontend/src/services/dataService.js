import axios from "axios";
// const prefix = (process.env.REACT_APP_ENVIRONMENT === "DEV") ? (process.env.REACT_APP_URL_BACKEND) : ""
// const baseURL = `${prefix}/api/data`
const baseURL = '/api/data'

const getData = async (dataType, districtName) => {
    const res = await axios.get(`${baseURL}/${dataType}/${districtName}`)
    return res.data
}

const updateData = async (dataType, districtName, data) => {
    await axios.delete(`${baseURL}/${dataType}/${districtName}`)
    const res = await axios.post(`${baseURL}/${dataType}/${districtName}`, data)
    console.log(`${baseURL}/${dataType}/${districtName}`)
    return res.data
}

export default {
    getData,
    updateData
}