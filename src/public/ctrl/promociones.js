var data =  {   
    form_title: ' PROMOCIONA UN PRODUCTO ',
    form_btnNuevo:'Nuevo registro',
    form_btnActualiza:'Actualiza',
    form_btnEdita:'Promo',
    lblpr_tipo:'Tipo producto',
    lblpr_descipcion:'Descripción',
    lblpr_diasVenta: 'Dias venta', 
    lblpr_precio:'Precio lista:',
    lblpr_descPesos :'Descuento en $:',
    lblpr_descPorcentaje:'Descuento en %:',
    lblid:'id',
    lblpr_inventario:'En Inventario',
    lblpr_existencias:'Existencias',
    lblpr_iva:'iva',
    lblpr_ofertaDesde:'Fch Inicio',
    lblpr_ofertaHasta:'Fch Fin',
    
    botonNuevo:true, 
    id:0,

    pr_descipcion:'',
    pr_diasVenta:'',
    pr_precio:0,
    pr_existencias:0,
    pr_inventario:0,
    pr_descPesos:0,
    pr_descPorcentaje:0,
    pr_iva:0,
    pr_ofertaDesde:'2000-01-01',
    pr_ofertaHasta:'2000-01-01',
    datos:[], 
    tipoproductos:[],
    codTipo:0,
    form_busqueda:'Buscar: ',
    searchKey:'',
    tipos:'',
    campo:'',
    page: 1,
    perPage: 12,
    pages: [],
    pageNumber:'',
    formulario:true, 
    formato:false,
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
        guardar: function() {
             var er='';
             er=this.valida();
             if(er === ''){
                axios.put('promoadd/'+this.id, {
                id:this.id,                   
                pr_descipcion:this.pr_descipcion,
                pr_diasVenta:this.pr_diasVenta,
                pr_precio:this.pr_precio,
                pr_inventario:this.pr_inventario,
                pr_existencias:this.pr_existencias,
                pr_descPesos:this.pr_descPesos,
                pr_descPorcentaje:this.pr_descPorcentaje,
                pr_iva:this.pr_iva,
                pr_ofertaDesde:this.pr_ofertaDesde,
                pr_ofertaHasta:this.pr_ofertaHasta
                }).then(response => {
                    this.leeRegistros();
                    this.formulario=false;
                }).catch(e => {
                    console.log(e);
                });
            }
             else{
                 alert(er);
                 this.formulario=true;
             }
        },
 
         valida: function(){
             er='';
              if(this.id === ''){er +='Falta id \n';}
              if(this.pr_precio === ''){er +='Falta el precio \n';}
              if(this.pr_descPesos != 0 && this.pr_descPorcentaje  != 0){
                  er +='El descuento es solo en pesos o en porcentaje \n';}
              if(this.pr_ofertaDesde > this.pr_ofertaHasta){er +='Fecha desde mayor a fecha hasta \n';}
             return er;
         },
         cambiaTipo: function(){
            a=this.seleccionado.split('||')
            cod=a[0]
            this.codTipo=cod;
            this.leeRegistros();
        },    
        formatValue(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        selectOpcion(item){          
            this.id = item.id;
            this.pr_descipcion = item.pr_descipcion
            this.pr_diasVenta = item.pr_diasVenta;          
            this.pr_precio = item.pr_precio;
            this.pr_existencias = item.pr_existencias;
            this.pr_inventario = item.pr_inventario;
            this.pr_descPesos = item.pr_descPesos;
            this.pr_descPorcentaje = item.pr_descPorcentaje;
            this.pr_iva = item.pr_iva;
            x = item.pr_ofertaDesde.indexOf("T")
            
            this.pr_ofertaDesde = item.pr_ofertaDesde.substring(0, x);
            this.pr_ofertaHasta = item.pr_ofertaHasta.substring(0, x);
            this.formato = true;        
        },
        leeRegistros: function(){
            cod= this.codTipo;            
            axios.get('/producPromo/:'+cod, {})
            .then(response => {
             this.datos=response.data; 
             this.creaPaginacion();
           //  detalles=true;
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
         return;
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
 
// >>>>>>>   Creado por: Alvaro Ortiz Castellanos   Monday, Nov 02, 2020 8:19:34   <<<<<<< 
