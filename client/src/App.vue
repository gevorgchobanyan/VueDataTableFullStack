<template>

  <div>

    <div class="main-wrapper" ref="main-wrapper">
        <my-dashboard></my-dashboard>
        <my-data-table></my-data-table>
    </div>
    <div :class="{active: overlay}" id="overlay"></div>

  </div>

</template>

<script>
import DataTable from '@/components/DataTable.vue'
import Dashboard from '@/components/Dashboard.vue'
import { mapGetters } from 'vuex'


export default {
  name: 'App',
  components: {
    'my-data-table': DataTable,
    'my-dashboard': Dashboard,
  },
  data() {
    return {


    }
  },
   computed: {
    ...mapGetters([
      'showModal',
      'overlay',
      'showModal2',
      'showFired',
      'firedEmployees',
      'firedEmployeesCount',
      'currentEmployees',
      'currentEmployeesCount',
      'allEmployees',
    ])
  }
}
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}


#overlay {
  position: fixed;
  opacity: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: none;
} 
#overlay.active {
  opacity: 1;
  pointer-events: all;

}
</style>
