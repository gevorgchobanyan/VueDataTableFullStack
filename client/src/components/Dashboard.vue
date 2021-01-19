<template>
    <nav class="navbar navbar-light bg-light">
        <h3>Employee List</h3>

        <!-- <form-modal :inputObjValidation="inputValidation"
                    :inputObj="newEmployee"
        >
          <template v-slot:header>
            <h2>Add a new employee</h2>
          </template>
          <template v-slot:progressBar>
          </template>
          <template v-slot:formElements="slotProps">
            <label :for="slotProps.index">{{slotProps.elem.name}}{{slotProps.index}}</label>
            <span class="fa" 
                  v-if="controls[slotProps.index].activated"
                  :class="controls[slotProps.index].error ? 'fa-exclamation-circle text-danger' : 
                                                  'fa-check-circle text-success'"
                  >
            </span>
            <input type="text"
                   class="form-control" 
                   :id="slotProps.index" 
                   :placeholder="slotProps.elem.name"
                   @input="onInput(slotProps.index, $event.target.value)"
                   >
          </template>
        </form-modal> -->

        <delete-modal v-if="showModal3">
          <template v-slot:close-button>
            <button class="close-button" @click="close()">&times;</button>
          </template>
          <template v-slot:header>
              <h2>Dismiss</h2>
            </template>
            <template v-slot:body>
              <p v-for="(id, index) in selectedEmployeeIDs" :key="index"> {{getEmployeeById(id).name}}</p>
            </template>
            <template v-slot:footer>
              <input type="checkbox" class="custom-control-input" id="customCheck1" :checked="isDeletedFromDB" @click="updateIsDeletedFromDB">
              <label class="custom-control-label" for="customCheck1">Delete from database</label>&nbsp;
              <button type="button" class="btn btn-success" @click="fireSelectedEmployees()">Dismiss</button>&nbsp;
              <button type="button" class="btn btn-success" @click="close()">Cancel</button>
            </template>

        </delete-modal>

        <employee-form-modal v-if="showModal2"></employee-form-modal>
        <div>
            <input class="form-control mr-sm-2" 
                   type="text"
                   placeholder="Search employee by name ..."
                   aria-label="Search"
                   v-on:keyup="onKeyUp"
                   ><br>
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="customCheck1" :checked="showFired" @click="updateShowFired">
              <label class="custom-control-label" for="customCheck1">Show fired employees</label>&nbsp;
              <button type="button" class="btn btn-success" @click="openModal2()">Hire a new Employee</button>&nbsp;
              <button type="button" class="btn btn-success" @click="openModal3()" :disabled="btnDisable">Fire Employee{{plural}}</button>&nbsp;
            </div>  
        </div>
    </nav>
</template>



<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import EmployeeFormModal from '@/components/EmployeeFormModal.vue'
import CellEditModal from '@/components/CellEditModal.vue'

// import FormModal from '@/components/FormModal.vue'



export default {
  components: {
    'employee-form-modal': EmployeeFormModal,
    'delete-modal': CellEditModal,
    // 'form-modal': FormModal
  },

data: () => ({

}),
 computed: {
    ...mapGetters([
      'isDeletedFromDB',
      'getEmployeeById',
      'selectedEmployeeIDs',
      'orderState',
      'selectedEmployeeCount',
      'searchInput',
      'showFired',
      'firedEmployees',
      'firedEmployeesCount',
      'allEmployees',
      'showModal3',
      'showModal2',
      'showModal',
      'rowState',
    ]),
    btnDisable(){
      if(this.selectedEmployeeCount === 0){
          return true
        }else{
          return false
        }
    },
    plural(){
        if(this.selectedEmployeeCount > 1){
            return 's'
        }
    }
  },
  methods: {
      ...mapMutations([
        'updateIsDeletedFromDB',
          'changeShowFired',
          'updateSearchInput',
          'updateEmployeeCount',
          'changeShowModal2',
          'changeShowModal3',
          'deleteSelectedEmployees',
          'changeRowState',
          'changeOverlay'
      ]),
      ...mapActions([
        'deleteEmployee',
        'updateEmployeeDismissalDate'
      ]),
        onKeyUp(e){
            this.updateSearchInput(e.target.value)
        },
        updateShowFired(){
          this.updateSearchInput('')
          this.changeShowFired()
          this.updateEmployeeCount()
        },
        fireSelectedEmployees(){
          if(this.isDeletedFromDB){
            this.deleteEmployee()
          }else{
            this.updateEmployeeDismissalDate()
          }
          this.changeRowState()
          this.changeShowModal3()
          this.changeOverlay()
        },
        openModal2(){
          this.changeShowModal2()
          this.changeOverlay()
        },
        openModal3(){
          this.changeShowModal3()
          this.changeOverlay()
        },
        close(){
        this.changeShowModal3()
        this.changeOverlay()
        },
  }

}
 
</script>

<style scoped>
.close-button{
  cursor: pointer;
  position: absolute;
  right: 16px;
  font-size: 22px;
  background-color:#dfe6e0;
  border: none;
}
</style>