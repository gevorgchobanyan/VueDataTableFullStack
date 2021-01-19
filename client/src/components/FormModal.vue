<template>

  <div class="form-modal" id="modal">
    <div class="header">
      <button class="close-button" @click="close()">&times;</button>
      <slot name="header"></slot>
    </div>
    <div class="body">
      <!-- <slot name="progressBar"></slot> -->


      <form>
        <div>
          <slot name="formElements"
                v-for="(elem, index) in inputObjValidation"
                :elem="elem"
                :index="index"
          >
            
          </slot>
        </div>
      </form>


      <!-- <div class="progress" style="width: 100%;">
        <div class="progress-bar" 
            role="progressbar" 
            :style="progressWidth" 
            aria-valuenow="25" 
            aria-valuemin="0" 
            aria-valuemax="100"
            >
            {{ done/controls.length*100 }} %
        </div>
      </div> -->



    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
    
</template> 

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data: () => ({
    // controls: []
  }),
  props: {
    inputObjValidation:{
      type: Array,
      default: () => []
    },
    inputObj:{
      type: Object,
      default: () => {}
    },

  },
//   beforeMount(){ //HOOK
//     for(let i=0; i<this.inputObjValidation.length;i++){
//       this.controls.push({
//         error: true,
//         activated: false
//       })
//     }
//   },
//  computed: { 
//     ...mapGetters([
//       'showModal2',
//     ]),
//     done(){
//       let done = 0
//       for(let i=0; i<this.controls.length;i++){
//         if(!this.controls[i].error){
//           done++
//         }
//       }
//       return done
//     },
//     progressWidth(){
//       return {
//         width: (this.done / this.controls.length * 100) + '%'
//       }
//     }
//   },
//   methods: {
//     ...mapMutations([
//       'changeShowModal2',
//       'addNewEmployee',
//       'changeOverlay',
//     ]),
//     SaveResult(){
//       this.addNewEmployee(this.inputObj)
//       this.changeShowModal2()
//       this.changeOverlay()
//     },
//     closeModal2(){
//       this.changeShowModal2()
//       this.changeOverlay()
//     },
//     onInput(index, value){
//       let data = this.inputObjValidation[index]
//       let control = this.controls[index]
//       data.value = value
//       control.error = !data.pattern.test(value)
//       control.activated = true
//     },
//   }
}
</script>



<style scoped>

.form-modal {
  display: block;
  position: fixed;
  padding: 10px;
  width: 480px;
  left: 50%;
  border-radius: 10px;
  border: 1px solid black;
  margin-left: -250px;
  height: 300px;
  top: 50%;
  margin-top: -180px;
  background: #dfe6e0;
  z-index: 20;
  overflow: auto;
}
.header h2{
  display: inline;
}
.body {
  border-top: 2px solid #28a745;
}
.close-button {
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
  font-weight: bold;
  position: absolute;
  right: 16px;
  font-size: 22px;
  background-color:#dfe6e0;
  border: none;
}

</style>