const mapsRouter = require('express').Router()

// temp data
const bostonBoundary = require('../temp/maps/Boston_Boundary.json')
const mainStreetDistricts = require('../temp/maps/Main_Street_Districts.json')
const mainStreetBusiness = require('../temp/maps/MainStreets_Business_List.json')

mapsRouter.get('/', async (req, res) => {
    res.json({result: 'test'})
})

mapsRouter.get('/bostonboundary', async (req, res) => {
    res.json(bostonBoundary)
})

mapsRouter.get('/mainstreetdistricts', async (req, res) => {
    res.json(mainStreetDistricts)
})

mapsRouter.get('/mainstreetbusiness', async (req, res) => {
    res.json(mainStreetBusiness)
})

module.exports = mapsRouter