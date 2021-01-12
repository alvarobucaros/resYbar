
var data =  {  
    titulo:'Prueba de combos',
    titulito:'Un titulin',
    lblpr_existencias:'Etiquetas',
    pr_existencias:'',
    form_btnActualiza:'Aceptar',
    datos:[],
    tipos:'',
    campo:'',
    files:'',
    notas:'',
    images:[],
    err:''
}
 
const vm = new Vue({
    el: '#main',
    data:data,  
      mounted () {     
          axios.get('/tipoproductosQry', { 
        }).then(response => {
            this.datos=response.data;          
        }).catch(e => {
            console.log(e);
        })
      },
          
    methods: {
      ver: function(){        
        tip = this.tipos
        campo = this.campo
        valor = this.valor
        alert(tip+' * '+campo+' + '+valor);

      },  
      uploadImageSuccess(formData, index, fileList) {
        console.log('data', formData, index, fileList)
      },
      beforeRemove (index, done, fileList) {
        console.log('index', index, fileList)
        var r = confirm("remove image")
        if (r == true) {
          done()
        } else {
        }
      },
      editImage (formData, index, fileList) {
        console.log('edit data', formData, index, fileList)
      },
      miCarga: function(){
        imagen = this.files
        let data = new FormData();
        data.append('file', campo, file.fileName);
        
        return (dispatch) => {
        axios.post(URL, data, {
          headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          }
        })
          .then((response) => {
            this.err = 'Ok'+response.data; 
          }).catch((error) => {
            console.log(e);
          });
        };          
    }      
    },
  components: {
    home: {
      template: "<h3>Home</h3>"
    },
    about: {
      props:['nota','campo'],     
      template: `<div> <label class='labeles'>{{nota}}
                <input v-model='campo'  type='text' class='form-control col-md-6' > 
                </label>  
                </div>`  
    },
    input_file:{
        props:['aviso'], 
        template: `<div><div>
        <label class='labeles'>{{aviso}}
        <input v-model='files'  type='file' class='form-control col-md-6' >       
        </label>        
      </div>
    
      </div>`
    },
    input_text: {
        props:['aviso','tipos'],  
         template: `<div>
                        <label class='labeles'>{{aviso}}
                        <input v-model='tipos'  type='text' class='form-control col-md-6' >
                        </label>
                    </div>`
    },
 

    base_input: {
      inheritAttrs: false,
      props: ['label', 'valor'],
      template: `
        <label>
          {{ label }}
          <input
            v-bind="$attrs"
            v-bind:value="valor"            
          >
        </label>
      `
    },
    combo:{
      props:['titulito','nota'],
      template: `<div>
      <p> {{titulito}} </p> <span> {{nota}} </span>
      </div>`
    }
  }          
    
}
)