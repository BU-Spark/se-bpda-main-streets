const dataRouter = require('express').Router()
const fireDb = require('../utils/config').fireDb
const { ref, set, push, child, get, query, orderByChild, onValue, remove } = require('firebase/database')

// get spending data by district
dataRouter.get('/:dataType/:district', async (req, res) => {
    const district = req.params.district
    const dataType = req.params.dataType
    const dataRef = await query(ref(fireDb, `${dataType}/${district}`), orderByChild('order'))
    onValue(dataRef, (snapshot) => {
        if (snapshot.exists()) {
            res.status(200).json(Object.values(snapshot.val()))
        } else {
            res.status(400).json({
                error: 'no data'
            })
        }
    })
})

// post spending data by district
dataRouter.post('/:dataType/:district', async (req, res) => {
    // list of data {date, data}
    const data = req.body
    const district = req.params.district
    const dataType = req.params.dataType
    let order = 1
    for (let point of data) {
        const key = push(child(ref(fireDb), `${dataType}/${district}`)).key
        point.order = order
        await set(ref(fireDb, `${dataType}/${district}/${key}`), point)
        order += 1
    }
    res.status(200).end()
})

dataRouter.delete('/:dataType/:district', async (req, res) => {
    const district = req.params.district
    const dataType = req.params.dataType
    await remove(ref(fireDb, `${dataType}/${district}`))
    res.status(201).end()
})

module.exports = dataRouter