
<template>
        <div class='myDiv'> 
            <div>
            <label for='em_barrio' >{{lblTitulo}}</label> 
            <input v-model='rec.em_barrio'  type='text' class='4u 12u(mobile)' name ='em_barrio'> 
            </div>
        </div>
</template>
<script>

// import modulo 1... from './components/modulo...x.vue' 

export default {
    name: "proImputText",
    components: {
        // mudulo 1
    },
    props: {
    lblTitulo: String,
    default:'Label'
  },
  mounted() {
  },
  data(){

  },
  methods(){

  },
  computed(){

  }
}
</script>
<style>
    
</style>