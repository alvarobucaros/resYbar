
var data =  {   
    titulo: 'Esto es un ejemplo',
    form_btnInicio:'Inicio', 
    form_btnActualiza:'',
    form_btnContinua:'Continua',
    form_btnEmpresa:'Nuestra Empresa',
    form_btnContactos:'Contáctenos',
    form_btnDelete:'Elimina',
    form_btnHacePedido:'Hacer pedido',
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
    btn_send:'Enviar',
    lblct_celular:'Teléfono:',
    lblct_name:'Nombre:',
    lblct_email:'Correo electrónico:',
    lblct_message:'Mensage',
    form_title: 'Contáctenos',
    form_misCompras:'Mis Compras',
    cl_tipodocumento:'',
    cl_documentoid:'',
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
    miCar:{'id':0,'pr_titulo':'','pr_marca':'','pr_referencia':'','pr_descipcion':'',
    'pr_precio':0,'descuento':0,'pr_iva':0,'vlrIva':0,'neto':0,'carcantidad':0,
    'pr_foto':''},
    arrCar:[],
    arrCli:{},
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
            alert('Hacer pedido');
            var a='';
            for (i=0;i<this.arrCar.length;i++){
              a +=this.arrCar[i].pr_descipcion+'|';
            }
            alert(a);
        },
        valiCliente:  function(){
            var cod='';
            cod += this.cl_tipodocumento +'||' +  this.cl_documentoid;
            alert('vali ciente '+cod);
            //'/clientes/:id'
            axios.get('/clientes/:cod', { 
            }).then(response => {
                this.arrCli=response.data;
                alert(this.arrCli[5]);                    
            }).catch(e => {
                console.log(e);
            })
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