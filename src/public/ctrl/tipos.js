var data =  {   
    form_title:'TIPOS DE PRODUCTO',
    form_btnNuevo:'Nuevo registro',
    form_btnActualiza:'Actualiza',
    form_btnEdita:'Edita',
    lbltp_estado:'Estado',
    lbltp_estadoA:'Activo',
    lbltp_estadoI:'Inactivo',
    form_btnAnula:'Anula',  
    form_btnDelete:'Borra',   
    form_btnBuscar:' ? ',  
    lbltp_codigo:'Código',
    lbltp_descipcion:'Descripción',
    tp_idEmpresa:'1',
    tp_codigo:'',
    tp_descipcion:'',
    tp_estado:'A',
    rtp_codigo:'',
    rtp_descipcion:'',
    rtp_estado:'',
    id:0,
    datos:[],
    form_busqueda:'Buscar: ',
    searchKey:'',
    page: 1,
    perPage: 12,
    pages: [],	
};
const vm = new Vue({
    el: '#appTipos',
    data:data,

    mounted () {     
        axios.get('/tplist', { 
      }).then(response => {
          this.datos=response.data;         
      }).catch(e => {
          console.log(e);
      })
    },

    methods: {
        nuevo: function(){
            this.id=0;
            this.tp_codigo='';
            this.tp_descipcion='';
            this.tp_estado='A'
            $('#idForm').slideToggle();
        },
        formToggle: function(){
            $('#idForm').slideToggle();
        },
        crear: function() {
            var er='';
            er=this.valida();
            if(er === ''){
                if(this.id===0){
                    axios.post('tpadd', {                
                        id:this.id,
                        tp_idEmpresa:this.tp_idEmpresa,
                        tp_codigo:this.tp_codigo,
                        tp_descipcion:this.tp_descipcion,
                        tp_estado:this.tp_estado,
                    }).then(function (response) {
                        $('#idForm').slideToggle();          
                    }).catch(e => {
                        console.log(e);
                    });
            }else{
                axios.put('tpadd/'+this.id, {                
                    id:this.id,
                    tp_idEmpresa:this.tp_idEmpresa,
                    tp_codigo:this.tp_codigo,
                    tp_descipcion:this.tp_descipcion,
                    tp_estado:this.tp_estado,
                }).then(function (response) {
                    $('#idForm').slideToggle();         
                }).catch(e => {
                    console.log(e);
                });
            }
            }else{
                alert(er);
            }
            },
            
            borrar: function(){
                return true;
            },
            editar: function(){
                return true;
            },
        valida: function(){
            er='';
            if(this.tp_codigo === ''){er +='Falta Codigo \n';}
            if(this.tp_descipcion === ''){er +='Falta descipcion \n';}
            if(this.tp_estado === ''){er +='Falta estado \n';}
            return er;
        },
        busca: function(){
            det = this.searchKey;
            axios.get('/tipos/:'+det, { 
            }).then(response => {
                this.datos=response.data;          
            }).catch(e => {
                console.log(e);
            })            
        },

        selectOpcion(item,op){
            if(op==='E'){
            app.clickedUser = item;
                this.id = item.id;
                this.tp_codigo = item.tp_codigo;
                this.tp_descipcion = item.tp_descipcion;
                this.tp_estado = item.tp_estado;
                $('#form').focus();
                $('#idForm').slideToggle();
            }
            if(op==='B'){
                if(confirm("Va aborrar a " + item.tp_descipcion +" ?")){
                    axios.get('/tpdelete/'+item.id, { 
                    }).then(function (response) {
                        console.log(response);            
                    }).catch(e => {
                        console.log(e);
                    });
                };
            }
        },

    },
    setPages () {
        let numberOfPages = Math.ceil(this.datos.length / this.perPage);
        for (let index = 1; index <= numberOfPages; index++) {
            this.pages.push(index);
        }
    },
    paginate (data) {
        let page = this.page;
        let perPage = this.perPage;
        let from = (page * perPage) - perPage;
        let to = (page * perPage);
        return  data.slice(from, to);
    },

    computed: {
        displayedPosts () {
            return this.paginate(this.datos);
        }
    },
watch: {
    posts () {
        this.setPages();
    }
},

filters: {
    trimWords(value){
        return value.split(" ").splice(0,20).join(" ") + '...';
    }
}

});

