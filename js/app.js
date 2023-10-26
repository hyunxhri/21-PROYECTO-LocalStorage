// SELECTORES

const formulario = document.querySelector("#formulario")
const contenedor = document.querySelector("#lista-mensajes")
const contenedorFilas = document.querySelector(".container")

// VARIABLES

let listaMensajes = []

// FUNCIONES

const actualizaLista = (mensaje) => {
    listaMensajes = JSON.parse(localStorage.getItem("mensajes"))
    listaMensajes.push(mensaje)
    almacenaMensaje(listaMensajes)
}

const almacenaMensaje = (mensajes) => {
    localStorage.setItem("mensajes", JSON.stringify(mensajes))
    muestraMensajes()
}

const muestraMensajes = () => {
    limpiaContenedor()
    const ul = document.createElement("ul")
    for(let i = 0; i < listaMensajes.length; i++){
        const li = document.createElement("li")
        li.textContent = listaMensajes[i]
        li.setAttribute("data-index", i)
        ul.appendChild(li)
        const borrar = document.createElement("span")
        borrar.textContent = `X`
        borrar.classList.add("borrar-mensaje")
        li.appendChild(borrar)
    }
    contenedor.appendChild(ul)
}

const limpiaContenedor = () => {
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild)
    }
}

const alertaError = () => {
    const fila = document.createElement("div")
    fila.classList.add("row", "error")
    fila.textContent = `No puede enviar un mensaje vacío.`
    contenedorFilas.appendChild(fila)
}

const borraErrorEnPantallaSiHay = () => {
    const errorDiv = contenedorFilas.querySelector(".error")
    if(contenedorFilas.contains(errorDiv)){
        contenedorFilas.removeChild(errorDiv)
    }
}

// LISTENERS 

const cargarEventListeners = () => {
    formulario.addEventListener("submit", (e) => {
        e.preventDefault()
        const mensaje = e.target.querySelector("#mensaje").value
        if(mensaje === ""){
            borraErrorEnPantallaSiHay()
            alertaError()
        } else {
            if(localStorage.getItem("mensajes")){
                actualizaLista(mensaje)
                borraErrorEnPantallaSiHay()
            } else {
                listaMensajes.push(mensaje)
                almacenaMensaje(listaMensajes)
                borraErrorEnPantallaSiHay()
            }
        }
    })
    
    contenedor.addEventListener("click", (e) => {
        if(e.target.classList.contains("borrar-mensaje")){
            const mensajeID = e.target.parentNode.getAttribute("data-index")
            listaMensajes = listaMensajes.filter((mensaje, index) => index !== parseInt(mensajeID))
            almacenaMensaje(listaMensajes)
        }
    })
    
    window.addEventListener("DOMContentLoaded", () => {
        listaMensajes = JSON.parse(localStorage.getItem("mensajes"))
        muestraMensajes()
      })
}

cargarEventListeners()

