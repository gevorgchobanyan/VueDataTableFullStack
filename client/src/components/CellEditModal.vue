<template>

  <div class="modal" id="modal">
    <div class="header">
      <slot name=close-button>
        <button class="close-button" @click="close()">&times;</button>
      </slot>
      <slot name="header"></slot>
      <slot name="head"></slot>
    </div>
    <div class="body">
      <slot name="body"></slot>
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
  salary: 0,
  }),
  computed: { 
    ...mapGetters([
    ])
  },
  methods: {
    ...mapMutations([
      'changeShowModal',
      'changeOverlay',
    ]),
    close(){
      this.changeShowModal(undefined)
      this.changeOverlay()
    }
  }
  
}
</script>


<style scoped>

.modal {
  display: block;
  position: fixed;
  padding: 10px;
  width: 280px;
  left: 50%;
  margin-left: -150px;
  height: 180px;
  top: 50%;
  margin-top: -100px;
  background: #dfe6e0;
  border-radius: 10px;
  border: 1px solid black;
  z-index: 20;
  overflow: auto;
}
.header h2{
  display: inline;
}
.body {
  border-top: 2px solid #28a745;
}
.close-button{
  cursor: pointer;
  position: absolute;
  right: 16px;
  font-size: 22px;
  background-color:#dfe6e0;
  border: none;
}
/* .footer{
  border-top: 2px solid #28a745;
} */
.footer button + button {
  
  /* display: inline-block; */
  margin-left: 30px;

}

</style>