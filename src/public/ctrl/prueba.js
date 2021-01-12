var data =  {   
    form_title: ' LISTA DE PRUEBAS',
    form_btnNuevo:'Nuevo registro',
    form_btnActualiza:'Actualiza',
    form_btnEdita:'Edita',
    form_btnAnula:'Anula',  
    form_btnDelete:'Borra',  
    form_btnBuscar:' ? ',  
    lblid:'id',
    lblpr_codigo:'codigo',
    lblpr_detalle:'detalle',
    lblpr_estado:'estado',
    lblpr_radios:'radios',
     lblpr_radios0:'radios0',
     lblpr_radios1:'radios1',
    lblpr_hoy:'hoy',
    lblpr_check:'check',
     lblpr_check0:'check0',
     lblpr_check1:'check1',
     lblpr_check2:'check2',
     lblpr_check3:'check3',
    lblpr_texto:'texto',
    lblpr_password:'password',
    lblpr_email:'email',
    lblpr_listadespl:'listadespl',

    id:'',
    pr_codigo:'',
    pr_detalle:'',
    pr_estado:'',
    pr_radios:'',
    pr_radios0:'0',
    pr_radios1:'1',
    pr_hoy:'',
    pr_check:'',
    pr_check0:'0',
    pr_check1:'1',
    pr_check2:'2',
    pr_check3:'3',
    pr_texto:'',
    pr_password:'',
    pr_email:'',
    pr_listadespl:'',

    id:0,
    form_busqueda:'Buscar: ',
    searchKey:''
    };

const vm = new Vue({
    el: '#apppruebas',
    data:data,
    methods: {
        nuevo: function(){
            this.id=0;
            this.pr_codigo='';
            this.pr_detalle='';
            this.pr_estado='';
            this.pr_radios='';
            this.pr_hoy='';
            this.pr_check='';
            this.pr_texto='';
            this.pr_password='';
            this.pr_email='';
            this.pr_listadespl='';
             $('#idForm').slideToggle();
         },
         formToggle: function(){
             $('#idForm').slideToggle();
       },

        borrar: function(id){
            var fila = document.getElementById(id),
            cells = fila.getElementsByTagName('td');
            var detalle= cells[1].innerHTML;
            if(confirm('Va a borrar : ' + detalle +' ?')){
                axios.get('/prudelete/'+id, { 
                }).then(function (response) {
                    console.log(response); 
                }).catch(e => {
                    console.log(e);
                });
            };
        },

         editar: function(id){
             var valores = '';
             var fila = document.getElementById(id)
             cells = fila.getElementsByTagName('td');
             this.id = id;
              this.id = cells[0].innerHTML;
              this.pr_codigo = cells[1].innerHTML;
              this.pr_detalle = cells[2].innerHTML;
              this.pr_estado = cells[3].innerHTML;
              this.pr_radios = cells[4].innerHTML;
              this.pr_hoy = cells[5].innerHTML;
              this.pr_check = cells[6].innerHTML;
              this.pr_texto = cells[7].innerHTML;
              this.pr_password = cells[8].innerHTML;
              this.pr_email = cells[9].innerHTML;
              this.pr_listadespl = cells[10].innerHTML;
             $('#idForm').slideToggle();
         },

         crear: function() {
             var er='';
             er=this.valida();
             if(er === ''){
                 if(this.id===0){
                  axios.post('/pruadd', { 
                   id:this.id,
                   pr_codigo:this.pr_codigo,
                   pr_detalle:this.pr_detalle,
                   pr_estado:this.pr_estado,
                   pr_radios:this.pr_radios,
                   pr_hoy:this.pr_hoy,
                   pr_check:this.pr_check,
                   pr_texto:this.pr_texto,
                   pr_password:this.pr_password,
                   pr_email:this.pr_email,
                   pr_listadespl:this.pr_listadespl,
                     }).then(function (response) {
                         $('#idForm').slideToggle();   
                     }).catch(e => {
                         console.log(e);
                     });
             }else{

                 axios.put('pruadd/'+this.id, {
                   id:this.id,
                   pr_codigo:this.pr_codigo,
                   pr_detalle:this.pr_detalle,
                   pr_estado:this.pr_estado,
                   pr_radios:this.pr_radios,
                   pr_hoy:this.pr_hoy,
                   pr_check:this.pr_check,
                   pr_texto:this.pr_texto,
                   pr_password:this.pr_password,
                   pr_email:this.pr_email,
                   pr_listadespl:this.pr_listadespl,
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
              if(this.id === ''){er +='Falta id \n';}
              if(this.pr_codigo === ''){er +='Falta codigo \n';}
              if(this.pr_detalle === ''){er +='Falta detalle \n';}
              if(this.pr_estado === ''){er +='Falta estado \n';}
              if(this.pr_radios === ''){er +='Falta radios \n';}
              if(this.pr_hoy === ''){er +='Falta hoy \n';}
              if(this.pr_check === ''){er +='Falta check \n';}
              if(this.pr_texto === ''){er +='Falta texto \n';}
              if(this.pr_password === ''){er +='Falta password \n';}
              if(this.pr_email === ''){er +='Falta email \n';}
              if(this.pr_listadespl === ''){er +='Falta listadespl \n';}
             return er;
         },
         busca: function(){
             det = this.searchKey;
             axios.get('/tipos/:'+det, { 
             }).then(function (response) {
                 console.log(response);            
             }).catch(e => {
                 console.log(e);
             });           
         },

         reloadList: function() {
             this.get('pru').then(function(response){
             this.data = response.body;
             }, function(){
                 alert('Error!');
             });
         } ,
         mounted() {
             alert(this.data.length)
         },    
     }
 });
 



// >>>>>>>   Creado por: Alvaro Ortiz Castellanos   Monday,Aug 10, 2020 4:25:01   <<<<<<< 
