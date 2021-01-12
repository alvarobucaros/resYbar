var data =  {   
    form_title: ' LISTA DE USUARIOS',
    form_btnNuevo:'Nuevo registro',
    form_btnActualiza:'Actualiza',
    form_btnEdita:'Edita',
    form_btnAnula:'Anula',  
    form_btnDelete:'Borra',  
    form_btnBuscar:' ? ',  
    lblid:'id',
    lblus_idempresa:'Empresa',
    lblus_nombre:'nombre',
    lblus_email:'email',
    lblus_direccion:'dirección',
    lblus_zona:'zona',
    lblus_localidad:'localidad',
    lblus_barrio:'barrio',
    lblus_doctipo:'Tipo Doc',
    lblus_doctipo0:'C.Ciudadanía',
    lblus_doctipo1:'C.Extrangero',
    lblus_doctipo2:'Nit',
    lblus_doctipo3:'Pasaporte',
    lblus_docnumero:'Documento',
    lblus_telefono:'teléfono',
    lblus_clave:'clave',
    lblus_estado:'Estado',
    lblus_estado0:'Activo',
    lblus_estado1:'Inactivo',

    id:'',
    us_idempresa:'',
    us_nombre:'',
    us_email:'',
    us_direccion:'',
    us_zona:'',
    us_localidad:'',
    us_barrio:'',
    us_doctipo:'',
    us_doctipo0:'C',
    us_doctipo1:'E',
    us_doctipo2:'N',
    us_doctipo3:'P',
    us_docnumero:'',
    us_telefono:'',
    us_clave:'',
    us_estado:'',
    us_estado0:'A',
    us_estado1:'I',

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
    el: '#appusuarios',
    data:data,
        created () { 
            this.leeRegistros(); 
        },
    
    methods: {
        nuevo: function(){
            this.id=0;
            this.us_idempresa=1;
            this.us_nombre='';
            this.us_email='';
            this.us_direccion='';
            this.us_zona='';
            this.us_localidad='';
            this.us_barrio='';
            this.us_doctipo='C';
            this.us_docnumero=0;
            this.us_telefono=0;
            this.us_clave='';
            this.us_estado='A';
            this.formulario=true;
             $('#idForm').slideToggle();
         },

         crear: function() {
             var er='';
             er=this.valida();
             if(er === ''){
                 if(this.id===0){
                     axios.post('/usuadd', { 
                   id:this.id,
                   us_idempresa:this.us_idempresa,
                   us_nombre:this.us_nombre,
                   us_email:this.us_email,
                   us_direccion:this.us_direccion,
                   us_zona:this.us_zona,
                   us_localidad:this.us_localidad,
                   us_barrio:this.us_barrio,
                   us_doctipo:this.us_doctipo,
                   us_docnumero:this.us_docnumero,
                   us_telefono:this.us_telefono,
                   us_clave:this.us_clave,
                   us_estado:this.us_estado,
                     }).then(response => {
                           this.leeRegistros();
                           this.formulario=false;
                     }).catch(e => {
                         console.log(e);
                     });
             }else{
                 tmp=this.id+'||'+this.us_clave;
                 axios.put('usuadd/'+tmp, {
                   id:this.id,
                   us_idempresa:this.us_idempresa,
                   us_nombre:this.us_nombre,
                   us_email:this.us_email,
                   us_direccion:this.us_direccion,
                   us_zona:this.us_zona,
                   us_localidad:this.us_localidad,
                   us_barrio:this.us_barrio,
                   us_doctipo:this.us_doctipo,
                   us_docnumero:this.us_docnumero,
                   us_telefono:this.us_telefono,
                   us_clave:this.us_clave,
                   us_estado:this.us_estado,
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
              if(this.us_idempresa === ''){er +='Falta idempresa \n';}
              if(this.us_nombre === ''){er +='Falta nombre \n';}
              if(this.us_email === ''){er +='Falta email \n';}
              if(this.us_direccion === ''){er +='Falta direccion \n';}
              if(this.us_zona === ''){er +='Falta zona \n';}
              if(this.us_localidad === ''){er +='Falta localidad \n';}
              if(this.us_barrio === ''){er +='Falta barrio \n';}
              if(this.us_doctipo === ''){er +='Falta doctipo \n';}
              if(this.us_docnumero === ''){er +='Falta docnumero \n';}
              if(this.us_telefono === ''){er +='Falta telefono \n';}
              if(this.us_clave === ''){er +='Falta clave \n';}
             return er;
         },
         busca: function(){
             det = this.searchKey;
             axios.get('/usuV/:'+det, { 
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
              this.us_idempresa = item.us_idempresa;
              this.us_nombre = item.us_nombre;
              this.us_email = item.us_email;
              this.us_direccion = item.us_direccion;
              this.us_zona = item.us_zona;
              this.us_localidad = item.us_localidad;
              this.us_barrio = item.us_barrio;
              this.us_doctipo = item.us_doctipo;
              this.us_docnumero = item.us_docnumero;
              this.us_telefono = item.us_telefono;
              this.us_clave = item.us_clave;
              this.us_estado = item.us_estado;
                this.formulario = true;
            }
            if(op==='B'){
                if(confirm('Va aborrar a ' + item.us_nombre+ '?')){
                    axios.get('/usudelete/'+item.id, { 
                    }).then(response => {
                         this.leeRegistros();  
                    }).catch(e => {
                        console.log(e);
                    });
                };
            }
        },
        leeRegistros(){
            axios.get('/usulist', {})
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
 
// >>>>>>>   Creado por: Alvaro Ortiz Castellanos   Thursday,Oct 01, 2020 12:11:26   <<<<<<< 
