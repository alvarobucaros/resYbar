var data =  {   
    form_title: 'LA EMPRESA ',
    form_btnNuevo:'Nuevo registro',
    form_btnActualiza:'Actualiza',
    form_btnEdita:'Edita',
    form_btnAnula:'Anula',  
    form_btnDelete:'Borra',  
    form_btnBuscar:' ? ',  
    lblid:'id',
    lblem_nombre:'nombre',
    lblem_direccion:'direccion',
    lblem_zona:'zona',
    lblem_localidad:'localidad',
    lblem_barrio:'barrio',
    lblem_nit:'nit',
    lblem_telefono:'telefono',
    lblem_email:'email',
    lblem_usuario:'usuario',
    lblem_sloganppal:'clave',
    lblem_negocio:'negocio',
    lblem_ciudad:'ciudad',
    lblem_negocio0:'Bar',
    lblem_negocio1:'Restaurante',
    lblem_negocio2:'Venta electrónica',
    lblem_observaciones:'observaciones',
    lblem_slogansec:'estado',
    lblem_slogansec0:'Activo',
    lblem_slogansec1:'Inactivo',
    lblem_autentica:'autentica',
    lblem_autentica0:'E-Mail',
    lblem_autentica1:'Celular',
    lblem_autentica2:'Documento Id',
    // rec:[{'id':'','em_nombre':'','em_direccion':'','em_zona':'','em_localidad':'',
    // 'em_barrio':'','em_nit':'','em_telefono':'','em_email':'','em_usuario':'',
    // 'em_sloganppal':'','em_negocio':'', 'em_observaciones':'', 'em_slogansec':'', 'em_autentica':''}],
    id:'0',
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
    em_negocio:'',
    em_negocio0:'B',
    em_negocio1:'R',
    em_negocio2:'C',
    em_observaciones:'',
    em_slogansec:'',
    em_slogansec0:'A',
    em_slogansec1:'I',
    em_autentica:'',
    em_autentica0:'M',
    em_autentica1:'C',
    em_autentica2:'D',
    em_ciudad:'',
    rec:[],
    datos:[]
 };

const vm = new Vue({
    el: '#appempresas',
    data:data,
    
        mounted () { 
            axios.get('/emplist', { 
          }).then(response => {
              this.datos=response.data.data;
              this.rec=this.datos;
          }).catch(e => {
              console.log(e);
          })
        },
   
    methods: {
        nuevo: function(){
            this.rec={'id':1,'em_nombre':'','em_direccion':'','em_zona':'','em_localidad':'',
            'em_barrio':'','em_nit':'','em_telefono':'','em_email':'','em_usuario':'',
            'em_sloganppal':'','em_negocio':'R', 'em_observaciones':'', 'em_slogansec':'A', 
            'em_autentica':'','em_ciudad':''};        
             $('#idForm').slideToggle();
         },
         formToggle: function(){
             $('#idForm').slideToggle();
       },

         crear: function() {
             alert('crar' +this.rec.id);
             var er='';
             er=this.valida();
             if(er === ''){
                 if(this.id===0){
                   axios.post('/empadd', { 
                   id:this.rec.id,
                   em_nombre:this.rec.em_nombre,
                   em_direccion:this.rec.em_direccion,
                   em_zona:this.rec.em_zona,
                   em_localidad:this.rec.em_localidad,
                   em_barrio:this.rec.em_barrio,
                   em_ciudad:this.rec.em_ciudad,
                   em_nit:this.rec.em_nit,
                   em_telefono:this.rec.em_telefono,
                   em_email:this.rec.em_email,
                   em_usuario:this.rec.em_usuario,
                   em_sloganppal:this.rec.em_sloganppal,
                   em_negocio:this.rec.em_negocio,
                   em_observaciones:this.rec.em_observaciones,
                   em_slogansec:this.rec.em_slogansec,
                   em_autentica:this.rec.em_autentica,
                     }).then(function (response) {
                         $('#idForm').slideToggle();   
                     }).catch(e => {
                         console.log(e);
                     });
             }else{

                 axios.put('empadd/'+this.rec.id, {
                    id:this.rec.id,
                    em_nombre:this.rec.em_nombre,
                    em_direccion:this.rec.em_direccion,
                    em_zona:this.rec.em_zona,
                    em_localidad:this.rec.em_localidad,
                    em_barrio:this.rec.em_barrio,
                    em_ciudad:this.rec.em_ciudad,
                    em_nit:this.rec.em_nit,
                    em_telefono:this.rec.em_telefono,
                    em_email:this.rec.em_email,
                    em_usuario:this.rec.em_usuario,
                    em_sloganppal:this.rec.em_sloganppal,
                    em_negocio:this.rec.em_negocio,
                    em_observaciones:this.rec.em_observaciones,
                    em_slogansec:this.rec.em_slogansec,
                    em_autentica:this.rec.em_autentica,
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

         valida: function(){
             er='';
              if(this.rec.id === ''){er +='Falta id \n';}
              if(this.rec.em_nombre === ''){er +='Falta nombre \n';}
              if(this.rec.em_direccion === ''){er +='Falta direccion \n';}
              if(this.rec.em_zona === ''){er +='Falta zona \n';}
              if(this.rec.em_localidad === ''){er +='Falta localidad \n';}
              if(this.rec.em_barrio === ''){er +='Falta barrio \n';}
              if(this.rec.em_ciudad === ''){er +='Falta ciudad \n';}
              if(this.rec.em_nit === ''){er +='Falta nit \n';}
              if(this.rec.em_telefono === ''){er +='Falta telefono \n';}
              if(this.rec.em_email === ''){er +='Falta email \n';}
              if(this.rec.em_usuario === ''){er +='Falta usuario \n';}
              if(this.rec.em_sloganppal === ''){er +='Falta clave \n';}
              if(this.rec.em_negocio === ''){er +='Falta negocio \n';}
              if(this.rec.em_observaciones === ''){er +='Falta observaciones \n';}
              if(this.rec.em_slogansec === ''){er +='Falta estado \n';}
              if(this.rec.em_autentica === ''){er +='Falta autentica \n';}
             return er;
         },
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
         return value.split(' ').splice(0,20).join(' ') + '...';
     }
     }
 });
 
// >>>>>>>   Creado por: Alvaro Ortiz Castellanos   Monday,Aug 17, 2020 6:12:01   <<<<<<< 
