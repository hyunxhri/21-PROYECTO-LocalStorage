// SELECTORES

const formulario = document.querySelector("#formulario")
const contenedor = document.querySelector("#lista-mensajes")

// VARIABLES

let listaMensajes = []

// LISTENERS 

formulario.addEventListener("submit", (e) => {
    e.preventDefault()
    const mensaje = e.target.querySelector("#mensaje").value
    if(localStorage.getItem("mensajes")){
        actualizaLista(mensaje)
    } else {
        listaMensajes.push(mensaje)
        almacenaMensaje(listaMensajes)
    }
})

// FUNCIONES

const actualizaLista = (mensaje) => {
    listaMensajes = JSON.parse(localStorage.getItem("mensajes"))
    listaMensajes.push(mensaje)
    almacenaMensaje(listaMensajes)
}

const almacenaMensaje = (mensajes) => {
    localStorage.setItem("mensajes", JSON.stringify(mensajes))
    console.log(localStorage.getItem("mensajes"))
    muestraMensajes()
}

const muestraMensajes = () => {
    const ul = document.createElement("ul")
    for(let i = 0; i < listaMensajes.length; i++){
        const li = document.createElement("li")
        li.textContent = listaMensajes[i]
        ul.appendChild(li)
    }
    contenedor.appendChild(ul)
}