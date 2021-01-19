import { createStore } from 'vuex'
import * as employeesService from '../../services/employees'

export default createStore({
  state: { 
    // NumNumSalary: 0,
    showModal: false,
    showModal2: false,
    showModal3: false,
    overlay: false,
    rowState: false,
    searchInput: '',
    employeeID: 0,
    showFired: true,
    isDeletedFromDB: false,
    selectedEmployeeCount: 0,
    selectedEmployeeIDs: [],
    headers: [
      { text: ' ', value: 'checkbox', filterable: true },
      { text: 'ID', value: 'id', filterable: true },
      { text: 'Employee', value: 'name', filterable: true },
      { text: 'Company', value: 'companyName', filterable: false },
      { text: 'Position ', value: 'positionName', filterable: false },
      { text: 'Date of admission', value: 'hireDate', filterable: false },
      { text: 'Date of dismissal', value: 'fireDate', filterable: false },
      { text: 'Salary', value: 'salary', filterable: false },
      { text: 'Rate in %', value: 'fraction' },
      { text: 'Base', value: 'base', filterable: false },
      { text: 'Advance', value: 'advance', filterable: false },
      { text: 'Hourly', value: 'byHours', filterable: false },
    ],
    employees: [],
    form: {}
  },
  getters: {
    isDeletedFromDB(state){
      return state.isDeletedFromDB
    },
    selectedEmployeeIDs(state){
      return state.selectedEmployeeIDs
    },
    getNumNumSalary(state){
      return state.NumNumSalary
    },
    getForm(state){
      return state.form
    },
    overlay (state){
      return state.overlay
    },
    rowState (state){
      return state.rowState
    },
    selectedEmployeeIDs (state){
      return state.selectedEmployeeIDs
    },
    selectedEmployeeCount (state){
      return state.selectedEmployeeCount
    },
    allHeaders (state){
      // let headersText = state.headers.map(a => a.text)
      // return headersText
      return state.headers
    },
    searchInput (state) {
      return state.searchInput
    },
    employeeID (state){
      return state.employeeID
    },
    allEmployees (state) {
      if(state.searchInput === ''){
        return state.employees
      }
      else{
        let filter = state.searchInput.toUpperCase()
        let newEmployeeArr = []
        for (let i = 0; i < state.employees.length; i++){
          if(state.employees[i]['name'].toUpperCase().indexOf(filter) > -1){
            newEmployeeArr.push(state.employees[i])
          }
        }
        return newEmployeeArr
      }
    },
    showFired (state) {
      return state.showFired
    },
    showModal (state){
      return state.showModal
    },
    showModal2 (state){
      return state.showModal2
    },
    showModal3 (state){
      return state.showModal3
    },
    firedEmployees (state) {
        return state.employees.filter(employee => employee.fireDate != null)
    },
    firedEmployeesCount (state, getters) {
      return getters.firedEmployees.length
    },
    currentEmployees (state) {
      if(state.searchInput === ''){
        return state.employees.filter(employee => employee.fireDate === null)
      }
      else{
        let currentEmployeesArr = state.employees.filter(employee => employee.fireDate === null)
        let filter = state.searchInput.toUpperCase()
        let newCurrentEmployeeArr = []
        for (let i = 0; i < currentEmployeesArr.length; i++){
          if(currentEmployeesArr[i]['name'].toUpperCase().indexOf(filter) > -1){
            newCurrentEmployeeArr.push(currentEmployeesArr[i])
          }
        }
        return newCurrentEmployeeArr
      }
    },
    currentEmployeesCount (state, getters) {
      return getters.currentEmployees.length
    },
    getEmployeeById: (state) => (id) => {
      return state.employees.find(employee => employee._id === id)
    }
  },
  mutations: {
    updateIsDeletedFromDB(state){
      state.isDeletedFromDB = !state.isDeletedFromDB
    },
    // setNumNumSalary(state, newSalary){
    //   state.NumNumSalary = newSalary
    // },
    setEmployee(state, updatedEmployee){
      Object.assign(
        state.employees.find(employee => employee._id === updatedEmployee._id),
        updatedEmployee
        )
    },
    setForm(state, {key, value}){
      state.form[key] = value
    },
    setEmployees(state, employees){
      state.employees = employees
    },
    changeShowFired (state) {
      state.showFired = !state.showFired
    },
    changeShowModal (state, employeeID) {
      state.showModal = !state.showModal
      state.employeeID = employeeID
      console.log(' ShowModal changed' + state.showModal)
      // console.log('changed to ' + state.showModal + '   employee id is ' + state.employeeID)
    },
    changeShowModal2 (state) {
      state.showModal2 = !state.showModal2
      console.log(' ShowModal2 changed' + state.showModal2)
    },
    changeShowModal3 (state) {
      state.showModal3 = !state.showModal3
      console.log(' ShowModal3 changed' + state.showModal3)
    },
    // updateEmployeeSalary (state, newSalary) {
    //   state.showModal = !state.showModal
    //   state.employees.find(employee => employee._id === state.employeeID).salary = newSalary
    // },
    updateSearchInput (state, input) {
      state.searchInput = input
    },
    incrementSelectedEmployeeCount (state){
      state.selectedEmployeeCount++
    },
    decrementSelectedEmployeeCount (state){
      state.selectedEmployeeCount--
    },
    updateEmployeeCount (state) {
      state.selectedEmployeeCount = 0
    },
    // addNewEmployee (state, newEmployee) {
    //   newEmployee._id = state.employees[state.employees.length-1].id + 1
    //   state.employees.push(newEmployee)
    // },

    // deleteSelectedEmployees(state){
    //   let len = state.selectedEmployeeIDs.length
    //   for(let i=0;i<state.selectedEmployeeIDs.length;i++){
    //     for (let j = state.employees.length - 1; j >= 0; --j) {
    //       if (state.employees[j].id === state.selectedEmployeeIDs[i]) {
    //         state.employees.splice(j,1)
    //       }
    //     }
    //   }
    //   state.selectedEmployeeCount -= state.selectedEmployeeCount
    // },
    addEmployeeID (state, employeeID){
      state.selectedEmployeeIDs.push(employeeID)
    },
    removeEmployeeID (state, employeeID){
      let index = state.selectedEmployeeIDs.indexOf(employeeID)
      state.selectedEmployeeIDs.splice(index, 1)
    },
    changeRowState (state){
      state.rowState = !state.rowState
    },
    changeOverlay (state){
      state.overlay = !state.overlay
    }
    
  },
  actions: { 
    
    //READ
    async getEmployees(context){
      const employees = await employeesService.getEmployees()
      context.commit('setEmployees', employees)
    },

    //CREATE
    async createEmployee(context){
      await employeesService.createEmployee(context.state.form)
      const employees = await employeesService.getEmployees()
      context.commit('setEmployees', employees)
    },

    //UPDATE
    async updateEmployee(context, data){
      // context.commit('setNumNumSalary', data['newSalary'])
      const updatedEmployee = await employeesService.updateEmployee(data['id'], data['newSalary'])
      context.commit('setEmployee', updatedEmployee)
    },

    //updateMany with one request ???

    // async updateEmployeeDismissalDate(context){
    //   const updatedEmployee = await employeesService.updateEmployeeDismissalDate(context.state.selectedEmployeeIDs)
    // },

    async updateEmployeeDismissalDate(context){
      let date_ob = new Date()
      let fulldate = ("0" + date_ob.getDate()).slice(-2) + "/" + ("0" + (date_ob.getMonth() + 1)).slice(-2) + "/" + date_ob.getFullYear()
      for(let i=0;i<context.state.selectedEmployeeIDs.length;i++){
        const updatedEmployee = await employeesService.updateEmployeeDismissalDate(context.state.selectedEmployeeIDs[i], fulldate)
      }
      const employees = await employeesService.getEmployees()
      context.commit('setEmployees', employees)

    },

    //DELETE
    async deleteEmployee(context){
      const deletedEmployee = await employeesService.deleteEmployee(context.state.selectedEmployeeIDs)
      const employees = await employeesService.getEmployees()
      context.commit('setEmployees', employees)
    },

  }

})
