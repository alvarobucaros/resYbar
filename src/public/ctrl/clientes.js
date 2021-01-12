var data =  {   
    form_title: ' LISTA DE CLIENTES',
    form_btnNuevo:'Nuevo registro',
    form_btnActualiza:'Actualiza',
    form_btnEdita:'Edita',
    form_btnAnula:'Anula',  
    form_btnDelete:'Borra',  
    form_btnBuscar:' ? ',  
    lblid:'id',
    lblcl_idempresa:'empresa',
    lblcl_tipodocumento:'tipo doc',
    lblcl_tipodocumento0:'C.Ciudadanía',
    lblcl_tipodocumento1:'C.Extrangería',
    lblcl_tipodocumento2:'Nit',
    lblcl_tipodocumento3:'Pasaporte',
    lblcl_documentoid:'documento',
    lblcl_nombre:'nombre',
    lblcl_telefono:'teléfono',
    lblcl_email:'email',
    lblcl_direccion:'dirección',
    lblcl_ciudad:'ciudad',
    lblcl_zona:'zona',
    lblcl_localidad:'localidad',
    lblcl_barrio:'barrio',
    lblcl_genero:'género',
    lblcl_genero0:'Masculino',
    lblcl_genero1:'Femenino',
    lblcl_estado:'estado',
    lblcl_estado0:'Activo',
    lblcl_estado1:'Inactivo',

    id:'',
    cl_idempresa:'',
    cl_tipodocumento:'',
    cl_tipodocumento0:'C',
    cl_tipodocumento1:'E',
    cl_tipodocumento2:'N',
    cl_tipodocumento3:'P',
    cl_documentoid:'',
    cl_nombre:'',
    cl_telefono:'',
    cl_email:'',
    cl_direccion:'',
    cl_ciudad:'',
    cl_zona:'',
    cl_localidad:'',
    cl_barrio:'',
    cl_genero:'',
    cl_genero0:'M',
    cl_genero1:'F',
    cl_estado:'',
    cl_estado0:'A',
    cl_estado1:'I',

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
    el: '#appclientes',
    data:data,
        created () { 
            this.leeRegistros(); 
        },
    
    methods: {
        nuevo: function(){
            this.id=0;
            this.cl_idempresa=1;
            this.cl_tipodocumento=0;
            this.cl_documentoid=0;
            this.cl_nombre=0;
            this.cl_telefono=0;
            this.cl_email=0;
            this.cl_direccion=0;
            this.cl_ciudad=0;
            this.cl_zona=0;
            this.cl_localidad=0;
            this.cl_barrio=0;
            this.cl_genero=0;
            this.cl_estado='A';
            this.formulario=true;
             $('#idForm').slideToggle();
         },

         crear: function() {
             var er='';
             er=this.valida();
             if(er === ''){
                 if(this.id===0){
                   axios.post('/cliadd', { 
                   id:this.id,
                   cl_idempresa:this.cl_idempresa,
                   cl_tipodocumento:this.cl_tipodocumento,
                   cl_documentoid:this.cl_documentoid,
                   cl_nombre:this.cl_nombre,
                   cl_telefono:this.cl_telefono,
                   cl_email:this.cl_email,
                   cl_direccion:this.cl_direccion,
                   cl_ciudad:this.cl_ciudad,
                   cl_zona:this.cl_zona,
                   cl_localidad:this.cl_localidad,
                   cl_barrio:this.cl_barrio,
                   cl_genero:this.cl_genero,
                   cl_estado:this.cl_estado,
                     }).then(response => {
                           this.leeRegistros();
                           this.formulario=false;
                     }).catch(e => {
                         console.log(e);
                     });
             }else{
                 axios.put('cliadd/'+this.id, {
                   id:this.id,
                   cl_idempresa:this.cl_idempresa,
                   cl_tipodocumento:this.cl_tipodocumento,
                   cl_documentoid:this.cl_documentoid,
                   cl_nombre:this.cl_nombre,
                   cl_telefono:this.cl_telefono,
                   cl_email:this.cl_email,
                   cl_direccion:this.cl_direccion,
                   cl_ciudad:this.cl_ciudad,
                   cl_zona:this.cl_zona,
                   cl_localidad:this.cl_localidad,
                   cl_barrio:this.cl_barrio,
                   cl_genero:this.cl_genero,
                   cl_estado:this.cl_estado,
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
              if(this.cl_idempresa === ''){er +='Falta idempresa \n';}
              if(this.cl_tipodocumento === ''){er +='Falta tipodocumento \n';}
              if(this.cl_documentoid === ''){er +='Falta documentoid \n';}
              if(this.cl_nombre === ''){er +='Falta nombre \n';}
              if(this.cl_telefono === ''){er +='Falta telefono \n';}
              if(this.cl_email === ''){er +='Falta email \n';}
              if(this.cl_direccion === ''){er +='Falta direccion \n';}
              if(this.cl_ciudad === ''){er +='Falta ciudad \n';}
              if(this.cl_zona === ''){er +='Falta zona \n';}
              if(this.cl_localidad === ''){er +='Falta localidad \n';}
              if(this.cl_barrio === ''){er +='Falta barrio \n';}
              if(this.cl_genero === ''){er +='Falta genero \n';}
             return er;
         },
         busca: function(){
             det = this.searchKey;
             axios.get('/cliV/:'+det, { 
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
              this.cl_idempresa = item.cl_idempresa;
              this.cl_tipodocumento = item.cl_tipodocumento;
              this.cl_documentoid = item.cl_documentoid;
              this.cl_nombre = item.cl_nombre;
              this.cl_telefono = item.cl_telefono;
              this.cl_email = item.cl_email;
              this.cl_direccion = item.cl_direccion;
              this.cl_ciudad = item.cl_ciudad;
              this.cl_zona = item.cl_zona;
              this.cl_localidad = item.cl_localidad;
              this.cl_barrio = item.cl_barrio;
              this.cl_genero = item.cl_genero;
              this.cl_estado = item.cl_estado;
              this.formulario = true;
            }
            if(op==='B'){
                if(confirm('Va aborrar a ' + item.cl_nombre+ '?')){
                    axios.get('/clidelete/'+item.id, { 
                    }).then(response => {
                         this.leeRegistros();  
                    }).catch(e => {
                        console.log(e);
                    });
                };
            }
        },
        leeRegistros(){
            axios.get('/clilist', {})
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

// >>>>>>>   Creado por: Alvaro Ortiz Castellanos   Thursday,Oct 01, 2020 9:22:56   
