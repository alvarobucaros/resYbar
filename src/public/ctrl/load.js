
const VueUploadMultipleImage = 'vue-upload-multiple-image'
const axios = 'axios'

const app = new Vue({
    'el': '#app',
    data: {
        imagenes:'',
        text1:'notas',
        form_btnSubir:'Sube foto'
    },
    methods: {
        uploadImageSuccess(id, formData, index, fileList) {
            this.images = fileList;
            console.log(formData)
            console.log(index)
            console.log(fileList)
            this.addNewGallery({id, data: this.images});
        },
        uploadImageSuccess( e,t,n) {
            console.log("mi dato->",e,t,n);
        
            // this.images = fileList; e,t,n){console.log("data",e,t,n)
            console.log(formData)
            console.log(formData.name)
            // console.log(index)
            // console.log(fileList) 
           // this.addNewGallery({id, data: this.images});

           // https://www.npmjs.com/package/@hichem-khial/vue-upload-multiple-crop-images?spm=a2c6h.14275010.0.0.13f16577Day8Vj
           // https://bezkoder.com/vue-upload-multiple-image/
           // https://bezkoder.com/node-js-express-file-upload/
        }
    }
});


window.app = app;