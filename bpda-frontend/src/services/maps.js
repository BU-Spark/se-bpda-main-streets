import axios from "axios";

const baseUrl = 'http://localhost:3001/api/maps'

const getBostonBoundary = async () => {
    const response = await axios.get(`${baseUrl}/bostonboundary`)
    return response.data
}

const getMainStreetDistricts = async () => {
    const response = await axios.get(`${baseUrl}/mainstreetdistricts`)
    return response.data
}

const getMainStreetBusiness = async () => {
    const response = await axios.get(`${baseUrl}/mainstreetbusiness`)
    return response.data
}

export default {
    getBostonBoundary, getMainStreetDistricts, getMainStreetBusiness
}