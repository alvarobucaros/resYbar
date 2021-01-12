var data =  {   
    form_title: ' LISTA DE PRODUCTOS',
    form_btnNuevo:'Nuevo registro',
    form_btnActualiza:'Actualiza',
    form_btnEdita:'Edita',
    form_btnAnula:'Anula',  
    form_btnDelete:'Borra',  
    form_btnBuscar:' ? ',  
    form_btnImagges:'Cargar fotos',
    lblid:'id',
    lblpr_idempresa:'empresa',
    lblpr_idtipo:'Tipo producto',
    lblpr_codigo:'Código',
    lblpr_descipcion:'Descipción',
    lblpr_foto:'Foto',
    lblpr_diasventa:'Días venta',
    lblpr_precio:'Precio',
    lblpr_inventario:'Inventario',
    lblpr_existencias:'Existencias',
    lblpr_descpesos:'Desc pesos',
    lblpr_descporcentaje:'Desc porcentaje',
    lblpr_iva:'IVA',
    lblpr_marca:'Marca',
    lblpr_referencia:'Referencia',
    lblpr_estado:'Estado',
    lblpr_estado0:'Activo',
    lblpr_estado1:'Inactivo',
    form_btnSubir:'Cargar foto', 

    id:'',
    pr_tipoproductoId:'',
    pr_idempresa:'',
    pr_idtipo:'',
    pr_codigo:'',
    pr_descipcion:'',
    pr_foto:'',
    pr_diasventa:'Todos',
    pr_precio:'',
    pr_inventario:'',
    pr_existencias:'',
    pr_descpesos:'',
    pr_descporcentaje:'',
    pr_iva:'',
    pr_marca:'',
    pr_referencia:'',
    pr_estado:'A',
    pr_estado0:'A',
    pr_estado1:'I',
    pr_ofertaDesde:'', 
    pr_ofertaHasta:'',
    id:0,
    pr_tipoproductoId:0,
    datos:[],
    foto:'',
    tipoproductos:[],
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
    seleccionado:'',
 };

const vm = new Vue({
    el: '#appproductos',
    data:data,
        created () { 
            this.leeRegistros(); 
        },
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
            var f = new Date();
            this.pr_ofertaDesde=f.getFullYear() +'-' + (f.getMonth() +1) + "-" +f.getDate(), 
            this.pr_ofertaHasta= f.getFullYear() +'-12-31',
            this.id=0;
            this.pr_tipoproductoId=0,
            this.pr_idempresa=1;
            this.pr_idtipo='';
            this.pr_codigo='';
            this.pr_descipcion='';
            this.pr_foto='';
            this.pr_diasventa='';
            this.pr_precio='0';
            this.pr_inventario='0';
            this.pr_existencias='0';
            this.pr_descpesos='0';
            this.pr_descporcentaje='0';
            this.pr_iva='0';
            this.pr_marca='';
            this.pr_referencia='';
            this.pr_estado='A';
            this.formulario=true;
            $('#idForm').slideToggle();
         },
         crear: function() {
             var er='';
             er=this.valida();
             if(er === ''){
                 if(this.id===0){
                     axios.post('/proadd', { 
                   id:this.id,
                   pr_tipoproductoId:this.pr_tipoproductoId,
                   pr_idempresa:this.pr_idempresa,
                   pr_idtipo:this.pr_idtipo,
                   pr_codigo:this.pr_codigo,
                   pr_descipcion:this.pr_descipcion,
                   pr_foto:this.pr_foto,
                   pr_diasventa:this.pr_diasventa,
                   pr_precio:this.pr_precio,
                   pr_inventario:this.pr_inventario,
                   pr_existencias:this.pr_existencias,
                   pr_descpesos:this.pr_descpesos,
                   pr_descporcentaje:this.pr_descporcentaje,
                   pr_iva:this.pr_iva,
                   pr_marca:this.pr_marca,
                   pr_referencia:this.pr_referencia,
                   pr_estado:this.pr_estado,
                   pr_ofertaDesde:this.pr_ofertaDesde,
                   pr_ofertaHasta:this.pr_ofertaHasta,
                     }).then(response => {
                           this.leeRegistros();
                           this.formulario=false;
                     }).catch(e => {
                         console.log(e);
                     });
             }else{
                 axios.put('proadd/'+this.id, {
                   id:this.id,
                   pr_tipoproductoId:this.pr_tipoproductoId,
                   pr_idempresa:this.pr_idempresa,
                   pr_idtipo:this.pr_idtipo,
                   pr_codigo:this.pr_codigo,
                   pr_descipcion:this.pr_descipcion,
                   pr_foto:this.pr_foto,
                   pr_diasventa:this.pr_diasventa,
                   pr_precio:this.pr_precio,
                   pr_inventario:this.pr_inventario,
                   pr_existencias:this.pr_existencias,
                   pr_descpesos:this.pr_descpesos,
                   pr_descporcentaje:this.pr_descporcentaje,
                   pr_iva:this.pr_iva,
                   pr_marca:this.pr_marca,
                   pr_referencia:this.pr_referencia,
                   pr_estado:this.pr_estado,
                   pr_ofertaDesde:this.pr_ofertaDesde,
                   pr_ofertaHasta:this.pr_ofertaHasta,
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
              if(this.pr_idempresa === ''){er +='Falta idempresa \n';}
              if(this.pr_idtipo === ''){er +='Falta idtipo \n';}
              if(this.pr_codigo === ''){er +='Falta codigo \n';}
              if(this.pr_descipcion === ''){er +='Falta descipcion \n';}
              if(this.pr_foto === ''){er +='Falta foto \n';}
              if(this.pr_diasventa === ''){er +='Falta diasventa \n';}
              if(this.pr_precio === ''){er +='Falta precio \n';}
              if(this.pr_inventario === ''){er +='Falta inventario \n';}
              if(this.pr_existencias === ''){er +='Falta existencias \n';}
              if(this.pr_descpesos === ''){er +='Falta descpesos \n';}
              if(this.pr_descporcentaje === ''){er +='Falta descporcentaje \n';}
              if(this.pr_iva === ''){er +='Falta iva \n';}
              if(this.pr_marca === ''){er +='Falta marca \n';}
              if(this.pr_referencia === ''){er +='Falta referencia \n';}
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
            this.pr_tipoproductoId=a[0]
            this.pr_idtipo= a[1]
          
         },
        selectOpcion(item,op){
            if(op==='E'){
              app.clickedUser = item;
              this.id = item.id;
              this.pr_tipoproductoId = item.pr_tipoproductoId
              this.pr_idempresa = item.pr_idempresa;
              this.pr_idtipo = item.pr_idtipo
              this.seleccionado = item.pr_tipoproductoId+'||'+item.pr_idtipo;
              this.pr_codigo = item.pr_codigo;
              this.pr_descipcion = item.pr_descipcion;
              this.pr_foto = item.pr_foto;
              this.pr_diasventa = item.pr_diasventa;
              this.pr_precio = item.pr_precio;
              this.pr_inventario = item.pr_inventario;
              this.pr_existencias = item.pr_existencias;
              this.pr_descpesos = item.pr_descpesos;
              this.pr_descporcentaje = item.pr_descporcentaje;
              this.pr_iva = item.pr_iva;
              this.pr_marca = item.pr_marca;
              this.pr_referencia = item.pr_referencia;
              this.pr_estado = item.pr_estado;
              this.formulario = true;
            }
            if(op==='B'){
                if(confirm('Va aborrar a ' + item.pr_descipcion+ '?')){
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
            this.foto="./img/"+this.datos.data[index].pr_idtipo+"/"+this.datos.data[index].pr_foto;
            return(this.foto);
        },
        getImgUrlOne(){
            this.foto="./img/"+this.pr_idtipo+"/"+this.pr_foto;
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
            axios.get('/prolist', {})
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
