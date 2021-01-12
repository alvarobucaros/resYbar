var data =  {   
    form_title: ' TIPOS DE PRODUCTO',
    form_btnNuevo:'Nuevo registro',
    form_btnActualiza:'Actualiza',
    form_btnEdita:'Edita',
    form_btnAnula:'Anula',  
    form_btnDelete:'Borra',  
    form_btnBuscar:' ? ',  
    lblid:'id',
    lbltp_idempresa:'empresa',
    lbltp_codigo:'código',
    lbltp_descipcion:'descipción',
    lbltp_estado:'estado',
    lbltp_estado0:'Activo',
    lbltp_estado1:'Inactivo',

    id:'',
    tp_idempresa:'',
    tp_codigo:'',
    tp_descipcion:'',
    tp_estado:'',
    tp_estado0:'A',
    tp_estado1:'I',

    id:0,
    datos:[],
    form_busqueda:'Buscar: ',
    searchKey:'',
    tipos:'',
    campo:'',
    page: 1,
    perPage: 12,
    pages: [],
    pageNumber:'',
    formulario:false, 
    currentSort:'name',
    currentSortDir:'asc',
 };

const vm = new Vue({
    el: '#apptipoproductos',
    data:data,
        created () { 
            this.leeRegistros(); 
        },
    
    methods: {
        nuevo: function(){
            this.id=0;
            this.tp_idempresa=1;
            this.tp_codigo=0;
            this.tp_descipcion=0;
            this.tp_estado='A';
            this.formulario=true;
             $('#idForm').slideToggle();
         },

         crear: function() {
             var er='';
             er=this.valida();
             if(er === ''){
                 if(this.id===0){
                     axios.post('/tipadd', { 
                   id:this.id,
                   tp_idempresa:this.tp_idempresa,
                   tp_codigo:this.tp_codigo,
                   tp_descipcion:this.tp_descipcion,
                   tp_estado:this.tp_estado,
                     }).then(response => {
                           this.leeRegistros();
                           this.formulario=false;
                     }).catch(e => {
                         console.log(e);
                     });
             }else{
                 axios.put('tipadd/'+this.id, {
                   id:this.id,
                   tp_idempresa:this.tp_idempresa,
                   tp_codigo:this.tp_codigo,
                   tp_descipcion:this.tp_descipcion,
                   tp_estado:this.tp_estado,
                 }).then(response => {
                       this.leeRegistros();
                       this.formulario=false;
                 }).catch(e => {
                     console.log(e);
                 });
                 };
             }
             else{
                 alert(er);
             }
             },
 
         valida: function(){
             er='';
              if(this.id === ''){er +='Falta id \n';}
              if(this.tp_idempresa === ''){er +='Falta idempresa \n';}
              if(this.tp_codigo === ''){er +='Falta codigo \n';}
              if(this.tp_descipcion === ''){er +='Falta descipcion \n';}
             return er;
         },
         busca: function(){
             det = this.searchKey;
             axios.get('/tipV/:'+det, { 
             }).then(response => {
                 this.datos=response.data; 
             }).catch(e => {
                 console.log(e);
             });           
         },

        selectOpcion(item,op){
            if(op==='E'){
              app.clickedUser = item;
              this.id = item.id;
              this.tp_idempresa = item.tp_idempresa;
              this.tp_codigo = item.tp_codigo;
              this.tp_descipcion = item.tp_descipcion;
              this.tp_estado = item.tp_estado;
                this.formulario = true;
            }
            if(op==='B'){
                if(confirm('Va aborrar a ' + item.tp_descipcion+ '?')){
                    axios.get('/tipdelete/'+item.id, { 
                    }).then(response => {
                         this.leeRegistros();  
                    }).catch(e => {
                        console.log(e);
                    });
                };
            }
        },
        leeRegistros(){
            axios.get('/tiplist', {})
            .then(response => {
              this.datos=response.data; 
              this.creaPaginacion();
            }).catch(e => {
                console.log(e);
            })
        },
        sorter(criterio){
            alert(criterio);
            this.currentSort=criterio;
            this.currentSortDir='asc';
           // this.datos = this.sortJSON(criterio,this.currentSortDir);
        },
        sortJSON( key, way) {
            data = this.datos.data;
            return data.sort(function(a, b) {
                var x = a[key]; var y = b[key];
                if (way === 'acs' ) { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
                if (way === 'des' ) { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
            });
        },
        
     setPages () {
         let numberOfPages = Math.ceil(this.datos.data.length / this.perPage);
         for (let index = 1; index <= numberOfPages; index++) {
             this.pages.push(index);
         }
     },
     otraPage(pg){
        alert(pg);
     },
     paginate (data) {
         let page = this.page;
         let perPage = this.perPage;
         let from = (page * perPage) - perPage;
         let to = (page * perPage);
         return  data.slice(from, to);
     },
 creaPaginacion(){
         this.setPages();
       }
     }
  });
 
// >>>>>>>   Creado por: Alvaro Ortiz Castellanos   Thursday,Oct 01, 2020 2:43:00   <<<<<<< 
