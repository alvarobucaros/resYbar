var data =  {   
    form_title: ' CARGA IMAGENES DE PRODUCTOS',
    form_btnNuevo:'Nuevo registro',
    form_btnActualiza:'Actualiza',
    form_btnEdita:'Edita',
    form_btnAnula:'Anula',  
    form_btnDelete:'Borra',  
    form_btnBuscar:' ? ',  
    
    lblid:'id',
    lblim_idEmpresa:'empresa',
    lblpr_idtipo:'Tipo producto',
    lblim_titulo:'Título',
    lblim_idproducto: 'Producto',
    lblim_descripcion:'Descipción',
    lblim_imagen:'Foto',
    lblpr_diasventa:'Días venta',
    lblpr_precio:'Precio',
    lblpr_inventario:'Inventario',
    lblpr_existencias:'Existencias',
    lblpr_descpesos:'Desc pesos',
    lblpr_descporcentaje:'Desc porcentaje',
    lblpr_iva:'IVA',
    lblpr_marca:'Marca',
    lblpr_referencia:'Referencia',
    lblim_estado:'Estado',
    lblim_estado0:'Activo',
    lblim_estado1:'Inactivo',
    lblim_tipo:'Ubicación foto',
    lblim_tipo0:'Principal',
    lblim_tipo1: 'General',
    form_btnSubir:'Cargar foto', 

    id:'',
    im_tipoProductoId:'',
    im_idEmpresa:'1',
    im_titulo:'',
    im_descripcion:'',
    im_imagen:'',
    im_estado:'A',
    im_estado0:'A',
    im_estado1:'I',
    im_tipo:'G',
    id:0,
    im_tipoProductoId:0,
    datos:[],
    foto:'',
    tipoproductos:[],
    productos:[],
    form_busqueda:'Buscar: ',
    searchKey:'',
    tipos:'',
    campo:'',
    page: 1,
    perPage: 12,
    pages: [],
    pageNumber:'',
    formulario:true, 
    detalles:false,
    currentSort:'name',
    currentSortDir:'asc',
    seleccionado:'',
    seleccionapr:'',
 };
 
const vm = new Vue({
    el: '#appproductos',
    data:data,

        mounted() {  
            axios.get('/tipoproductosQry', {})
            .then(response => {
                this.tipoproductos = response.data; 
            }).catch(e => {
                console.log(e);
            })
        },
    
    methods: {
        nuevo: function(){
            this.id=0;
            this.im_tipoProductoId=0,
            this.im_idEmpresa=1;
            this.im_titulo='';
            this.im_descripcion='';
            this.im_imagen='';
            this.im_estado='A';
            this.im_tipo='G';
            this.formulario=true;
            $('#idForm').slideToggle();
         },
         crear: function() {
             var er='';
             er=this.valida();
             if(er === ''){
                 if(this.id===0){
                    axios.post('/imaadd', { 
                    id:this.id,                   
                    im_tipoProductoId:this.im_tipoProductoId,
                    im_idEmpresa:this.im_idEmpresa,
                    im_titulo:this.im_titulo,
                    im_descripcion:this.im_descripcion,
                    im_estado:this.im_estado,
                    im_tipo:this.im_tipo,
                    im_productoId:this.im_productoId,
                    im_imagen:this.im_imagen,
                     }).then(response => {
                           this.leeRegistros();
                           this.formulario=false;
                     }).catch(e => {
                         console.log(e);
                     });
             }else{
                axios.put('proadd/'+this.id, {
                id:this.id,                   
                im_tipoProductoId:this.im_tipoProductoId,
                im_idEmpresa:this.im_idEmpresa,
                im_titulo:this.im_titulo,
                im_descripcion:this.im_descripcion,
                im_estado:this.im_estado,
                im_tipo:this.im_tipo,
                im_productoId:this.im_productoId,
                im_imagen:this.im_imagen,
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
              if(this.im_idEmpresa === ''){er +='Falta idempresa \n';}
              if(this.im_titulo === ''){er +='Falta codigo \n';}
              if(this.im_descripcion === ''){er +='Falta descipcion \n';}
              if(this.im_imagen === ''){er +='Falta foto \n';}
             return er;
         },
         busca: function(){
             det = this.searchKey;
             axios.get('/prolistV/:'+det, { 
             }).then(response => {
                 this.datos=response.data; 
             }).catch(e => {
                 console.log(e);
             });           
         },
         cambiaTipo: function(){
            a=this.seleccionado.split('||')
            this.im_tipoProductoId=a[0]
            this.pr_idtipo= a[1]
            this.detalles= true
            axios.get('/productosQry/:'+this.pr_idtipo,{
            }).then(response => {
                this.productos=response.data; 
               
            }).catch(e => {
                console.log(e);
            }); 
        },

        cambiaProd: function(){
            this.leeRegistros();
        },
        selectOpcion(item,op){
            if(op==='E'){
              app.clickedUser = item;
              this.id = item.id;
              this.im_tipoProductoId = item.im_tipoProductoId
              this.im_idEmpresa = item.im_idEmpresa;
              this.seleccionado = item.im_tipoProductoId+'||'+item.pr_idtipo;
              this.im_titulo = item.im_titulo;
              this.im_descripcion = item.im_descripcion;
              this.im_imagen = item.im_imagen;
              this.im_estado = item.im_estado;
            //  this.formulario = true;
            }
            if(op==='B'){
                if(confirm('Va aborrar a ' + item.im_descripcion+ '?')){
                    axios.get('/prodelete/'+item.id, { 
                    }).then(response => {
                         this.leeRegistros();  
                    }).catch(e => {
                        console.log(e);
                    });
                };
            }
        },
        getImgUrl(index){
            this.foto="./img/"+this.datos.data[index].pr_idTipo+"/"+this.datos.data[index].im_imagen;
            return(this.foto);
        },
        getImgUrlOne(){
            this.foto="./img/"+this.pr_idTipo+"/"+this.im_imagen;
            return(this.foto);            
        },
        imagges: function(){
            window.location="imagenes";
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
        leeRegistros(){
            a=this.seleccionapr;
            b=this.im_tipoProductoId;
            cod=a+'||'+b;
            alert(cod);
            axios.get('/imalist/:'+cod, {})
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
 
// >>>>>>>   Creado por: Alvaro Ortiz Castellanos   Monday,Oct 05, 2020 8:19:34   <<<<<<< 
