//FUNCION CONSTRUCTORA //

class misPlanes {
        constructor(id,plan,precio, imagen){
        this.id = id,
        this.plan = plan,
        this.precio = precio
        this.imagen = imagen

    }
    mostrarData(){
        console.log(`Id ${this.id}: Nombre del plan: ${this.plan} Precio por el servicio: ${this.precio}`)
    }
}
biblioteca = []
const plan1 = new misPlanes(1, "Plan Premium", "250$", "PREMIUM.png")
const plan2 = new misPlanes(2, "Plan Oro", "150$", "ORO.png")
const plan3 = new misPlanes(3, "Plan Plata", "100$", "PLATA.png")
const plan4 = new misPlanes(4, "Plan Bronce", "50$", "BRONCE.png")

if(localStorage.getItem("Biblioteca")){
    biblioteca = JSON.parse(localStorage.getItem("biblioteca"))

}else{
    console.log("setenado biblioteca por primera vez")
    biblioteca.push(plan1, plan2, plan3, plan4)
    localStorage.setItem("biblioteca", JSON.stringify(biblioteca))
}

let productosEnCarrito = []

if(localStorage.getItem("Carrito")){
    productosEnCarrito = JSON.parse(localStorage.getItem("Carrito"))

}else{
    console.log("seteando el carrito por primera vez")
    localStorage.setItem("Carrito", JSON.stringify(productosEnCarrito))
}

// CONVOCAR EL DOM //

let productos = document.getElementById("productos")
let btnMostrarDatos = document.getElementById("btnMostrarDatos")
let btnOcultarDatos = document.getElementById("btnOcultarDatos")
let modalBody = document.getElementById("modal-body")
let BotonCarritoCom = document.getElementById("BotonCarritoCom")
let botonComprar = document.getElementById("botonComprar")
let loaderCard = document.getElementById("loaderCard")
let loaderSpinner = document.getElementById("loaderSpinner")

//NOMBRE Y APELLIDO - GUARDAR DATOS //

Swal.fire({
    title: 'Inicio de Sesion',
    html: `<input type="text" id="login" class="swal2-input" placeholder="Usuario">
    <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
    confirmButtonText: 'Registrarse',
    focusConfirm: false,
    backdrop: `
    #e5e5e5
    left top
    no-repeat
    opacity
    `,
    preConfirm: () => {
      const login = Swal.getPopup().querySelector('#login').value
      const password = Swal.getPopup().querySelector('#password').value
      if (!login || !password) {
        Swal.showValidationMessage(`Por favor ingrese Usuario y Contraseña`)
      }
      return { login: login, password: password }
    }
  }).then((result) => {
    Swal.fire(`
      Usuario: ${result.value.login}
      Contraseña: ${result.value.password}
    `.trim())
  })



function mostrarNombre(nombre, apellido){

    alert(`Holaa! ${nombre} ${apellido} sea cordialmente Bienvenido a Ingenio's 
tu mejor agencia de marketing digital🥳`)
}


// RELLENAR DATOS DE INGENIO'S //

function pedirDatos(){

    let ingresarDatos = document.createElement("div")

    

    Swal.fire({
        title: 'Datos de Negocio',
        html: `<input type="text" id="login" class="swal2-input" placeholder="Nombre de Negocio">
        <input type="text" id="password" class="swal2-input" placeholder="Correo Electronico">
        <input type="text" id="password" class="swal2-input" placeholder="Instagram">`,
        confirmButtonText: 'Registrarse',
        focusConfirm: false,
        backdrop: `
        #e5e5e5
        left top
        no-repeat
        opacity
        `,
        preConfirm: () => {
          const login = Swal.getPopup().querySelector('#login').value
          const password = Swal.getPopup().querySelector('#password').value
          if (!login || !password) {
            Swal.showValidationMessage(`Por favor ingrese Usuario y Contraseña`)
          }
          return { login: login, password: password }
        }
      }).then((result) => {
        Swal.fire(`
            DATOS INGRESADOS:
            ${result.value.login}
            ${result.value.password}
            ${result.value.password}
        `)
      })

    btnMostrarDatos.appendChild(ingresarDatos)
}

//  METODOS DE BUSQUEDAD DE LOS SERVICIOS //

function buscarPorPlan(){

    let buscarPlanes = document.getElementById("buscarPlanes").value
    let tituloEncontrado = biblioteca.find((planes) => planes.plan.toLowerCase() == buscarPlanes.toLowerCase())

    if(tituloEncontrado == undefined){
        console.log(`El plan ${buscarPlanes} no se encuentra en catalogo`)
        console.log(buscarPlanes)
    }else if(buscarPlanes){
        document.getElementById("buscarPlanes").value="Que plan desea buscar? ...."
        console.log(tituloEncontrado)
    }
}

// AGREGAR MIS CARTAS DEL HTML - DOM INNERHTML //

function mostrarPlanes(){
    for(let misPlanes of biblioteca){
        let nuevoProducto = document.createElement("div")
        nuevoProducto.innerHTML = `
        
    <article id= "${misPlanes.id}" class="container text-center card p-4 m0 mt-5 bg-light border ">
        
        <div class = "col">
            <h3>${misPlanes.plan}</h3>
            <img src="assets/${misPlanes.imagen}" class="img-top" alt="">
            <div class="col-md">
                <p>${misPlanes.plan}</p>
                <p>${misPlanes.precio}</p>
                <button id = "miBoton${misPlanes.id}" class="btn btn-primary" >AGREGAR AL CARRITO</button>
                <button onclick="btnInfoPlan()" id = "btnInfoPlan" class="btn btn-primary" >INFO PLAN</button>
            </div>
        </div>
    </article>`

        productos.appendChild(nuevoProducto)

        let btnAgregar = document.getElementById(`miBoton${misPlanes.id}`)
        console.log(btnAgregar)
        btnAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(misPlanes)
        })

    }
}
    // CARGAR CARTAS DE PLANES //

setTimeout(() => {
    loaderCard.innerHTML = ""
    loaderSpinner.remove()
    mostrarPlanes() 
}, 10000);

// FUNCION AGREGAR AL CARRITO //

function agregarAlCarrito(misPlanes){
    console.log(misPlanes)
    // PRIMER PASO
    productosEnCarrito.push(misPlanes)
    console.log(productosEnCarrito)
    localStorage.setItem("Carrito", JSON.stringify(productosEnCarrito))
    //SWEETALERT 
    Swal.fire({
        icon: 'success',
        title: 'Ha agregado su plan con exito!',
        text: `Has escogido ${misPlanes.plan} Estaremos en contacto con usted en breves momentos 😊💖`,
        timer: 6000,
      })
    
}

// FUNCION SUMAR/IMPRIMIR EN MODAL
function cargarProductos(array){
    modalBody.innerHTML ="" 
    array.forEach((productosCarrito)=>{
        modalBody.innerHTML += `
        <div class="card border-primary mb-3 text-center container pt-5 ps-5 pe-5" id = "productoCarrito${productosCarrito.id}" style="max-width: 540px;">
            <img class="card-img-top" height="300px" src="assets/${productosCarrito.imagen}" alt="${productosCarrito.plan}">
            <div class="card-body">
                <h4 class="card-title">${productosCarrito.plan}</h4>

                <p class="card-text">${productosCarrito.precio}</p>
                <button class="btn btn-danger" id="botonEliminar${productosCarrito.id}"><img class="carrito p-1" src="/img/eliminar.png" alt=""><i class='fas fa-trash-alt'></i></button>
            </div>
        </div>`
    })



    // ELIMINAR PRODUCTOS DEL CARRITO //

    array.forEach((productosCarrito, indice)=>{
        document.getElementById(`botonEliminar${productosCarrito.id}`).addEventListener("click", ()=>{
            // CONSOLE LOG DE PRUEBA DE BOTON 
            console.log(`Boton eliminar ${productosCarrito.plan} `)

            // ELIMINAR DEL DOM
            let cartaProducto = document.getElementById(`productoCarrito${productosCarrito.id}`)
            cartaProducto.remove()

            // ELIMINAR DEL ARRAY
            productosEnCarrito.splice(indice, 1)
            console.log(productosEnCarrito)

            // ELIMINAR DEL STORAGE
            localStorage.setItem('Carrito', JSON.stringify(productosEnCarrito))

        })
    })
}

// FINALIZAR COMPRA - CARRITO//

function finalizarCompra (){
    Swal.fire({
        icon: 'success',
        title: 'Su compra se ha realizado correctamente!',
        text: `Muchas gracias por contar con Ingenio's 😊`,
        timer: 5000,
      })
}

// INFORMACIONES DE LOS PLANES //

function btnInfoPlan(){

    Swal.fire(`PLAN PREMIUM:
    5 - HISTORIAS DIARIAS
    2 - POST DIARIOS
    250$

    PLAN ORO:
    4 - HISTORIAS DIARIAS
    2 - POST DIARIOS
    150$

    PLAN PLATA:
    3 - HISTORIAS DIARIAS
    1 - POST DIARIOS
    100$

    PLAN BRONCE:
    2 - HISTORIAS DIARIAS
    1 - POST DIARIOS
    50$`)  
}

// BOTON PARA GUARDAR DATOS DE LA EMPRESA O NEGOCIO //

function guardarDatos(){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Sus datos han sido guardados con exito!'
      })
}

// EVENTOS CLICK //

btnMostrarDatos.ondblclick = () =>{pedirDatos()}
btnGuardarDatos.onclick = () =>{guardarDatos()}
botonComprar.onclick = () =>{finalizarCompra()}
BotonCarritoCom.addEventListener("click", ()=>{
    cargarProductos(productosEnCarrito)
}) 
