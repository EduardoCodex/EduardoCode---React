const personasIngresadas = async () =>{

    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const users = await response.json()

    let tablaPersonas = ``;
   users.forEach((user, index) =>{
        tablaPersonas +=`
        <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.username}</td>
        </tr>`
    })
    document.getElementById("tabla_Personas").innerHTML = tablaPersonas;
}

window.addEventListener("load", function () {
    personasIngresadas()
})