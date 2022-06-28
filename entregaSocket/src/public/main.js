const socket = io()

const agregarProd = document.querySelector('#frmProductos')

agregarProd.addEventListener('submit', (e) => {
	e.preventDefault()

	const prod = {
		title: document.querySelector('#title').value,
		price: document.querySelector('#price').value,
        thumbnail: document.querySelector('#thumbnail').value
	}

	socket.emit('agregarProducto', prod)
    limpiaForm();
})

function limpiaFormMensaje(){
    document.querySelector('#mensaje').value="";
}

function limpiaForm(){
    document.querySelector('#title').value="";
	document.querySelector('#price').value="";
    document.querySelector('#thumbnail').value="";
}
async function render(productos){
	const template = await fetch('plantillas/lista.hbs')
	const textTemplate = await template.text()
	const functionTemplate = Handlebars.compile(textTemplate)
	const html = functionTemplate({ productos })

	document.querySelector('#listado').innerHTML = html
    
}

async function renderMsj(mensajes){
	const template = await fetch('plantillas/mensajes.hbs')
	const textTemplate = await template.text()
	const functionTemplate = Handlebars.compile(textTemplate)
	const html = functionTemplate({ mensajes })
    
	document.querySelector('#listaMensajes').innerHTML = html
    
}

const agregarMsj = document.querySelector('#frmMensajes')

agregarMsj.addEventListener('submit', (e) => {
	e.preventDefault()
    if(document.querySelector('#autor').value==""){
        alert("Debe ingresar un email");
        return false;
    }
    if(document.querySelector('#mensaje').value==""){
        alert("Debe ingresar un mensaje");
        return false;
    }

	const msj = {
		autor: document.querySelector('#autor').value,
		fecha: moment().format('DD/MM/YYYY hh:mm'),
        mensaje: document.querySelector('#mensaje').value
	}

	socket.emit('agregarMensaje', msj)
    limpiaFormMensaje();
})

socket.on('productos', render)
socket.on('mensajes', renderMsj)