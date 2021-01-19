const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create employee schema and model

const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name field is required']
    },
    companyName: {
        type: String,
        required: [true, 'companyName field is required']
    },
    positionName: {
        type: String,
        required: [true, 'positionName field is required']
    },
    hireDate: {
        type: String,
        required: [true, 'hireDate field is required']
    },
    fireDate: {
        type: String,
    },
    salary: {
        type: Number,
        required: [true, 'salary field is required']
    },
    fraction: {
        type: Number,
        required: [true, 'fraction field is required']
    },
    base: {
        type: Number,
        required: [true, 'base field is required']
    },
    advance: {
        type: Number,
        required: [true, 'advance field is required']
    },
    byHours: {
        type: Boolean,
        required: [true, 'byHours field is required']
    },
}, 
{
    versionKey: false // You should be aware of the outcome after set to false
})

const Employee = mongoose.model('employee', EmployeeSchema)


module.exports = Employee