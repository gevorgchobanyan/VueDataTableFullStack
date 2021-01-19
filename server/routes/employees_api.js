// const ObjectId = require('mongodb').ObjectId
const express = require('express')
const router = express.Router()
const Employee = require('../models/employees')



// API

//CREATE
router.post('/employees', async function (req, res, next) {
    Employee.create(req.body).then((employee) => {
        res.send(employee)
    }).catch(next)
})
//READ
router.get('/employees/', async function (req, res, next) {
    Employee.find({}).then((employees) => {
        res.send(employees)
    })
})

//UPDATE
router.put('/employees/:employeeId', async function (req, res, next) {
    Employee.findByIdAndUpdate({_id: req.params.employeeId}, req.body).then((employee) => {
        // console.log(req.params.employeeId)
        // console.log(req.body)
        Employee.findOne({_id: req.params.employeeId}).then((employee) => {
            res.send(employee)
        })
    })
})

// router.put('/employees/date/', async function (req, res, next) {
//     let date_ob = new Date()
//     let date = ("0" + date_ob.getDate()).slice(-2)
//     let month = ("0" + (date_ob.getMonth() + 1)).slice(-2)
//     let year = date_ob.getFullYear()
//     let fulldate = date + "/" + month + "/" + year
//     console.log(fulldate)
//     Employee.updateMany(
//         { _id: { $in: [...req.body.ids] } },
//         { $set: { fireDate : "11/11/1111" } },
//      ).then(() => {
//         res.send(req.body.ids)
//     })
// })


router.put('/employees/:employeeId/date', async function (req, res, next) {
    Employee.findByIdAndUpdate({_id: req.params.employeeId}, req.body).then((employee) => {
        Employee.findOne({_id: req.params.employeeId}).then((employee) => {
            res.send(employee)
        })
    })
})

//DELETE
router.delete('/employees/', async function (req, res, next) {
    Employee.deleteMany({
        _id:{$in: [
            ...req.body.ids
        ] }
    }).then(() => {
        res.send(req.body.ids)
    })
})

module.exports = router