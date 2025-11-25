import { registrar } from "./registrarse.js";

const tablahtml =`<div class="table-container">
    <button id="btn-crear">Crear Usuario</button>

    <h2 class="table-title">Listado de Usuarios</h2>

    <table id="tablaUsuarios" class="display nowrap">
    <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody></tbody>
</table>
</div>` 



const nav2html = 
`<div class="nav2-usuario">
            <ul>
                <li><a href="#/menuAdmin">Inscripciones</a></li>
                <li><a href="#/crearCurso">Crear Curso</a></li>
                <li><a href="#/usuarios">Usuarios</a></li>
            </ul>
        </div>`

const navhtml = `<nav class="login-nav">
        <div>
            <a href="#/academiaweb">AcademiaWeb</a>
        </div>
        <div class = "nav-sesion">
            <a href="#/login" id="cerrar-sesion">Cerrar Sesión</a>
        </div>
</nav>`

const urlUsuarios = "https://691f571531e684d7bfc96d5d.mockapi.io/usuarios";
let tabla = null

export function listaUsuarios(){
    if (localStorage.getItem("rol") === "admin"){
    let cp = document.getElementById("cp");
    let nav = document.getElementById("nav")
    let nav2 = document.getElementById("nav2") 
    cp.innerHTML = tablahtml
    nav.innerHTML = navhtml
    nav2.innerHTML = nav2html
    let btn = document.getElementById("cerrar-sesion")
    btn.addEventListener("click",() => {
        localStorage.removeItem("sesionIniciada");
        localStorage.removeItem("usuarioId")
        localStorage.removeItem("rol")})
    let btn2 = document.getElementById("btn-crear")
    btn2.addEventListener("click",crearUsuario)
    cargarUsuarios()
    }else {alert("Inicia Sesion")
            window.location.href = "#/login"}
}



async function cargarUsuarios() {
    let res = await fetch(urlUsuarios);
    let usuarios = await res.json();
    usuarios.forEach(element => {
        element.action = `
            <button class="btn-editar" data-id="${element.id}">Editar</button>
            `
    });

    tabla = new DataTable("#tablaUsuarios", {
        responsive:true,
        data : usuarios,
        columns: [
            { data: 'id' },    
            { data: 'name' },
            { data: 'email' },
            { data: 'action', "orderable":false }
            
        ],
        deferRender: true,
        retrieve: true,
        processing: false,
        language: {
            sProcessing:     "Procesando...",
            sLengthMenu:     "Mostrar _MENU_ registros",
            sZeroRecords:    "No se encontraron resultados",
            sEmptyTable:     "Ningún dato disponible en esta tabla",
            sInfo:           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
            sInfoEmpty:      "Mostrando registros del 0 al 0 de un total de 0",
            sInfoFiltered:   "(filtrado de un total de _MAX_ registros)",
            sInfoPostFix:    "",
            sSearch:         "Buscar:",
            sUrl:            "",
            sInfoThousands:  ",",
            sLoadingRecords: "Cargando...",
            oPaginate: {
                sFirst:    "Primero",
                sLast:     "Último",
                sNext:     "Siguiente",
                sPrevious: "Anterior"
            },
            oAria: {
                sSortAscending:  ": Activar para ordenar la columna de manera ascendente",
                sSortDescending: ": Activar para ordenar la columna de manera descendente"
            }
                            
        }
    })
    enlazarBoton()
}

const editarhtml = `<div class="form-curso">
            <h4>Editar Usuario</h4>
            <div>
                <label>Nombre:</label>
                <input type="text" id="nombre" required>
            </div>
            <div>
                <label>Email:</label>
                <input type="text" id="email" required>
            </div>
            <div>
                <label>Contraseña:</label>
                <input type="password" id="password" required>
            </div>
            <div class="form-boton">
                <button type="button" id="cancelar">Cancelar</button>
                <button type="button" id="actualizar">Actualizar</button>
            </div>`


function enlazarBoton() {

    tabla.on("click", ".btn-editar", async function(e) {

        let id = e.target.dataset.id;

        let cp = document.getElementById("cp");
        cp.innerHTML = editarhtml;

        let res = await fetch(urlUsuarios);
        let usuarios = await res.json();
        let usuario = usuarios.find(u => u.id == id);

        if (!usuario) {
            console.error("Usuario no encontrado");
            return;
        }

        document.getElementById("nombre").value = usuario.name;
        document.getElementById("email").value = usuario.email;
        document.getElementById("password").value = usuario.password;

        document.getElementById("actualizar").dataset.id = id;
        document.getElementById("actualizar").addEventListener("click", actualizarUsuario);
        document.getElementById("cancelar").addEventListener("click", listaUsuarios);
    });
}

async function actualizarUsuario(e) {

    const id = e.target.dataset.id;

    let nombre = document.getElementById("nombre").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!nombre || !email || !password) {
        alert("Todos los campos son obligatorios");
        return;
    }

    const datosActualizados = {
        name: nombre,
        email: email,
        password: password
    };

    let res = await fetch(`${urlUsuarios}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosActualizados)
    });

    if (!res.ok) {
        alert("Error al actualizar el usuario");
        return;
    }

    alert("Usuario actualizado correctamente");

    listaUsuarios();
}

const crearUsuariohtml = `<div class="form-curso">
            <h4>Crear Usuario</h4>
            <div>
                <label>Nombre:</label>
                <input type="text" id="name" required>
            </div>
            <div>
                <label>Email:</label>
                <input type="text" id="email" required>
            </div>
            <div>
                <label>Contraseña:</label>
                <input type="password" id="password" required>
            </div>
            <div>
                <label>Repetir Contraseña:</label>
                <input type="password" id="repetirPassword" required>
            </div>
            <div class="form-boton">
                <button type="button" id="cancelar">Cancelar</button>
                <button type="button" id="crear">Crear</button>
            </div>`


function crearUsuario(){
    let cp = document.getElementById("cp")
    cp.innerHTML = crearUsuariohtml

    document.getElementById("crear").addEventListener("click", registrar);
    document.getElementById("cancelar").addEventListener("click", listaUsuarios);
}


