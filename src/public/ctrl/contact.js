
const app = new Vue({
	'el': '#contact-form',

	data: {
		btn_send:'Enviar',
		lblct_celular:'Teléfono:',
		lblct_name:'Nombre:',
		lblct_email:'Correo electrónico:',
		lblct_message:'Mensage',
		form_title: 'Contáctenos',
		contact: {			
			name: '',
			email: '',
			message: '',
			celular:'',
		},

		isSending: false
	},

	methods: {

		/**
		 * Clear the form
		 */	
		clearForm() {
			for (let field in this.contact) {
				this.contact[field] = ''
			}
		},

		/**
		 * Handler for submit
		 */	
		onSubmit(evt) {
			evt.preventDefault();

			this.isSending = true;

			setTimeout(() => {
				// Build for data
				let form = new FormData();
				for (let field in this.contact) {
					form.append(field, this.contact[field]);
				}

				// Send form to server	
				this.$http.post('/app.php', form).then((response) => {
					console.log(response);
					this.clearForm();
					this.isSending = false;
				}).catch((e) => {
					console.log(e)
				});

			}, 1000);
		}
	}

});


window.app = app;