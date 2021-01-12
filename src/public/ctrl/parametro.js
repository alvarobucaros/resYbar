var data =  {   
    form_title:  ' PARAMETROS APP',
    form_btnNuevo:'Nuevo registro',
    form_btnActualiza:'Actualiza',
    form_btnEdita:'Edita',
    form_btnAnula:'Anula',  
    form_btnDelete:'Borra',  
    form_btnBuscar:' ? ', 
    form_btnSubir:'Cargar foto', 
    lblid:'id',
    lblpm_idempresa:'empresa',
    lblpm_representante:'representante legal',
    lblpm_web:'página web',
    lblpm_email:'email',
    lblpm_banco:'banco',
    lblpm_tipocuenta: 'Tipo cuenta',
    lblpm_tipocuenta0:'Ahorros',
    lblpm_tipocuenta1:'Corriente',
    lblpm_cuenta:'nro. cuenta',
    lblpm_logo:'logo',
    lblpm_consecpedido:'consec pedido',
    lblpm_consecfactura:'consec factura',
    lblpm_whatsapp:'Youtube',
    lblpm_facebook:'FaceBook',
    lblpm_instagram:'Instagram',
    lblpm_twitter:'Twitter',
    rec:[{'id':'','pm_idempresa':'','pm_representante':'','pm_web':'','pm_email':'',
    'pm_banco':'','pm_cuenta':'','pm_logo':'','pm_consecpedido':'','pm_consecfactura':'',
    'pm_whatsapp':'','pm_facebook':'','pm_instagram':'','pm_twitter':'',}],
    id:'',
    pm_idempresa:'',
    pm_representante:'',
    pm_web:'',
    pm_email:'',
    pm_banco:'',
    pm_cuenta:'',
    pm_tipocuenta:'',
    pm_logo:'',
    pm_consecpedido:'',
    pm_consecfactura:'',
    pm_whatsapp:'',
    pm_facebook:'',
    pm_instagram:'',
    pm_twitter:'',
    id:0,
    datos:[{'id':'','pm_idempresa':'','pm_representante':'','pm_web':'','pm_email':'',
    'pm_banco':'','pm_cuenta':'','pm_logo':'','pm_consecpedido':'','pm_consecfactura':'',
    'pm_whatsapp':'','pm_facebook':'','pm_instagram':'','pm_twitter':'',}]
 };

const vm = new Vue({
    el: '#appparametros',
    data:data,
    
        mounted () { 
            axios.get('/parlist', { 
          }).then(response => {
              this.datos=response.data.data[0]; 
              this.rec=response.data.data[0]; 
          }).catch(e => {
              console.log(e);
          })
        },
   
    methods: {
        nuevo: function(){
            this.rec={'id':'0','pm_idempresa':'','pm_representante':'','pm_web':'','pm_email':'',
            'pm_banco':'','pm_cuenta':'','pm_tipocuenta':'','pm_logo':'','pm_consecpedido':'0000000000',
            'pm_consecfactura':'000000000','pm_whatsapp':'','pm_facebook':'','pm_instagram':'',
            'pm_twitter':''};  
             $('#idForm').slideToggle();
         },
         formToggle: function(){
             $('#idForm').slideToggle();
       },
       handleAttachment: function(e){
           var vm = this
           var files = e.target.files || e.dataTransfer.files
           if (!files.length) return
     
           var data = new window.FormData()
           data.append('attachment', files[0])
           var imagen = files[0];
           const fileTypes = /jpeg|jpg|png|gif|PNG/;
           const mimetype = fileTypes.test(imagen.type);
           const path_extname = imagen.name.split('.').pop();
           const extname = fileTypes.test(path_extname);
           if(!mimetype || !extname){
              alert('no es una imagen');
              return;
           }
           if(imagen.size > 1000000){
                alert('imagen debe ser menor o igual a un mega');
                return;    
           }
           imagen = imagen.name + '|1';
           axios.get('/updateLogo/'+imagen, {               
           })
             .then(res => {
                 if(res.status===200){
                    window.alert('clic en cargar foto para subirla al servidor')
                 }
            })
        },                

         crear: function() {
             var er='';
             er=this.valida();
             if(er === ''){
                 if(this.rec.id===0){
                     axios.post('/paradd', { 
                     id:this.id,
                     pm_idempresa:this.rec.pm_idempresa,
                     pm_representante:this.rec.pm_representante,
                     pm_web:this.rec.pm_web,
                     pm_email:thisrec.pm_email,
                     pm_banco:this.rec.pm_banco,
                     pm_cuenta:this.rec.pm_cuenta,
                     pm_tipocuenta:this.rec.pm_tipocuenta,
                     pm_logo:this.rec.pm_logo,
                     pm_consecpedido:this.rec.pm_consecpedido,
                     pm_consecfactura:this.rec.pm_consecfactura,
                     pm_whatsapp:this.rec.pm_whatsapp,
                     pm_facebook:this.rec.pm_facebook,
                     pm_instagram:this.rec.pm_instagram,
                     pm_twitter:this.rec.pm_twitter,
                     }).then(function (response) {
                         $('#idForm').slideToggle();   
                     }).catch(e => {
                         console.log(e);
                     });
             }else{
                 axios.put('paradd/'+this.rec.id, {
                   id:this.rec.id,
                   pm_idempresa:this.rec.pm_idempresa,
                   pm_representante:this.rec.pm_representante,
                   pm_web:this.rec.pm_web,
                   pm_email:this.rec.pm_email,
                   pm_banco:this.rec.pm_banco,
                   pm_cuenta:this.rec.pm_cuenta,
                   pm_tipocuenta:this.rec.pm_tipocuenta,
                   pm_logo:this.rec.pm_logo,
                   pm_consecpedido:this.rec.pm_consecpedido,
                   pm_consecfactura:this.rec.pm_consecfactura,
                   pm_whatsapp:this.rec.pm_whatsapp,
                   pm_facebook:this.rec.pm_facebook,
                   pm_instagram:this.rec.pm_instagram,
                   pm_twitter:this.rec.pm_twitter,
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
 
        borrar: function(id){
             return true;
        },

         editar: function(id){
             return true;
         },

         valida: function(){
             er='';
              if(this.rec.id === ''){er +='Falta id \n';}
              if(this.rec.pm_idempresa === ''){er +='Falta idempresa \n';}
              if(this.rec.pm_representante === ''){er +='Falta representante \n';}
              if(this.rec.pm_web === ''){er +='Falta web \n';}
              if(this.rec.pm_email === ''){er +='Falta email \n';}
              if(this.rec.pm_banco === ''){er +='Falta banco \n';}
              if(this.rec.pm_cuenta === ''){er +='Falta cuenta \n';}
              if(this.rec.pm_tipocuenta === ''){er +='Falta tipo cuenta \n';}
              if(this.rec.pm_logo === ''){er +='Falta logo \n';}
              if(this.rec.pm_consecpedido === ''){er +='Falta consecpedido \n';}
              if(this.rec.pm_consecfactura === ''){er +='Falta consecfactura \n';}
             return er;
         },
    },
 });
 
// >>>>>>>   Creado por: Alvaro Ortiz Castellanos   Tuesday,Aug 18, 2020 12:49:41   <<<<<<< 
