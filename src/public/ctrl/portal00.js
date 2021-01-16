var data =  {   
    titulo: 'Ventas por Internet',
    form_btnInicio:'Inicio', 
    form_btnActualiza:'',
    form_btnContinua:'Continua',
    form_btnEmpresa:'Nuestra Empresa',
    form_btnContactos:'Contáctenos',
    form_btnDelete:'Elimina',
    form_btnHacePedido:'Hacer pedido',
    form_btnGrabaCliente:'Registra cliente',
    lblcl_tipodocumento:'tipo documento',
    lblcl_tipodocumento0:'C.Ciudadanía',
    lblcl_tipodocumento1:'C.Extrangería',
    lblcl_tipodocumento2:'Nit',
    lblcl_tipodocumento3:'Pasaporte',
    lblcl_documentoid:'Nro Documento',
    lblcl_nombre:'nombre',
    lblcl_telefono:'teléfono',
    lblcl_email:'email',
    lblcl_direccion:'dirección',
    lblcl_ciudad:'ciudad',
    lblcl_genero:'Género',
    lblcl_genero0:'Masculino',
    lblcl_genero1:'Femenino',
    imgCarrito:'/logos/car1.jpg',
    tipos:'',
    empresa:'1',
    datos:[],
    prods:[],
    empre:[],
    rec:[],
    empresas:false,
    contactos:false,
    carcito:false,
    productos:true,
    imagenes:false,
    detalles:false,
    seenPedido:false,
    seenCliente:false,
    seenDetalleCli:false,
    btn_send:'Enviar',
    lblct_celular:'Teléfono:',
    lblct_name:'Nombre:',
    lblct_email:'Correo electrónico:',
    lblct_message:'Mensage',
    form_title: 'Contáctenos',
    form_misCompras:'Mis Compras',
    lblcl_nombre:'Nombre',
    lblcl_telefono:'Teléfono',
    lblcl_direccion:'Dirección',
    lblcl_ciudad:'Ciudad',
    lblcl_barrio:'Barrio',
    lblcl_email:'E-mail',
    cl_idempresa:'1',
    cl_tipodocumento:'',
    cl_documentoid:'',
    cl_telefono:'',
    cl_nombre:'',
    cl_direccion:'',
    cl_ciudad:'',
    cl_barrio:'',
    cl_email:'',
    cl_genero:'F',
    cl_zona:'',
    cl_localidad:'', 
    cl_estado:'', 
   
    carAdd:'Comprar',
    carNro:'Cantidad',
    pr_tipoproductoId:'',
    pr_titulo:'',
    pr_marca:'',
    pr_referencia:'',
    pr_precio:'',
    pr_descPesos:'',
    pr_descPorcentaje:'',
    pr_iva:'',
    pr_idTipo:'',
    pr_descipcion:'',
    id:'',
    pr_foto:'',
    descuento:0,
    vlrIva:0,
    neto:0,
    subPrecio:0,
    subDescuento:0,
    subIva:0,
    subNeto:0,
    carcantidad:1,
    imagen:'/logos/',
    contact: {			
        name: '',
        email: '',
        message: '',
        celular:'',
    },
    arrCar:[],
    arrCli:[],
    seen: true,
    isSending: false
};

const vm = new Vue({  
    el: '#app',
    data: data,
    mounted () {  
        axios.get('/tipoPortal/'+this.empresa, { 
      }).then(response => {
          this.datos=response.data;                    
      }).catch(e => {
          console.log(e);
      })
       axios.get('portal0',{
        }).then(response => {
            this.rec=response.data;   
            this.imagen += this.rec.data[0].pm_logo;       
        }).catch(e => {
            console.log(e);
        })     
    },
    created() {
        this.traeProducto('OFERTAS');
    },
    methods: {
        fechaHoy: function(){
            var f = new Date();
            return f.getFullYear() +'-' + (f.getMonth() +1) + "-" +f.getDate();            
        },
        cambiaTipo: function(){
            this.traeProducto(this.tipos)
        },
        inicio: function(){           
        },
  
        compras:function(){
            alert('compras');  
        },
        getImgUrl(index){
            this.foto="./img/"+this.datos.data[index].pr_idtipo+"/"+this.datos.data[index].pr_foto;
            return(this.foto);
        },
        formatValue(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        traeProducto: function(tipo){          
            llave=this.empresa+'||'+tipo+'||'+this.fechaHoy()
            axios.get('/prodPortal/'+llave, { 
            }).then(response => {
                this.prods=response.data;                    
            }).catch(e => {
                console.log(e);
            })
        },

        muestraImagenes: function(item){
            this.detalles=true;
            this.id=item.id;
            this.pr_descipcion = item.pr_descipcion;
            this.pr_titulo = item.pr_codigo;
            this.pr_marca = item.pr_marca;
            this.pr_referencia = item.pr_referencia;
            this.pr_precio = item.pr_precio.toFixed(2);
            this.descuento = 0;
            if (item.pr_descPesos > 0){
                this.descuento = item.pr_descPesos;
            }
            else if(item.pr_descPorcentaje  > 0){
                this.descuento = item.pr_precio * item.pr_descPorcentaje / 100;
            }
            miIva = (item.pr_precio - this.descuento) / (1 + item.pr_iva / 100);
           
            this.vlrIva = ((item.pr_precio - this.descuento) - miIva).toFixed(2);
            this.neto = (item.pr_precio  - this.descuento).toFixed(2);
            this.pr_descPesos = item.pr_descPesos;
            this.pr_descPorcentaje = item.pr_descPorcentaje;
            this.pr_iva = item.pr_iva;
            this.pr_idTipo = item.pr_idTipo;
            this.pr_tipoproductoId = item.pr_tipoproductoId;
            this.pr_foto = 'img/' + this.pr_idTipo + '/' + item.pr_foto;
            this.carcantidad=0;
        }, 
        addCar: function(){
            if(this.carcantidad<=0){
                alert('la cantidad debe ser mayor a 0');
                return;
            }
            this.arrCar.push({"id":this.id,"pr_titulo":this.pr_titulo,
            "pr_marca":this.pr_marca,"pr_referencia":this.pr_referencia,
            "pr_descipcion":this.pr_descipcion,"pr_precio":this.pr_precio,
            "descuento":this.descuento,"pr_iva":this.pr_iva,
            "vlrIva":this.vlrIva,"neto":this.neto,"carcantidad":this.carcantidad,
            "pr_foto":this.pr_foto});
            this.detalles=false
        },
        miCarrito: function(){
            this.carcito=true;
            this.subPrecio=0;
            this.subDescuento=0;
            this.subIva=0;
            this.subNeto=0;
            this.id=0;
            for (i=0;i<this.arrCar.length;i++){
                canti = this.arrCar[i].carcantidad;
                this.subPrecio += this.arrCar[i].pr_precio * canti;
                this.subDescuento += this.arrCar[i].descuento * canti;
                this.subIva += this.arrCar[i].vlrIva * canti;
                this.subNeto += this.arrCar[i].neto * canti;
            }
        },
        borraCarrito: function(item){
            var index=-1;
            
            for (i=0;i<this.arrCar.length;i++){
                if (this.arrCar[i].id === item.id) {
                    index=i
                }
            }
            if (index > -1) {
                this.arrCar.splice(index, 1);
              }
              this.miCarrito();
        },
        hacePedido: function(){
            this.seen=true;
            var a='';
            for (i=0;i<this.arrCar.length;i++){
              a +=this.arrCar[i].pr_descipcion+'|';
            }
            if(a===''){
                alert('No ha seleccionado ningún artículo');
                return;
            }
            alert(a);
        },
        
        grabaCliente: function(){
            er='';
            if(this.cl_telefono===''){er+='Falta telefono \n'}
            if(this.cl_nombre===''){er+='Falta Nombre \n'}
            if(this.cl_direccion===''){er+='Falta Dirección \n'}
            if(this.cl_ciudad===''){er+='Falta Ciudad \n'}
            if(this.cl_barrio===''){er+='Falta Barrio \n'}
            if(this.cl_email===''){er+='Falta E-mail \n'}
            if(er==''){
                this.seenPedido=true;
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
                    cl_estado:'A',                    
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
        valiCliente:  function(){
            var er='';
            if(this.cl_tipodocumento === ''){
                er +='Falta tipo de documento \n';
            }
            if(this.cl_documentoid === ''){
                er +='Falta numero de documento \n';
            }
            if (er===''){
                var id = this.cl_tipodocumento +'||' +  this.cl_documentoid;
     
        const sendGetRequest = async() => {
         try{
        const response = await  axios.get('/clientes/:'+id);
            this.seenCliente=true;
            this.seenPedido=true;
            this.form_btnGrabaCliente='Registra cliente';
            this.arrCli=response.data;     
            this.id = this.arrCli.data[0].id;     
            this.cl_telefono=this.arrCli.data[0].cl_telefono;
            this.cl_nombre=this.arrCli.data[0].cl_nombre;
            this.cl_direccion=this.arrCli.data[0].cl_direccion;
            this.cl_ciudad=this.arrCli.data[0].cl_ciudad;
            this.cl_barrio=this.arrCli.data[0].cl_barrio;
            this.cl_email=this.arrCli.data[0].cl_email;                    
            this.cl_genero=this.arrCli.data[0].cl_genero
            this.cl_zona=this.arrCli.data[0].cl_zona
            this.cl_localidad=this.arrCli.data[0].cl_localidad
            this.cl_estado=this.arrCli.data[0].cl_estado  
            if(this.cl_nombre !==''){
                this.form_btnGrabaCliente='Actualiza cliente';
            }        
         }catch(err){
             console.error(err)
         }
     };
     this.seenDetalleCli=true;
     sendGetRequest();
 //           grabaCliente 
            }           
        },
        miEmpresa: function(){
            this.empresas=true;
            axios.get('/emplist', { 
            }).then(response => {
                this.empre=response.data;                    
            }).catch(e => {
                console.log(e);
            })
        }
    },
});