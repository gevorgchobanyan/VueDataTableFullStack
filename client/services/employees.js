import axios from 'axios'

const getBasePath = () => {
    return 'http://localhost:5000'
}
//READ
export const getEmployees = async () => {
    const {data: employees} = await axios.get(`${getBasePath()}/employees/`)
    return employees
}
//CREATE
export const createEmployee = async (employee) => {
    const {data: newEmployee} = await axios.post(`${getBasePath()}/employees/`, employee)
    return newEmployee
}

//UPDATE
export const updateEmployee = async (employeeId, newSalary) => {
    const {data: updatedEmployee} = await axios.put(`${getBasePath()}/employees/${employeeId}`, 
            {   
                salary: newSalary
            }
        )
    return updatedEmployee
}

// export const updateEmployeeDismissalDate = async (employeeIDs) => {
//     const {data: updatedEmployees} = await axios.put(`${getBasePath()}/employees/date/`, 
//     { data: { ids: employeeIDs } }
//     )
//     return updatedEmployees
// }

export const updateEmployeeDismissalDate = async (employeeId, date) => {
    const {data: updatedEmployee} = await axios.put(`${getBasePath()}/employees/${employeeId}/date`,
        {   
            fireDate: date
        }
    )
    return updatedEmployee
}

//DELETE
export const deleteEmployee = async (employeeIDs) => {
    const {data: deletedEmployees} = await axios.delete(`${getBasePath()}/employees/`, 
    { data: { ids: employeeIDs } }
    )
    return deletedEmployees
}