var data =  {   
    form_title: ' MI EMPRESA ',
    form_btnNuevo:'Nuevo registro',
    form_btnActualiza:'Actualiza',
    form_btnEdita:'Edita',
    form_btnAnula:'Anula',  
    form_btnDelete:'Borra',  
    form_btnBuscar:' ? ',  
    lblid:'id',
    lblem_nombre:'nombre',
    lblem_direccion:'dirección',
    lblem_zona:'zona',
    lblem_localidad:'localidad',
    lblem_barrio:'barrio',
    lblem_nit:'nit',
    lblem_telefono:'teléfono',
    lblem_email:'email',
    lblem_usuario:'usuario',
    lblem_sloganppal:'título slogan',
    lblem_slogansec:'otro slogan ',
    lblem_negocio:'negocio',
    lblem_negocio0:'Bar',
    lblem_negocio1:'Restaurante',
    lblem_negocio2:'Venta Electrónica',
    lblem_observaciones:'observaciones',
    lblem_autentica:'autentica',
    lblem_autentica0:'E-mail',
    lblem_autentica1:'Nro Celular',
    lblem_autentica2:'Documento Id',
    lblem_ciudad:'ciudad',

    id:'',
    em_nombre:'',
    em_direccion:'',
    em_zona:'',
    em_localidad:'',
    em_barrio:'',
    em_nit:'',
    em_telefono:'',
    em_email:'',
    em_usuario:'',
    em_sloganppal:'',
    em_slogansec:'',
    em_negocio:'',
    em_negocio0:'B',
    em_negocio1:'R',
    em_negocio2:'C',
    em_observaciones:'',
    em_autentica:'',
    em_autentica0:'M',
    em_autentica1:'C',
    em_autentica2:'D',
    em_ciudad:'',

    id:0,
    datos:[ 'id' , 'em_nombre' , 'em_direccion' , 'em_zona' , 'em_localidad' , 
    'em_barrio' , 'em_nit' , 'em_telefono' , 'em_email' , 'em_usuario' , 
    'em_sloganppal' , 'em_slogansec' , 'em_negocio' , 'em_observaciones' , 
    'em_autentica' , 'em_ciudad' ],
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
    el: '#appempresas',
    data:data,
        created () { 
            this.leeRegistros(); 
        },
    
    methods: {
        nuevo: function(){
            this.id=0;
            this.em_nombre=0;
            this.em_direccion=0;
            this.em_zona=0;
            this.em_localidad=0;
            this.em_barrio=0;
            this.em_nit=0;
            this.em_telefono=0;
            this.em_email=0;
            this.em_usuario=0;
            this.em_sloganppal=0;
            this.em_slogansec=0;
            this.em_negocio=0;
            this.em_observaciones=0;
            this.em_autentica=0;
            this.em_ciudad=0;
            this.formulario=true;
             $('#idForm').slideToggle();
         },

         crear: function() {
             var er='';
             er=this.valida();
             if(er === ''){
                 if(this.id===0){
                     axios.post('/empadd', { 
                   id:this.id,
                   em_nombre:this.em_nombre,
                   em_direccion:this.em_direccion,
                   em_zona:this.em_zona,
                   em_localidad:this.em_localidad,
                   em_barrio:this.em_barrio,
                   em_nit:this.em_nit,
                   em_telefono:this.em_telefono,
                   em_email:this.em_email,
                   em_usuario:this.em_usuario,
                   em_sloganppal:this.em_sloganppal,
                   em_slogansec:this.em_slogansec,
                   em_negocio:this.em_negocio,
                   em_observaciones:this.em_observaciones,
                   em_autentica:this.em_autentica,
                   em_ciudad:this.em_ciudad,
                     }).then(response => {
                           this.leeRegistros();
                           this.formulario=false;
                     }).catch(e => {
                         console.log(e);
                     });
             }else{
                 axios.put('empadd/'+this.id, {
                   id:this.id,
                   em_nombre:this.em_nombre,
                   em_direccion:this.em_direccion,
                   em_zona:this.em_zona,
                   em_localidad:this.em_localidad,
                   em_barrio:this.em_barrio,
                   em_nit:this.em_nit,
                   em_telefono:this.em_telefono,
                   em_email:this.em_email,
                   em_usuario:this.em_usuario,
                   em_sloganppal:this.em_sloganppal,
                   em_slogansec:this.em_slogansec,
                   em_negocio:this.em_negocio,
                   em_observaciones:this.em_observaciones,
                   em_autentica:this.em_autentica,
                   em_ciudad:this.em_ciudad,
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
              if(this.em_nombre === ''){er +='Falta nombre \n';}
              if(this.em_direccion === ''){er +='Falta direccion \n';}
              if(this.em_zona === ''){er +='Falta zona \n';}
              if(this.em_localidad === ''){er +='Falta localidad \n';}
              if(this.em_barrio === ''){er +='Falta barrio \n';}
              if(this.em_nit === ''){er +='Falta nit \n';}
              if(this.em_telefono === ''){er +='Falta telefono \n';}
              if(this.em_email === ''){er +='Falta email \n';}
              if(this.em_usuario === ''){er +='Falta usuario \n';}
              if(this.em_sloganppal === ''){er +='Falta sloganppal \n';}
              if(this.em_slogansec === ''){er +='Falta slogansec \n';}
              if(this.em_negocio === ''){er +='Falta negocio \n';}
              if(this.em_observaciones === ''){er +='Falta observaciones \n';}
              if(this.em_autentica === ''){er +='Falta autentica \n';}
             return er;
         },
         busca: function(){
             det = this.searchKey;
             axios.get('/empV/:'+det, { 
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
              this.em_nombre = item.em_nombre;
              this.em_direccion = item.em_direccion;
              this.em_zona = item.em_zona;
              this.em_localidad = item.em_localidad;
              this.em_barrio = item.em_barrio;
              this.em_nit = item.em_nit;
              this.em_telefono = item.em_telefono;
              this.em_email = item.em_email;
              this.em_usuario = item.em_usuario;
              this.em_sloganppal = item.em_sloganppal;
              this.em_slogansec = item.em_slogansec;
              this.em_negocio = item.em_negocio;
              this.em_observaciones = item.em_observaciones;
              this.em_autentica = item.em_autentica;
              this.em_ciudad = item.em_ciudad;
              this.formulario = true;
            }
            if(op==='B'){
                if(confirm('Va aborrar a ' + item.em_nombre+ '?')){
                    axios.get('/empdelete/'+item.id, { 
                    }).then(response => {
                         this.leeRegistros();  
                    }).catch(e => {
                        console.log(e);
                    });
                };
            }
        },
        leeRegistros(){
            axios.get('/emplist', {})
            .then(response => {
              this.datos=response.data.data[0]; 
              this.id = this.datos.id;
              this.em_nombre = this.datos.em_nombre;
              this.em_direccion = this.datos.em_direccion;
              this.em_zona = this.datos.em_zona;
              this.em_localidad = this.datos.em_localidad;
              this.em_barrio = this.datos.em_barrio;
              this.em_nit = this.datos.em_nit;
              this.em_telefono = this.datos.em_telefono;
              this.em_email = this.datos.em_email;
              this.em_usuario = this.datos.em_usuario;
              this.em_sloganppal = this.datos.em_sloganppal;
              this.em_slogansec = this.datos.em_slogansec;
              this.em_negocio = this.datos.em_negocio;
              this.em_observaciones = this.datos.em_observaciones;
              this.em_autentica = this.datos.em_autentica;
              this.em_ciudad = this.datos.em_ciudad;
              this.formulario = true;
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
 
// >>>>>>>   Creado por: Alvaro Ortiz Castellanos   Friday,Oct 02, 2020 4:35:30   <<<<<<< 
