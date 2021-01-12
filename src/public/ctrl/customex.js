var data =  {   
    form_title: ' LISTA DE USUARIOS TIPO X (equis) ',
    form_btnNuevo:'Nuevo registro',
    form_btnActualiza:'Actualiza',
    form_btnEdita:'Edita',
    form_btnAnula:'Anula',  
    form_btnDelete:'Borra',  
    form_btnBuscar:' ? ',  
    lblid:'id',
    lblname:'name',
    lbladdress:'address',
    lblphone:'phone',
    lblempresa:'empresa',

    id:'',
    name:'',
    address:'',
    phone:'',
    empresa:'',
    
    id:0,
    datos:[],
    form_busqueda:'Buscar: ',
    searchKey:'',
    tipos:'',
    campo:'',
    page: 1,
    perPage: 8,
    pageNumber:'',
    formulario:false,
    pages: [],
    currentSort:'name',
    currentSortDir:'asc',

 };

const vm = new Vue({
    el: '#appcustomex',
    data:data,    
        created () { 
            this.leeRegistros(); 
        },

    methods: {
        nuevo: function(){
            this.id=0;
            this.name='';
            this.address='';
            this.phone='';
            this.empresa=1;
            this.formulario=true
         },

         crear: function() {
             var er='';
             er=this.valida();
             if(er === ''){
                 if(this.id===0){
                   axios.post('/cusadd', { 
                   id:this.id,
                   name:this.name,
                   address:this.address,
                   phone:this.phone,
                   empresa:this.empresa})
                    .then(response => {
                        this.leeRegistros();
                        this.formulario=false; 
                     }).catch(e => {
                         console.log(e);
                     });

             }else{
                 axios.put('cusadd/'+this.id, {
                   id:this.id,
                   name:this.name,
                   address:this.address,
                   phone:this.phone,
                   empresa:this.empresa})
                 .then(response =>{
                    this.leeRegistros();
                    this.formulario=false; 
                 }).catch(e => {
                     console.log(e);
                 });

             }
             }else{
                 alert(er);
             }
             },

         valida: function(){
             er='';
              if(this.id === ''){er +='Falta id \n';}
              if(this.name === ''){er +='Falta name \n';}
              if(this.address === ''){er +='Falta address \n';}
              if(this.phone === ''){er +='Falta phone \n';}
              if(this.empresa === ''){er +='Falta empresa \n';}
             return er;
         },
         busca: function(){
             det = this.searchKey;
             axios.get('/cuslistV/:'+det, {})
             .then(response => {
                this.datos=response.data;  
            }).catch(e => {
                console.log(e);
            })
          },

        selectOpcion(item,op){
            if(op==='E'){
              app.clickedUser = item;
              this.id = item.id;
              this.name = item.name;
              this.address = item.address;
              this.phone = item.phone;
              this.empresa = item.empresa;
              this.formulario = true;  
            }
            if(op==='B'){
                if(confirm('Va aborrar a ' + item.name+ '?')){
                    axios.get('/cusdelete/'+item.id, {})
                    .then(response => {
                        this.leeRegistros(); 
                    }).catch(e => {
                        console.log(e);
                    });
                };
            }
        },
        leeRegistros(){
            axios.get('/cuslist', {})
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
         console.log(this.datos.data.length);
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

// >>>>>>>   Creado por: Alvaro Ortiz Castellanos   Thursday,Sep 03, 2020 8:53:15   <<<<<<< 
