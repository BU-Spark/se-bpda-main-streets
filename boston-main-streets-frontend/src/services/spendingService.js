import axios from "axios";
const prefix = (process.env.REACT_APP_ENVIRONMENT === "DEV") ? (process.env.REACT_APP_URL_BACKEND) : ""
const baseURL = `${prefix}/api/spending`

const getSpending = async (districtName) => {
    const res = await axios.get(`${baseURL}/${districtName}`)
    return res.data
}

const updateSpending = async (districtName, data) => {
    const res = await axios.post(`${baseURL}/${districtName}`, data)
    return res.data
}

export default {
    getSpending,
    updateSpending
}